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

router.delete("/delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params; //Extract userId from URL
    const { userId } = req.user; // Extract userId from the token payload

    if (userId != id) {
      return res
        .status(400)
        .json({ message: "You dont have the permission to delete this user" });
    }

    const userObjId = new mongoose.Types.ObjectId(id);

    const result = await User.findByIdAndDelete(userObjId);
    const deleteUserTransactions = await Transaction.deleteMany({
      userId: userObjId,
    });
    const deleteUserCategories = await Category.deleteMany({
      userId: userObjId,
    });

    if (!result) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!deleteUserTransactions) {
      return res
        .status(400)
        .json({ message: "problem deleting transactions of the user" });
    }
    if (!deleteUserCategories) {
      return res
        .status(400)
        .json({ message: "problem deleting categories of the user" });
    }

    return res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const {
    isPrivacyFilterOn,
    startingAmount,
    isSimpleModeOn,
    isRememberFiltersOn,
  } = req.body;
  const id = req.user.userId; // Extract userId from the token

  try {
    // Update the user settings fields
    const updatedUserSettings = await User.findByIdAndUpdate(
      id,
      {
        settings: {
          isPrivacyFilterOn,
          startingAmount,
          isSimpleModeOn,
          isRememberFiltersOn,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedUserSettings);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
