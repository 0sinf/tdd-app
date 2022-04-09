const productController = require("../../controller/products");
const ProductModel = require("../../models/Products");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

// 해당 함수를 mock 함수로
ProductModel.create = jest.fn();

describe("Product Controller Create", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
  });

  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call Product.create", () => {
    req.body = newProduct;
    productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });
});
