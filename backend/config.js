import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const PORT = process.env.PORT || 5551;
export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
