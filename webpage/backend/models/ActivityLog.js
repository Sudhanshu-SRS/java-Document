const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "assignment_created",
        "assignment_updated",
        "status_changed",
        "member_added",
        "member_updated",
      ],
      required: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamMember",
      required: true,
    },
    actorName: {
      type: String,
      required: true,
    },
    target: {
      type: String, // assignment title or member name
      required: true,
    },
    details: {
      from: String,
      to: String,
      description: String,
    },
    metadata: {
      assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
      teamMemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamMember",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ actor: 1, createdAt: -1 });

module.exports = mongoose.model("ActivityLog", activityLogSchema);
