import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  settings: {
    isPrivacyFilterOn: { type: Boolean, default: true },
    startingAmount: { type: Number, default: 0 },
  },
  filters: {
    categories: { type: String, default: "all" },
    type: { type: String, default: "all" },
    period: { type: String, default: "this_month" },
    selectedCategories: { type: Array, default: [] },
  },
});

export const User = mongoose.model("User", userSchema);
