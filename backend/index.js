import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URL } from "./config.js";
import authRoute from "./routes/authRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import settingsRoute from "./routes/settingsRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);
app.use("/category", categoryRoute);
app.use("/settings", settingsRoute);

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
