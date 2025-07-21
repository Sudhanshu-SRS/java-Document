const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["core-java", "backend", "frontend"],
      trim: true,
    },
    assignee: {
      type: String,
      required: true,
      trim: true,
    },
    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamMember",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "review", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    estimatedHours: {
      type: Number,
      min: 0,
    },
    actualHours: {
      type: Number,
      min: 0,
    },
    startDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    reviewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    documentationUrl: {
      type: String,
      trim: true,
    },
    githubPrUrl: {
      type: String,
      trim: true,
    },
    notes: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "TeamMember",
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
assignmentSchema.index({ assigneeId: 1, status: 1 });
assignmentSchema.index({ category: 1, status: 1 });
assignmentSchema.index({ dueDate: 1, status: 1 });

// Virtual for days remaining
assignmentSchema.virtual("daysRemaining").get(function () {
  if (this.status === "completed") return 0;
  const today = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for is overdue
assignmentSchema.virtual("isOverdue").get(function () {
  if (this.status === "completed") return false;
  return this.daysRemaining < 0;
});

// Pre-save middleware to update dates
assignmentSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "in-progress" && !this.startDate) {
      this.startDate = new Date();
    }
    if (this.status === "completed" && !this.completionDate) {
      this.completionDate = new Date();
      this.progress = 100;
    }
  }
  next();
});

// Post-save middleware to update team member counts
assignmentSchema.post("save", async function (doc) {
  if (doc.assigneeId) {
    const TeamMember = mongoose.model("TeamMember");
    const member = await TeamMember.findById(doc.assigneeId);
    if (member) {
      await member.updateTopicCounts();
    }
  }
});

module.exports = mongoose.model("Assignment", assignmentSchema);
