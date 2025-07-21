const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");
const TeamMember = require("../models/TeamMember");

// Get all activities with filters
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      actor,
      dateFrom,
      dateTo,
      target,
    } = req.query;

    const filter = {};

    if (type) filter.type = type;
    if (actor) filter.actor = actor;
    if (target) filter.target = { $regex: target, $options: "i" };

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const activities = await ActivityLog.find(filter)
      .populate("actor", "name email role")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await ActivityLog.countDocuments(filter);

    res.json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent activities (last 24 hours)
router.get("/recent", async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const activities = await ActivityLog.find({
      createdAt: { $gte: twentyFourHoursAgo },
    })
      .populate("actor", "name email role")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activities by team member
router.get("/member/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const activities = await ActivityLog.find({ actor: memberId })
      .populate("actor", "name email role")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await ActivityLog.countDocuments({ actor: memberId });

    res.json({
      activities,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity statistics
router.get("/stats", async (req, res) => {
  try {
    // Activity type distribution
    const typeStats = await ActivityLog.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Activities by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyStats = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    // Most active members (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeMembers = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { actor: "$actor", actorName: "$actorName" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      typeDistribution: typeStats,
      dailyActivity: dailyStats,
      mostActiveMembers: activeMembers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Log a new activity (for manual logging)
router.post("/", async (req, res) => {
  try {
    const { type, actor, target, details, metadata } = req.body;

    // Get actor name if not provided
    let actorName = req.body.actorName;
    if (!actorName && actor) {
      const member = await TeamMember.findById(actor);
      if (member) {
        actorName = member.name;
      }
    }

    const activity = new ActivityLog({
      type,
      actor,
      actorName,
      target,
      details,
      metadata,
    });

    await activity.save();

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete old activities (cleanup)
router.delete("/cleanup", async (req, res) => {
  try {
    const { daysOld = 90 } = req.query;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(daysOld));

    const result = await ActivityLog.deleteMany({
      createdAt: { $lt: cutoffDate },
    });

    res.json({
      message: `Deleted ${result.deletedCount} activities older than ${daysOld} days`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity timeline for a specific target (assignment/topic)
router.get("/timeline/:target", async (req, res) => {
  try {
    const { target } = req.params;

    const activities = await ActivityLog.find({
      target: { $regex: target, $options: "i" },
    })
      .populate("actor", "name email role")
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
