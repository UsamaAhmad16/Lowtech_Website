// import React, { useState, useEffect, useRef } from 'react'; // Import useRef
// import { Link } from 'react-router-dom';
// import iconCart from '../assets/images/iconCart.png';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleStatusTab } from '../stores/cart';
// import { getPosts } from '../api';

// const Header = () => {
//     const [totalQuantity, setTotalQuantity] = useState(0);
//     const carts = useSelector(store => store.cart.items);
//     const dispatch = useDispatch();
//     const [data2, setData2] = useState([]);
//     const [searchText, setSearchText] = useState(''); // State to store search text
//     const [matchedItems, setMatchedItems] = useState([]); // State to store matched items
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
//     const dropdownRef = useRef(null); // Ref for the dropdown container

//     useEffect(() => {
//         let total = 0;
//         carts.forEach(item => total += item.quantity);
//         setTotalQuantity(total);
//     }, [carts]);

//     useEffect(() => {
//         getPosts().then((posts) => setData2(posts));
//     }, []);

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false); // Close the dropdown
//             }
//         };

//         // Add event listener when the dropdown is open
//         if (isDropdownOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }

//         // Cleanup the event listener
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isDropdownOpen]);

//     const handleOpenTabCart = () => {
//         dispatch(toggleStatusTab());
//     };

//     const handleSearchChange = (e) => {
//         const text = e.target.value.toLowerCase(); // Convert search text to lowercase
//         setSearchText(text); // Update search text state

//         if (text) {
//             const matchedItems = data2.filter((item) =>
//                 item.name.toLowerCase().includes(text) // Check if the item name includes the search text
//             );
//             setMatchedItems(matchedItems); // Update matched items state
//             setIsDropdownOpen(true); // Open the dropdown
//         } else {
//             setMatchedItems([]); // Clear matched items if search text is empty
//             setIsDropdownOpen(false); // Close the dropdown
//         }
//     };

//     return (
//         <header className='flex flex-col justify-between items-center mb-5 p-4 bg-blue-500 shadow-md rounded-lg w-full'>
//             <div className='flex justify-between items-center w-full'>
//                 <Link to="/" className='text-5xl font-semibold'>LowTech GmbH</Link>
//                 <div className="relative" ref={dropdownRef}>
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         value={searchText}
//                         onChange={handleSearchChange}
//                         className='border border-gray-300 p-2 rounded-md w-64 outline-none'
//                     />
//                     {/* Dropdown for matched items */}
//                     {isDropdownOpen && matchedItems.length > 0 && (
//                         <div className="absolute top-full left-0 w-64 bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
//                             <ul>
//                                 {matchedItems.map((item) => (
//                                     <li
//                                         key={item.id}
//                                         className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
//                                     >
//                                         {/* Wrap the image in a Link */}
//                                         <Link to={item.slug} className="flex items-center">
//                                             <img
//                                                 src={item.imageUrl} // Use the imageUrl from the API data
//                                                 alt={item.name}
//                                                 className="w-10 h-10 object-cover rounded-md mr-2"
//                                             />
//                                             {/* Display the name */}
//                                             <span>{item.name}</span>
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//                 <div
//                     className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative cursor-pointer'
//                     onClick={handleOpenTabCart}
//                 >
//                     <img src={iconCart} alt="Cart" className='w-6' />
//                     <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
//                         {totalQuantity}
//                     </span>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTab } from '../stores/cart';
import { getPosts } from '../api';

const Header = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();
    const [data2, setData2] = useState([]);
    const [searchText, setSearchText] = useState(''); // State to store search text
    const [matchedItems, setMatchedItems] = useState([]); // State to store matched items
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
    const dropdownRef = useRef(null); // Ref for the dropdown container

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    useEffect(() => {
        getPosts().then((posts) => setData2(posts));
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false); // Close the dropdown
            }
        };

        // Add event listener when the dropdown is open
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const handleSearchChange = (e) => {
        const text = e.target.value.toLowerCase(); // Convert search text to lowercase
        setSearchText(text); // Update search text state

        if (text) {
            const matchedItems = data2.filter((item) =>
                item.name.toLowerCase().includes(text) // Check if the item name includes the search text
            );
            setMatchedItems(matchedItems); // Update matched items state
            setIsDropdownOpen(true); // Open the dropdown
        } else {
            setMatchedItems([]); // Clear matched items if search text is empty
            setIsDropdownOpen(false); // Close the dropdown
        }
    };
    // bg-[#F5F5F5]
    return (
        <header className='flex flex-col justify-between items-center mb-5 p-4 bg-blue-500 shadow-md rounded-lg w-full'>
            <div className='flex justify-between items-center w-full'>
                {/* Logo */}
                <Link to="/" className='text-4xl font-bold text-black hover:text-[#34495E] transition-colors duration-300'>
                    <span className="font-serif italic">LowTech</span> <span className="font-sans font-light">GmbH</span>
                </Link>

                {/* Search Bar */}
                <div className="relative" ref={dropdownRef}>
                    <input
                        type="text"
                        placeholder="Search for furniture..."
                        value={searchText}
                        onChange={handleSearchChange}
                        className='border border-[#D5DBDB] p-2 rounded-lg w-64 outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-transparent transition-all duration-300 bg-white text-[#34495E] placeholder-[#95A5A6]'
                    />
                    {/* Dropdown for matched items */}
                    {isDropdownOpen && matchedItems.length > 0 && (
                        <div className="absolute top-full left-0 w-64 bg-white border border-[#D5DBDB] rounded-lg mt-1 shadow-lg z-10">
                            <ul>
                                {matchedItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="p-2 hover:bg-[#F8F9F9] cursor-pointer flex items-center transition-colors duration-200"
                                    >
                                        {/* Wrap the image in a Link */}
                                        <Link to={item.slug} className="flex items-center">
                                            <img
                                                src={item.imageUrl} // Use the imageUrl from the API data
                                                alt={item.name}
                                                className="w-10 h-10 object-cover rounded-md mr-2"
                                            />
                                            {/* Display the name */}
                                            <span className="text-[#2C3E50]">{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Cart Icon */}
                <div
                    className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative cursor-pointer hover:bg-gray-200 transition-colors duration-300'
                    onClick={handleOpenTabCart}
                >
                    <img src={iconCart} alt="Cart" className='w-6' />
                    <span className='absolute top-2/3 right-1/2 bg-[#E74C3C] text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>
                        {totalQuantity}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;