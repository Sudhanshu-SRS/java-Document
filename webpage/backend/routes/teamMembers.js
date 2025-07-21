const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember");
const ActivityLog = require("../models/ActivityLog");

// Get all team members
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 50, role, isActive = true } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (isActive !== "all") filter.isActive = isActive === "true";

    const members = await TeamMember.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await TeamMember.countDocuments(filter);

    res.json({
      members,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new team member
router.post("/", async (req, res) => {
  try {
    const { name, email, role, skills, githubUsername } = req.body;

    // Check if email already exists
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const member = new TeamMember({
      name,
      email,
      role,
      skills: skills || [],
      githubUsername,
    });

    await member.save();

    // Log activity
    await new ActivityLog({
      type: "member_added",
      actor: member._id,
      actorName: member.name,
      target: member.name,
      details: {
        description: `New ${role} added to the team`,
      },
      metadata: {
        teamMemberId: member._id,
      },
    }).save();

    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update team member
router.put("/:id", async (req, res) => {
  try {
    const { name, email, role, skills, githubUsername, isActive } = req.body;

    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }

    // Check if email already exists (excluding current member)
    if (email && email !== member.email) {
      const existingMember = await TeamMember.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (existingMember) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name: name || member.name,
        email: email || member.email,
        role: role || member.role,
        skills: skills || member.skills,
        githubUsername,
        isActive: isActive !== undefined ? isActive : member.isActive,
      },
      { new: true, runValidators: true }
    );

    // Log activity
    await new ActivityLog({
      type: "member_updated",
      actor: updatedMember._id,
      actorName: updatedMember.name,
      target: updatedMember.name,
      details: {
        description: "Profile updated",
      },
      metadata: {
        teamMemberId: updatedMember._id,
      },
    }).save();

    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete team member (soft delete)
router.delete("/:id", async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }

    res.json({ message: "Team member deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get team member statistics
router.get("/:id/stats", async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Team member not found" });
    }

    const Assignment = require("../models/Assignment");

    const stats = await Assignment.aggregate([
      { $match: { assigneeId: member._id, isDeleted: false } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalHours: { $sum: "$actualHours" },
        },
      },
    ]);

    const recentAssignments = await Assignment.find({
      assigneeId: member._id,
      isDeleted: false,
    })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("topic status dueDate progress");

    res.json({
      member,
      stats,
      recentAssignments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
