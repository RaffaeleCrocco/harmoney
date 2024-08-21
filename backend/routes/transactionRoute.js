import { Transaction } from "../models/transactionModel.js";
import { Category } from "../models/categoryModel.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
import express from "express";

const router = express.Router();

// Middleware to check if token is valid and extract user info
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Get token from 'Bearer <token>'

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user information to request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Middleware to check if token is valid and extract user info
router.use(authenticateToken);

// Create a new transaction
router.post("/create", async (req, res) => {
  const { type, amount, title, date, categoryIds } = req.body;
  const userId = req.user.userId; // Extract userId from the token

  try {
    if (!userId || !type || !amount || !title || !date) {
      return res.status(400).json({ message: "Missing fields on request" });
    }

    if (categoryIds && categoryIds.length > 0) {
      // Fetch categories by IDs
      const categories = await Category.find({
        _id: { $in: categoryIds },
        userId,
      });

      // Check if the number of valid categories matches the number of provided categoryIds
      if (categories.length !== categoryIds.length) {
        return res.status(400).json({ message: "Invalid categories" });
      }
    }

    // Create the new transaction
    const newTransaction = { userId, type, amount, title, date, categoryIds };
    const transaction = await Transaction.create(newTransaction);

    res.status(201).json(transaction);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "transaction not found" });
    }
    return res
      .status(200)
      .send({ message: "transaction deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { userId } = req.user; // Extract userId from the token payload
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    // Find the transaction by ID and ensure it belongs to the current user
    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const { type, amount, title, date, categoryIds } = req.body;
  const userId = req.user.userId; // Extract userId from the token

  try {
    // Find the existing transaction
    const transaction = await Transaction.findOne({ _id: id, userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    let categories = [""];

    // Obtain a categories array with only the valids one from the ones that are passed
    if (categoryIds && categoryIds.length > 0) {
      // Fetch categories by IDs
      categories = await Category.find({
        _id: { $in: categoryIds },
        userId,
      });
    }

    // Update the transaction fields
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, amount, title, date, categories },
      { new: true, runValidators: true } // Return the updated document and apply validators
    );

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.user; // Extract userId from the token payload

  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json({
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
