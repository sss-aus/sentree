"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import {
  FaShoppingCart,
  FaTag,
  FaDollarSign,
  FaLink,
  FaImage,
  FaInfoCircle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

// Zod schema for product validation
const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  link: z.string().url("Invalid URL"),
  productImages: z
    .array(z.instanceof(File))
    .nonempty("At least one image is required"),
});

type Product = {
  productName: string;
  description?: string;
  price: string;
  link: string;
  productImages: File[];
};

export default function ProductPage() {
  // Form state
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  // List of added products
  const [products, setProducts] = useState<Product[]>([]);

  // Handle multiple image uploads
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductImages(filesArray);
    }
  };

  // Form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = { productName, description, price, link, productImages };
    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path.join(".")] = err.message;
      });
      setErrors(fieldErrors);
      setMessage("");
      return;
    }

    // If valid, add product to list
    setErrors({});
    const newProduct: Product = {
      productName,
      description,
      price,
      link,
      productImages,
    };
    setProducts([...products, newProduct]);
    setMessage("Product added successfully!");

    // Reset fields
    setProductName("");
    setDescription("");
    setPrice("");
    setLink("");
    setProductImages([]);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#181818]">
        Product Management
      </h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 border border-[#181818]/20"
      >
        <h2 className="text-2xl font-semibold text-[#181818] mb-4 flex items-center">
          <FaShoppingCart className="mr-2" /> Add New Product
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-[#181818] font-semibold mb-1 flex items-center">
            <FaTag className="mr-2" /> Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#181818]"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-[#181818] font-semibold mb-1 flex items-center">
            <FaInfoCircle className="mr-2" /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={3}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#181818]"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-[#181818] font-semibold mb-1 flex items-center">
            <FaDollarSign className="mr-2" /> Price
          </label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#181818]"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Buy Link */}
        <div className="mb-4">
          <label className="block text-[#181818] font-semibold mb-1 flex items-center">
            <FaLink className="mr-2" /> Buy Link
          </label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter URL to purchase"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#181818]"
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
        </div>

        {/* Product Images */}
        <div className="mb-4">
          <label className="block text-[#181818] font-semibold mb-1 flex items-center">
            <FaImage className="mr-2" /> Product Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImagesChange}
            className="w-full text-sm text-[#181818] file:mr-4 file:py-2 file:px-4 file:border file:border-[#181818]/50 file:text-[#181818] file:bg-white hover:file:bg-gray-100"
          />
          {errors.productImages && (
            <p className="text-red-500 text-sm">{errors.productImages}</p>
          )}
          {productImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {productImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded border border-[#181818]/50"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-[#181818] text-white font-semibold rounded hover:bg-gray-800 transition duration-200"
          >
            Add Product
          </button>
        </div>
        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
      </form>

      {/* Product List */}
      <div>
        <h2 className="text-2xl font-semibold text-[#181818] mb-4 flex items-center">
          <FaShoppingCart className="mr-2" /> Your Products
        </h2>
        {products.length === 0 ? (
          <p className="text-[#181818]">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md border border-[#181818]/10"
              >
                <div className="mb-4">
                  {product.productImages.length > 0 && (
                    <img
                      src={URL.createObjectURL(product.productImages[0])}
                      alt={product.productName}
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#181818]">
                  {product.productName}
                </h3>
                <p className="text-[#181818]">{product.description}</p>
                <p className="mt-2 text-lg font-semibold text-[#181818]">
                  Price: ${product.price}
                </p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[#181818] underline"
                >
                  Buy Now
                </a>
                <button
                  type="button"
                  onClick={() =>
                    setProducts(products.filter((_, index) => index !== idx))
                  }
                  className="mt-3 flex items-center text-red-600 hover:text-red-800 transition duration-200"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
