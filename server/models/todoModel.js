import mongoose from "mongoose";
import { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: "Project", // Assuming there's a Project model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
