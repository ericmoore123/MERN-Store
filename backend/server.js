import express from "express";
import { connectDB } from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/Product.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/test", (req, res) => {
  res.status(200).send("Test...");
});

app.use(express.json()); // allows acceptance of json data in req.body

// Pass session traffic to routes handler file
app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB(); // connect to db on server startup
  console.log("Listening on port:", port);
});
