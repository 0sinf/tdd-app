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

test("should return 500 on POST /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "Phone" });

  expect(response.statusCode).toEqual(500);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

test("GET /api/products", async () => {
  const response = await request(app).get("/api/products").send();

  expect(response.statusCode).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
});
