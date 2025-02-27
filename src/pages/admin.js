import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  // State to store form inputs
  const [product, setProduct] = useState({
    name: '',
    id: '',
    image: '',
    price: '',
    slug: '',
    description: '',
    stockQuantity: '',
    category: '',
  });

  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault();
  
    // // Prepare the data for the API
    // const productData = {
    //   productId: parseInt(product.id, 10), // Convert string to number
    //   name: product.name,
    //   description: product.description,
    //   price: parseFloat(product.price), // Convert string to number
    //   stockQuantity: parseInt(product.stockQuantity, 10), // Convert string to number
    //   createdAt: new Date().toISOString(), // Current timestamp
    //   category: {
    //     categoryId: 0, // You can update this if you have a category ID
    //     name: product.category,
    //     description: product.category, // You can update this if you have a category description
    //   },
    //   updatedAt: new Date().toISOString(), // Current timestamp
    //   imageId: 0, // You can update this if you have an image ID
    //   imageUrl: product.image,
    //   slug: product.slug,
    // };
  
    // try {
    // //   console.log('Sending request with payload:', productData);
  
    //   // Make the API call
    //   const response = await fetch(
    //     'http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'accept': '*/*',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(productData),
    //     }
    //   );
  
    //   console.log('Response status:', response.status);
  
    //   if (!response.ok) {
    //     const errorResponse = await response.json();
    //     console.error('Error response:', errorResponse);
    //     throw new Error('Failed to save product');
    //   }
  
    //   const result = await response.json();
    //   console.log('Product saved successfully:', result);
  
    //   // Set isSubmitted to true to show the image
    //   setIsSubmitted(true);
    // } catch (error) {
    //   console.error('Error saving product:', error);
    //   alert('Failed to save product. Please try again.');
    //   console.log('Sending request with payload:', productData);
    // }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Admin - Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product ID</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image Link</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </form>

      {/* Conditionally render the image after form submission */}
      {isSubmitted && (
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3">Product Image Preview</h2>
          <img
            src={product.image}
            alt="Product Preview"
            className="w-full max-w-md h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default Admin;