const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./routes/products");

const PORT = 3000;

const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(console.log);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;
