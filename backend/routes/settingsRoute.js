import { User } from "../models/userModel.js";
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

router.delete("delete-user/:id", async (req, res) => {
  try {
    const { id } = req.params; //Extract userId from URL
    const { userId } = req.user; // Extract userId from the token payload

    if (userId != id) {
      return res
        .status(400)
        .json({ message: "You dont have the permission to delete this user" });
    }

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
