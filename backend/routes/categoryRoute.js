import { Category } from "../models/categoryModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
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

// Create a new Category
router.post("/create", async (req, res) => {
  const { name, description, hexColor } = req.body;
  const userId = req.user.userId; // Extract userId from the token

  try {
    if (!userId || !name) {
      return res.status(400).json({ message: "Missing fields on request" });
    }

    // Check if a category with the same name already exists for the user
    const existingCategory = await Category.findOne({ name, userId });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category with this name already exists for this user",
      });
    }

    // Create the new category
    const newCategory = { name, description, userId, hexColor };
    const category = await Category.create(newCategory);

    res.status(201).json(category);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "category not found" });
    }
    return res
      .status(200)
      .send({
        deletedCategoryId: id,
        message: "category deleted successfully",
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { userId } = req.user; // Extract userId from the token payload
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    // Find the category by ID and ensure it belongs to the current user
    const category = await Category.findOne({ _id: id, userId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  const { name, description, hexColor } = req.body;
  const userId = req.user.userId; // Extract userId from the token

  try {
    if (!userId || !name) {
      return res.status(400).json({ message: "Missing fields on request" });
    }

    // Update the category fields
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, hexColor },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const { userId } = req.user; // Extract userId from the token payload

  try {
    const categories = await Category.find({ userId });
    res.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
