const express = require("express");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);
