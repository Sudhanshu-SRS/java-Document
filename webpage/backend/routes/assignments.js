const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");
const TeamMember = require("../models/TeamMember");
const ActivityLog = require("../models/ActivityLog");

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      category,
      status,
      assigneeId,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = { isDeleted: false };

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (assigneeId) filter.assigneeId = assigneeId;
    if (search) {
      filter.$or = [
        { topic: { $regex: search, $options: "i" } },
        { assignee: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const assignments = await Assignment.find(filter)
      .populate("assigneeId", "name email role")
      .populate("reviewers", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

    const total = await Assignment.countDocuments(filter);

    res.json({
      assignments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignment by ID
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("assigneeId", "name email role githubUsername")
      .populate("reviewers", "name email role")
      .populate("notes.author", "name email");

    if (!assignment || assignment.isDeleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new assignment
router.post("/", async (req, res) => {
  try {
    const {
      topic,
      category,
      assigneeId,
      dueDate,
      priority = "medium",
      description,
      estimatedHours,
      tags,
      reviewers,
    } = req.body;

    // Verify assignee exists
    const assignee = await TeamMember.findById(assigneeId);
    if (!assignee) {
      return res.status(400).json({ error: "Assignee not found" });
    }

    const assignment = new Assignment({
      topic,
      category,
      assignee: assignee.name,
      assigneeId,
      dueDate,
      priority,
      description,
      estimatedHours,
      tags: tags || [],
      reviewers: reviewers || [],
    });

    await assignment.save();

    // Update assignee topic count
    await assignee.updateTopicCounts();

    // Log activity
    await new ActivityLog({
      type: "assignment_created",
      actor: assigneeId,
      actorName: assignee.name,
      target: topic,
      details: {
        description: `New assignment created in ${category}`,
      },
      metadata: {
        assignmentId: assignment._id,
      },
    }).save();

    res.status(201).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update assignment
router.put("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.isDeleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const oldStatus = assignment.status;
    const updates = req.body;

    // If assignee is changing, update assignee name
    if (
      updates.assigneeId &&
      updates.assigneeId !== assignment.assigneeId.toString()
    ) {
      const newAssignee = await TeamMember.findById(updates.assigneeId);
      if (!newAssignee) {
        return res.status(400).json({ error: "New assignee not found" });
      }
      updates.assignee = newAssignee.name;

      // Update both old and new assignee topic counts
      const oldAssignee = await TeamMember.findById(assignment.assigneeId);
      if (oldAssignee) await oldAssignee.updateTopicCounts();
      await newAssignee.updateTopicCounts();
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate("assigneeId", "name email role");

    // Log status change if it occurred
    if (updates.status && updates.status !== oldStatus) {
      await new ActivityLog({
        type: "status_changed",
        actor: updatedAssignment.assigneeId._id,
        actorName: updatedAssignment.assigneeId.name,
        target: updatedAssignment.topic,
        details: {
          from: oldStatus,
          to: updates.status,
          description: `Status changed from ${oldStatus} to ${updates.status}`,
        },
        metadata: {
          assignmentId: updatedAssignment._id,
        },
      }).save();
    }

    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update assignment status only
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, progress } = req.body;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.isDeleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const oldStatus = assignment.status;
    assignment.status = status;

    if (progress !== undefined) {
      assignment.progress = progress;
    }

    await assignment.save();

    // Update assignee topic counts
    const assignee = await TeamMember.findById(assignment.assigneeId);
    if (assignee) {
      await assignee.updateTopicCounts();
    }

    // Log activity
    await new ActivityLog({
      type: "status_changed",
      actor: assignment.assigneeId,
      actorName: assignment.assignee,
      target: assignment.topic,
      details: {
        from: oldStatus,
        to: status,
        description: `Status updated to ${status}`,
      },
      metadata: {
        assignmentId: assignment._id,
      },
    }).save();

    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add note to assignment
router.post("/:id/notes", async (req, res) => {
  try {
    const { content, authorId } = req.body;

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.isDeleted) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const author = await TeamMember.findById(authorId);
    if (!author) {
      return res.status(400).json({ error: "Author not found" });
    }

    assignment.notes.push({
      author: authorId,
      content,
    });

    await assignment.save();

    res.json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete assignment (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    // Update assignee topic counts
    const assignee = await TeamMember.findById(assignment.assigneeId);
    if (assignee) {
      await assignee.updateTopicCounts();
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assignments due today
router.get("/due/today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const assignments = await Assignment.find({
      dueDate: { $gte: today, $lt: tomorrow },
      status: { $ne: "completed" },
      isDeleted: false,
    })
      .populate("assigneeId", "name email")
      .sort({ priority: -1, dueDate: 1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get overdue assignments
router.get("/overdue", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const assignments = await Assignment.find({
      dueDate: { $lt: today },
      status: { $ne: "completed" },
      isDeleted: false,
    })
      .populate("assigneeId", "name email")
      .sort({ dueDate: 1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
