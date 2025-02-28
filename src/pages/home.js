import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../api';
import ProductCart from '../components/productCart';
import { FaFilter, FaSortAmountDown, FaSortAmountUp, FaUserCog } from 'react-icons/fa'; // Import icons

const Home = () => {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]); // State for filtered products
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to control drawer visibility
  const [priceSortOrder, setPriceSortOrder] = useState('none'); // State for price sorting order
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPosts();
        setData2(posts);
        setFilteredData(posts); // Initialize filteredData with all products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract unique categories from data2
  const categories = [...new Set(data2.map((item) => item.category.name))];

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredData(data2); // Show all products
    } else {
      const filteredProducts = data2.filter(
        (product) => product.category.name === category
      );
      setFilteredData(filteredProducts); // Show products of the selected category
    }
    setIsDrawerOpen(false); // Close the drawer after selecting a category
  };

  // Handle price sorting
  const handlePriceSort = () => {
    let sortedData = [...filteredData];
    if (priceSortOrder === 'none' || priceSortOrder === 'lowToHigh') {
      // Sort high to low
      sortedData.sort((a, b) => b.price - a.price);
      setPriceSortOrder('highToLow');
    } else {
      // Sort low to high
      sortedData.sort((a, b) => a.price - b.price);
      setPriceSortOrder('lowToHigh');
    }
    setFilteredData(sortedData);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#2C3E50]">Explore Our Collection</h1>
        <button
          onClick={() => navigate('/admin')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
        >
          <FaUserCog className="w-5 h-5" /> {/* Admin icon */}
          Admin
        </button>
      </div>

      {/* Filter and Sort Buttons */}
      <div className="mb-8 flex gap-4">
        {/* Category Drawer Button */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2"
        >
          <FaFilter className="w-5 h-5" /> {/* Filter icon */}
          Categories
        </button>

        {/* Price Sorting Button */}
        <button
          onClick={handlePriceSort}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
        >
          {priceSortOrder === 'highToLow' ? (
            <FaSortAmountDown className="w-5 h-5" /> // Sort high-to-low icon
          ) : (
            <FaSortAmountUp className="w-5 h-5" /> // Sort low-to-high icon
          )}
          {priceSortOrder === 'highToLow' ? 'High to Low' : 'Low to High'}
        </button>
      </div>

      {/* Category Drawer */}
      {isDrawerOpen && (
        <div className="absolute bg-white shadow-xl p-4 rounded-lg z-10 w-64">
          <button
            onClick={() => handleCategoryFilter('All')}
            className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300'
            }`}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryFilter(category)}
              className={`block w-full text-left px-4 py-2 mb-2 rounded-md ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <ProductCart key={product.id} data={product} cate={selectedCategory} />
          ))
        ) : (
          <p className="text-center text-xl text-gray-600 col-span-full">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;