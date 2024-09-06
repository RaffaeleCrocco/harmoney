import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import express from "express";
import mongoose from "mongoose";
import { Transaction } from "../models/transactionModel.js";
import { Category } from "../models/categoryModel.js";

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

router.put("/update", async (req, res) => {
  const { filters } = req.body;
  const id = req.user.userId; // Extract userId from the token

  if (!filters) {
    return res.status(400).json({ message: "Filters are required" });
  } //debugging

  try {
    const updatedUserFilters = await User.findByIdAndUpdate(
      id,
      { filters },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUserFilters);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
