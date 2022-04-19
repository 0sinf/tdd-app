const productController = require("../../controller/products");
const ProductModel = require("../../models/Products");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");
const products = require("../data/products.json");

// 해당 함수를 mock 함수로
ProductModel.create = jest.fn();
ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();
ProductModel.findByIdAndUpdate = jest.fn();

let req, res, next;
const productId = "shouldMongoDBObjectId";
const updatedProduct = {
  name: "updated name",
  description: "updated description",
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Update", () => {
  it("should have an updateProduct function", () => {
    expect(typeof productController.updateProduct).toEqual("function");
  });

  it("should call Product.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;

    await productController.updateProduct(req, res, next);
    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      { new: true }
    );
  });

  it("should return json body and response code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;

    ProductModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return 404 when item doesn't exist", async () => {
    ProductModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller getProductById", () => {
  it("should have a getProductById function", () => {
    expect(typeof productController.getProductById).toEqual("function");
  });

  it("should call Product.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(ProductModel.findById).toBeCalledWith(productId);
  });

  it("should return json body and response code 200", async () => {
    ProductModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return 404 when item doesn't exist", async () => {
    ProductModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toEqual(404);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller Read", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toEqual("function");
  });

  it("shoud call Product.find", async () => {
    await productController.getProducts(req, res, next);
    expect(ProductModel.find).toHaveBeenCalledWith({});
  });

  it("should return 200 response code", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toEqual(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    ProductModel.find.mockReturnValue(products);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(products);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding product data" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call Product.create", async () => {
    req.body = newProduct;
    await productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    // mock 함수에 리턴 값을 임의로 지정해줌
    ProductModel.create.mockReturnValue(newProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
