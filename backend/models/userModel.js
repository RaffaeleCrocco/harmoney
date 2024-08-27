import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  settings: {
    isPrivacyFilterOn: { type: Boolean, default: true },
    startingAmount: { type: Number, default: 0 },
  },
});

export const User = mongoose.model("User", userSchema);
