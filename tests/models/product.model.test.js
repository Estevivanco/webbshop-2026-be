import { describe, it, expect, beforeEach } from "vitest";
import Product from "../../src/models/Product.js";
import { clearDatabase } from "../setup.js";

describe("Product model", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  it("should create a new product", async () => {
    const product = new Product({
      name: "Product 1",
      brand: "Nike",
      price: 100,
      dropAt: new Date("2026-01-01"),
      sizes: [{ size: "42", stock: 10 }],
    });
    await product.save();
    expect(product).toBeDefined();
  });

  it("should not create a product with a negative price", async () => {
    const product = new Product({
      name: "Product 1",
      brand: "Nike",
      price: -100,
      dropAt: new Date("2026-01-01"),
      sizes: [{ size: "42", stock: 10 }],
    });
    await expect(product.save()).rejects.toThrow();
  });

  it("should not create a product with a negative stock", async () => {
    const product = new Product({
      name: "Product 1",
      brand: "Nike",
      price: 100,
      dropAt: new Date("2026-01-01"),
      sizes: [{ size: "42", stock: -10 }],
    });
    await expect(product.save()).rejects.toThrow();
  });
});