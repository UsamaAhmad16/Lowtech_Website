// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Admin = () => {
//   const navigate = useNavigate();

//   // State to store form inputs
//   const [product, setProduct] = useState({
//     name: '',
//     imageUrl: '',
//     price: '',
//     slug: '',
//     description: '', // Product description
//     stockQuantity: '',
//     categoryId: '',
//     categoryName: '', // Category name
//   });

//   // State to track if the form is submitted
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   // State to store the API response (e.g., the created product ID)
//   const [apiResponse, setApiResponse] = useState(null);

//   // State to store the selected image file
//   const [selectedImage, setSelectedImage] = useState(null);

//   // State to store error messages
//   const [errorMessage, setErrorMessage] = useState('');

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   // Handle image file selection
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage(''); // Clear previous error messages

//     // Prepare the data for the API
//     const productData = {
//       name: product.name,
//       description: product.description, // Product description
//       price: parseFloat(product.price), // Convert string to number
//       stockQuantity: parseInt(product.stockQuantity, 10), // Convert string to number
//       createdAt: new Date().toISOString(), // Current timestamp
//       category: {
//         categoryId: parseInt(product.categoryId, 10), // Convert string to number
//         name: product.categoryName, // Category name
//       },
//       updatedAt: new Date().toISOString(), // Current timestamp
//       imageId: 0, // Assuming this is to be set by the backend or is static
//       imageUrl: product.imageUrl,
//       slug: product.slug,
//     };

//     try {
//       // Step 1: Create the product
//       const response = await fetch(
//         'http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products',
//         {
//           method: 'POST',
//           headers: {
//             'accept': '*/*',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(productData),
//         }
//       );

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         console.error('Error creating product:', errorResponse);
//         setErrorMessage(`Failed to create product: ${errorResponse.message || 'Unknown error'}`);
//         return;
//       }

//       // Parse the API response
//       const result = await response.json();
//       console.log('Product created successfully:', result);

//       // Store the API response in state
//       setApiResponse(result);

//       // Step 2: Upload the image if a file is selected
//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append('file', selectedImage);

//         const imageUploadResponse = await fetch(
//           `http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products/${result.productId}/upload-image?isPrimary=true`,
//           {
//             method: 'POST',
//             headers: {
//               'accept': '*/*',
              
//             },
//             body: formData,
//           }
//         );

//         if (!imageUploadResponse.ok) {
//           const errorResponse = await imageUploadResponse.json();
//           console.error('Error uploading image:', errorResponse);
//           setErrorMessage(`Failed to upload image: ${errorResponse.message || 'Unknown error'}`);
//           return;
//         }

//         const imageUploadResult = await imageUploadResponse.json();
//         console.log('Image uploaded successfully:', imageUploadResult);
//       }

//       // Set isSubmitted to true to show the image and response
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error saving product or uploading image:', error);
//       setErrorMessage('Product has been added');
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-5">Admin - Add Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Product Name */}
//         <div>
//           <label className="block text-sm font-medium">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Product Description */}
//         <div>
//           <label className="block text-sm font-medium">Product Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-sm font-medium">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Slug */}
//         <div>
//           <label className="block text-sm font-medium">Slug</label>
//           <input
//             type="text"
//             name="slug"
//             value={product.slug}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Stock Quantity */}
//         <div>
//           <label className="block text-sm font-medium">Stock Quantity</label>
//           <input
//             type="number"
//             name="stockQuantity"
//             value={product.stockQuantity}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Category ID */}
//         <div>
//           <label className="block text-sm font-medium">Category ID</label>
//           <input
//             type="text"
//             name="categoryId"
//             value={product.categoryId}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Category Name */}
//         <div>
//           <label className="block text-sm font-medium">Category Name</label>
//           <input
//             type="text"
//             name="categoryName"
//             value={product.categoryName}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Image URL */}
//         <div>
//           <label className="block text-sm font-medium">Image URL</label>
//           <input
//             type="text"
//             name="imageUrl"
//             value={product.imageUrl}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium">Upload Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             className="w-full p-2 border rounded"
//             accept="image/*"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex space-x-4">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Save Product
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/')}
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//           >
//             Back to Home
//           </button>
//         </div>
//       </form>

//       {/* Display error message if any */}
//       {errorMessage && (
//         <div className="mt-5 text-red-500">
//           <p>{errorMessage}</p>
//         </div>
//       )}

//       {/* Conditionally render the image and API response after form submission */}
//       {isSubmitted && (
//         <div className="mt-5">
//           <h2 className="text-xl font-bold mb-3">Product Image Preview</h2>
//           {selectedImage && (
//             <img
//               src={URL.createObjectURL(selectedImage)}
//               alt="Product Preview"
//               className="w-full max-w-md h-auto border rounded"
//             />
//           )}

//           {/* Display API Response */}
//           <div className="mt-5">
//             <h2 className="text-xl font-bold mb-3">API Response</h2>
//             <pre className="bg-gray-100 p-4 rounded">
//               {JSON.stringify(apiResponse, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

//----------------------------------------------------------------------------------------------


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  // State to store form inputs for adding a product
  const [product, setProduct] = useState({
    name: '',
    price: '',
    slug: '',
    description: '', // Product description
    stockQuantity: '',
    categoryId: '',
    categoryName: '', // Category name
  });

  // State to track if the form is submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State to store the API response (e.g., the created product ID)
  const [apiResponse, setApiResponse] = useState(null);

  // State to store the selected image file
  const [selectedImage, setSelectedImage] = useState(null);

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState('');

  // State to store all products for deletion
  const [products, setProducts] = useState([]);

  // State to store the product ID to delete
  const [productIdToDelete, setProductIdToDelete] = useState('');

  // State to control the visibility of the delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handle form input changes for adding a product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image file selection for adding a product
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Handle form submission for adding a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    // Prepare the data for the API
    const productData = {
      name: product.name,
      description: product.description, // Product description
      price: parseFloat(product.price), // Convert string to number
      stockQuantity: parseInt(product.stockQuantity, 10), // Convert string to number
      createdAt: new Date().toISOString(), // Current timestamp
      category: {
        categoryId: parseInt(product.categoryId, 10), // Convert string to number
        name: product.categoryName, // Category name
      },
      updatedAt: new Date().toISOString(), // Current timestamp
      imageId: 0, // Assuming this is to be set by the backend or is static
      slug: product.slug,
    };

    try {
      // Step 1: Create the product
      const response = await fetch(
        'http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products',
        {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error creating product:', errorResponse);
        setErrorMessage(`Failed to create product: ${errorResponse.message || 'Unknown error'}`);
        return;
      }

      // Parse the API response
      const result = await response.json();
      console.log('Product created successfully:', result);

      // Store the API response in state
      setApiResponse(result);

      // Step 2: Upload the image if a file is selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const imageUploadResponse = await fetch(
          `http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products/${result.productId}/upload-image?isPrimary=true`,
          {
            method: 'POST',
            headers: {
              'accept': '*/*',
            },
            body: formData,
          }
        );

        if (!imageUploadResponse.ok) {
          const errorResponse = await imageUploadResponse.json();
          console.error('Error uploading image:', errorResponse);
          setErrorMessage(`Failed to upload image: ${errorResponse.message || 'Unknown error'}`);
          return;
        }

        const imageUploadResult = await imageUploadResponse.json();
        console.log('Image uploaded successfully:', imageUploadResult);
      }

      // Set isSubmitted to true to show the image and response
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving product or uploading image:', error);
      setErrorMessage('Product has been added');
    }
  };

  // Fetch all products for deletion
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products',
        {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error fetching products:', errorResponse);
        setErrorMessage(`Failed to fetch products: ${errorResponse.message || 'Unknown error'}`);
        return;
      }

      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products. Please try again.');
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!productIdToDelete) {
      setErrorMessage('Please enter a product ID to delete.');
      return;
    }

    try {
      const response = await fetch(
        `http://webshop-dev-env.eba-v7q5pntk.eu-central-1.elasticbeanstalk.com/api/products/${productIdToDelete}`,
        {
          method: 'DELETE',
          headers: {
            'accept': '*/*',
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error deleting product:', errorResponse);
        setErrorMessage(`Failed to delete product: ${errorResponse.message || 'Unknown error'}`);
        return;
      }

      console.log('Product deleted successfully');
      setErrorMessage('Product deleted successfully.');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage('Failed to delete product. Please try again.');
    }
  };

  // Open the delete modal and fetch products
  const openDeleteModal = async () => {
    setIsDeleteModalOpen(true);
    await fetchProducts();
  };

  // Close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductIdToDelete('');
    setErrorMessage('');
  };

  return (
    <div className="p-5">
      {/* Top Buttons */}
      <div className="flex space-x-4 mb-5">
        <button
          onClick={openDeleteModal}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Delete Product
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-5">Admin - Add Product</h1>

      {/* Add Product Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
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

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium">Product Description</label>
          <textarea
            name="Desc"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="Amount"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Slug */}
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

        {/* Stock Quantity */}
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

        {/* Category ID */}
        <div>
          <label className="block text-sm font-medium">Category ID</label>
          <input
            type="text"
            name="categoryId"
            value={product.categoryId}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category Name */}
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="categoryName"
            value={product.categoryName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Save Product
          </button>
        </div>
      </form>

      {/* Display error message if any */}
      {errorMessage && (
        <div className="mt-5 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Conditionally render the image and API response after form submission */}
      {isSubmitted && (
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-3">Product Image Preview</h2>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Product Preview"
              className="w-full max-w-md h-auto border rounded"
            />
          )}

          {/* Display API Response */}
          <div className="mt-5">
            <h2 className="text-xl font-bold mb-3">API Response</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Delete Product</h2>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Side: List of Products */}
              <div className="w-1/2 pr-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">All Products</h3>
                <ul className="space-y-2">
                  {products.map((product) => (
                    <li key={product.productId} className="border p-4 rounded">
                      <p><strong>ID:</strong> {product.productId}</p>
                      <p><strong>Name:</strong> {product.name}</p>
                      <p><strong>Price:</strong> ${product.price}</p>
                      <p><strong>Image:</strong> <img src={product.imageUrl} alt={product.name} className="w-20 h-auto" /></p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Delete Product Form */}
              <div className="w-1/2 pl-4 border-l">
                <h3 className="text-lg font-semibold mb-4">Delete by Product ID</h3>
                <div>
                  <label className="block text-sm font-medium">Enter Product ID to Delete</label>
                  <input
                    type="text"
                    value={productIdToDelete}
                    onChange={(e) => setProductIdToDelete(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter Product ID"
                  />
                </div>
                <button
                  onClick={handleDeleteProduct}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete Product
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4">
              {errorMessage && (
                <div className="text-red-500">
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;