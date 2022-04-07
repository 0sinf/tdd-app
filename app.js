const express = require("express");
const productRoutes = require("./routes");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
