const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const TeamMember = require("../models/TeamMember");
const ActivityLog = require("../models/ActivityLog");

// Get analytics overview
router.get("/overview", async (req, res) => {
  try {
    const totalMembers = await TeamMember.countDocuments({ isDeleted: false });
    const totalAssignments = await Assignment.countDocuments({
      isDeleted: false,
    });

    // Assignment status distribution
    const statusStats = await Assignment.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // Category distribution
    const categoryStats = await Assignment.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Completion rate
    const completedCount = await Assignment.countDocuments({
      status: "completed",
      isDeleted: false,
    });

    const completionRate =
      totalAssignments > 0
        ? ((completedCount / totalAssignments) * 100).toFixed(1)
        : 0;

    // Overdue assignments
    const overdue = await Assignment.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
      isDeleted: false,
    });

    // Due today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dueToday = await Assignment.countDocuments({
      dueDate: { $gte: today, $lt: tomorrow },
      status: { $ne: "completed" },
      isDeleted: false,
    });

    res.json({
      overview: {
        totalMembers,
        totalAssignments,
        completionRate: parseFloat(completionRate),
        overdue,
        dueToday,
      },
      statusDistribution: statusStats,
      categoryDistribution: categoryStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team performance stats
router.get("/team-performance", async (req, res) => {
  try {
    const teamPerformance = await TeamMember.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "assignments",
          localField: "_id",
          foreignField: "assigneeId",
          as: "assignments",
        },
      },
      {
        $project: {
          name: 1,
          role: 1,
          totalAssignments: { $size: "$assignments" },
          completedAssignments: {
            $size: {
              $filter: {
                input: "$assignments",
                cond: { $eq: ["$$this.status", "completed"] },
              },
            },
          },
          inProgressAssignments: {
            $size: {
              $filter: {
                input: "$assignments",
                cond: { $eq: ["$$this.status", "in-progress"] },
              },
            },
          },
          overdueAssignments: {
            $size: {
              $filter: {
                input: "$assignments",
                cond: {
                  $and: [
                    { $lt: ["$$this.dueDate", new Date()] },
                    { $ne: ["$$this.status", "completed"] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          completionRate: {
            $cond: [
              { $eq: ["$totalAssignments", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$completedAssignments", "$totalAssignments"] },
                  100,
                ],
              },
            ],
          },
        },
      },
      { $sort: { completionRate: -1 } },
    ]);

    res.json(teamPerformance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get weekly progress data
router.get("/weekly-progress", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyData = await Assignment.aggregate([
      {
        $match: {
          updatedAt: { $gte: sevenDaysAgo },
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          statusCounts: {
            $push: {
              status: "$_id.status",
              count: "$count",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(weeklyData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get category progress
router.get("/category-progress", async (req, res) => {
  try {
    const categoryProgress = await Assignment.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$category",
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
          },
          notStarted: {
            $sum: { $cond: [{ $eq: ["$status", "not-started"] }, 1, 0] },
          },
          onHold: {
            $sum: { $cond: [{ $eq: ["$status", "on-hold"] }, 1, 0] },
          },
        },
      },
      {
        $addFields: {
          completionRate: {
            $cond: [
              { $eq: ["$total", 0] },
              0,
              { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
            ],
          },
        },
      },
      { $sort: { completionRate: -1 } },
    ]);

    res.json(categoryProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get productivity metrics
router.get("/productivity", async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Assignments completed in last 30 days
    const recentCompletions = await Assignment.countDocuments({
      status: "completed",
      updatedAt: { $gte: thirtyDaysAgo },
      isDeleted: false,
    });

    // Average completion time (for completed assignments)
    const completionTimes = await Assignment.aggregate([
      {
        $match: {
          status: "completed",
          completedAt: { $exists: true },
          isDeleted: false,
        },
      },
      {
        $project: {
          completionDays: {
            $divide: [
              { $subtract: ["$completedAt", "$createdAt"] },
              1000 * 60 * 60 * 24, // Convert to days
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgCompletionDays: { $avg: "$completionDays" },
          minCompletionDays: { $min: "$completionDays" },
          maxCompletionDays: { $max: "$completionDays" },
        },
      },
    ]);

    // Most active team members
    const activeMembers = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { actor: "$actor", actorName: "$actorName" },
          activityCount: { $sum: 1 },
        },
      },
      { $sort: { activityCount: -1 } },
      { $limit: 5 },
    ]);

    res.json({
      recentCompletions,
      completionStats: completionTimes[0] || {
        avgCompletionDays: 0,
        minCompletionDays: 0,
        maxCompletionDays: 0,
      },
      mostActiveMembers: activeMembers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get priority distribution
router.get("/priority-distribution", async (req, res) => {
  try {
    const priorityStats = await Assignment.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
        },
      },
      {
        $addFields: {
          completionRate: {
            $cond: [
              { $eq: ["$count", 0] },
              0,
              { $multiply: [{ $divide: ["$completed", "$count"] }, 100] },
            ],
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(priorityStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
