import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import productRoutes from "./routes/Product.router.js";

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.get("/api/test", (req, res) => {
  res.status(200).send("Test...");
});

app.use(express.json()); // allows acceptance of json data in req.body

// Pass session traffic to routes handler file
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.statis(path.join(__dirname, "/app/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "app", "dist", "index.html"))
  );
}

app.listen(port, () => {
  connectDB(); // connect to db on server startup
  console.log("Listening on port:", port);
});
