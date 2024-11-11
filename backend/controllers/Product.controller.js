import Product from "../models/Product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  try {
    const fetchedProduct = await Product.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Product Found!", data: fetchedProduct });
  } catch (err) {
    console.error("Product could not be found: ", error.message);
    res.status(404).json({ success: false, message: "Record not found" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // set new product data to body (json data)

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Product data missing" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct }); // 201 'created' code
  } catch (error) {
    console.error("Failed to create product: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body; // Get new data for update

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }); // new returns updated object
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Failed to update product: ", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params; // Get id from url params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" }); // 200 success code
  } catch (error) {
    console.error("Failed to delete product: ", error.message);
    res.status(500).json({ success: false, message: "Product not found" });
  }
};
