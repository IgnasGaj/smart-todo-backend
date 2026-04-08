import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    dueDate: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
