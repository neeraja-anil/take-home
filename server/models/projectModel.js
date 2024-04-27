import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    todos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Todo",
      default: [],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

export default Project;
