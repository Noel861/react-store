import mongoose from "mongoose";
import Product from "../models/products.js";

// Get all products
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const product = req.body;

  // Validate required fields
  if (!product.name || !product.price || !product.imageUrl) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  // Map imageUrl to image (if your Product schema uses 'image')
  const newProduct = new Product({
    name: product.name,
    price: product.price,
    image: product.imageUrl, // map imageUrl to 'image' field in DB
  });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting product with ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Product ID",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};
