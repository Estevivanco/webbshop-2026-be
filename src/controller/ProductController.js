import ProductRepository from "../repository/ProductRepository.js";

export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts();
  res.json(products);
}

export async function createProduct(req, res) {
  const product = await ProductRepository.createProduct(req.body);
  res.status(201).json(product);
}

//TODO: Add more controller functions as needed