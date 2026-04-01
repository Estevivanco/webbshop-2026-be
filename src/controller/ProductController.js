import ProductRepository from "../repository/ProductRepository.js";

export async function getProducts(req, res) {
  const products = await ProductRepository.getProducts();
  res.json(products);
}

export async function createProduct(req, res) {
  try {
    const product = await ProductRepository.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "A product with this name already exists" });
    }
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function getProductBySlug(req, res) {
  const product = await ProductRepository.getProductBySlug(req.params.slug);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product)
}

export async function updateProduct(req, res) {
  const product = await ProductRepository.updateProduct(req.params.slug, req.body);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product)
}

export async function deleteProduct(req, res) {
  const product = await ProductRepository.deleteProduct(req.params.slug);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(204).send()
}
