const request = require("supertest");
const app = require("../../app");

let newProductData = require("../data/new-product.json");

test("POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send(newProductData);

  expect(response.statusCode).toEqual(201);
  expect(response.body.name).toEqual(newProductData.name);
  expect(response.body.description).toEqual(newProductData.description);
});
