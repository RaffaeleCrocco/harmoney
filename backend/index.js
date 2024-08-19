import express from "express";
import mongoose from "mongoose";
import { PORT } from "./config.js";
const MONGODB_URL = process.env.mongodbURL;
import authRoute from "./routes/authRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);
app.use("/category", categoryRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log("server port:", PORT);
    });
  })
  .catch((err) => {
    console.error("err connecting to db: ", err);
  });
