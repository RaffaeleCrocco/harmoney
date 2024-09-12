import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  hexColor: { type: String },
  description: { type: String },
  userId: { type: String, required: true },
  budget: { type: Number },
});

export const Category = mongoose.model("Category", categorySchema);
