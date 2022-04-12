const productModel = require("../models/Products");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(404).send();
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
