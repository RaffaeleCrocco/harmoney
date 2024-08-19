import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  userId: { type: String, required: true },
  categoryIds: [{ type: String }],
  type: {
    type: String,
    enum: ["expense", "income", "withdrawal"],
    required: true,
  },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
