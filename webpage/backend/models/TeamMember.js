const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["developer", "trainee", "lead"],
      default: "developer",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    assignedTopics: {
      type: Number,
      default: 0,
    },
    completedTopics: {
      type: Number,
      default: 0,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    githubUsername: {
      type: String,
      trim: true,
    },
    lastLoginDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for completion rate
teamMemberSchema.virtual("completionRate").get(function () {
  if (this.assignedTopics === 0) return 0;
  return Math.round((this.completedTopics / this.assignedTopics) * 100);
});

// Method to update topic counts
teamMemberSchema.methods.updateTopicCounts = async function () {
  const Assignment = mongoose.model("Assignment");

  const assigned = await Assignment.countDocuments({
    assigneeId: this._id,
    isDeleted: false,
  });

  const completed = await Assignment.countDocuments({
    assigneeId: this._id,
    status: "completed",
    isDeleted: false,
  });

  this.assignedTopics = assigned;
  this.completedTopics = completed;

  return this.save();
};

module.exports = mongoose.model("TeamMember", teamMemberSchema);
