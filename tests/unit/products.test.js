const productController = require("../../controller/products");
const ProductModel = require("../../models/Products");

// 해당 함수를 mock 함수로
ProductModel.create = jest.fn();

describe("Product Controller Create", () => {
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });

  it("should call Product.create", () => {
    productController.createProduct();
    expect(ProductModel.create).toBeCalled();
  });
});
