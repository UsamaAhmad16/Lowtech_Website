// import React, { useState,useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import CartItem from './cartItem';
// import { toggleStatusTab } from '../stores/cart';
// import { getPosts } from '../api';

// const CartTab = () => {
//     const carts = useSelector(store => store.cart.items);
//     const statusTab = useSelector(store => store.cart.statusTab);
//     const dispatch = useDispatch();
//     const [isCheckout, setIsCheckout] = useState(false); // State to manage checkout form visibility
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         address: '',
//         phone: '',
//         email: '',
//         cardNumber: '',
//         expirationDate: '',
//         cvv: '',
//     });
//     const [data2,setData2]=useState([]);
//       useEffect(()=>{
       
//         getPosts().then((posts)=> setData2(posts));
        
//       },[]);
//     // Calculate the total price of all items in the cart
//     const calculateTotalPrice = () => {
//         return carts.reduce((total, item) => {
//             const product = data2.find(product => product.productId === item.productId);
//             if (product) {
//                 return total + product.price * item.quantity;
//             }
//             return total;
//         }, 0);
//     };

//     const totalPrice = calculateTotalPrice(); // Total price of all items in the cart

//     const handleCloseTabCart = () => {
//         dispatch(toggleStatusTab());
//     };

//     const handleCheckoutClick = () => {
//         setIsCheckout(true); // Show the checkout form
//     };

//     const handleBackToCart = () => {
//         setIsCheckout(false); // Hide the checkout form and show the cart
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Validate form inputs
//         if (
//             !formData.firstName ||
//             !formData.lastName ||
//             !formData.address ||
//             !formData.phone ||
//             !formData.email ||
//             !formData.cardNumber ||
//             !formData.expirationDate ||
//             !formData.cvv
//         ) {
//             alert('Please fill out all fields.');
//             return;
//         }
//         // Process checkout (e.g., send data to an API)
//         console.log('Checkout Data:', formData);
//         alert('Order placed successfully!');
//         setIsCheckout(false); // Close the checkout form
//         dispatch(toggleStatusTab()); // Close the cart tab
//     };

//     return (
//         <div
//             className={`h-100 overflow-y-auto border overflow-x-hidden border fixed top-0 right-0 bg-gray-700 shadow-2xl w-[40rem] h-full grid grid-rows-[60px_1fr_60px] 
//             transform transition-transform duration-500
//             ${statusTab === false ? 'translate-x-full' : ''}
//             `}
//         >
//             <h2 className='p-5 text-white text-2xl'>Shopping Cart</h2>
//             <div className='p-5'>
//                 {!isCheckout ? (
//                     // Display cart items
//                     <>
//                         {carts.map((item, key) => (
//                             <CartItem key={key} data={item} />
//                         ))}
//                         {/* Display total price */}
//                         <div className='text-white text-right mt-4'>
//                             <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
//                         </div>
//                     </>
//                 ) : (
//                     // Display checkout form
//                     <form onSubmit={handleSubmit} className='space-y-4'>
//                         <div>
//                             <label className='text-white'>First Name</label>
//                             <input
//                                 type='text'
//                                 name='firstName'
//                                 value={formData.firstName}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='text-white'>Last Name</label>
//                             <input
//                                 type='text'
//                                 name='lastName'
//                                 value={formData.lastName}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='text-white'>Address</label>
//                             <input
//                                 type='text'
//                                 name='address'
//                                 value={formData.address}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='text-white'>Phone Number</label>
//                             <input
//                                 type='tel'
//                                 name='phone'
//                                 value={formData.phone}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='text-white'>Email Address</label>
//                             <input
//                                 type='email'
//                                 name='email'
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className='text-white'>Card Number</label>
//                             <input
//                                 type='text'
//                                 name='cardNumber'
//                                 value={formData.cardNumber}
//                                 onChange={handleInputChange}
//                                 className='w-full p-2 rounded-md'
//                                 placeholder='1234 5678 9012 3456'
//                                 required
//                             />
//                         </div>
//                         <div className='grid grid-cols-2 gap-2'>
//                             <div>
//                                 <label className='text-white'>Expiration Date</label>
//                                 <input
//                                     type='text'
//                                     name='expirationDate'
//                                     value={formData.expirationDate}
//                                     onChange={handleInputChange}
//                                     className='w-full p-2 rounded-md'
//                                     placeholder='MM/YY'
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className='text-white'>CVV</label>
//                                 <input
//                                     type='text'
//                                     name='cvv'
//                                     value={formData.cvv}
//                                     onChange={handleInputChange}
//                                     className='w-full p-2 rounded-md'
//                                     placeholder='123'
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-2 gap-2'>
//                             <button
//                                 type='button'
//                                 className='bg-gray-500 text-white p-2 rounded-md'
//                                 onClick={handleBackToCart}
//                             >
//                                 Back to Cart
//                             </button>
//                             <button
//                                 type='submit'
//                                 className='bg-amber-600 text-white p-2 rounded-md'
//                             >
//                                 Place Order
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </div>
//             <div className='grid grid-cols-2'>
//                 <button className='bg-black text-white' onClick={handleCloseTabCart}>
//                     CLOSE
//                 </button>
//                 {!isCheckout && (
//                     <button className='bg-amber-600 text-white' onClick={handleCheckoutClick}>
//                         CHECKOUT
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CartTab;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem';
import { toggleStatusTab } from '../stores/cart';
import { getPosts } from '../api';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const [isCheckout, setIsCheckout] = useState(false); // State to manage checkout form visibility
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [data2, setData2] = useState([]);

    useEffect(() => {
        getPosts().then((posts) => setData2(posts));
    }, []);

    // Calculate the total price of all items in the cart
    const calculateTotalPrice = () => {
        return carts.reduce((total, item) => {
            const product = data2.find(product => product.productId === item.productId);
            if (product) {
                return total + product.price * item.quantity;
            }
            return total;
        }, 0);
    };

    const totalPrice = calculateTotalPrice(); // Total price of all items in the cart

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const handleCheckoutClick = () => {
        setIsCheckout(true); // Show the checkout form
    };

    const handleBackToCart = () => {
        setIsCheckout(false); // Hide the checkout form and show the cart
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form inputs
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.address ||
            !formData.phone ||
            !formData.email ||
            !formData.cardNumber ||
            !formData.expirationDate ||
            !formData.cvv
        ) {
            alert('Please fill out all fields.');
            return;
        }
        // Process checkout (e.g., send data to an API)
        console.log('Checkout Data:', formData);
        alert('Order placed successfully!');
        setIsCheckout(false); // Close the checkout form
        dispatch(toggleStatusTab()); // Close the cart tab
    };

    return (
        <div
            className={`h-100 overflow-y-auto fixed top-0 right-0 bg-[#2C3E50] shadow-2xl w-[40rem] h-full grid grid-rows-[80px_1fr] transform transition-transform duration-500 ${
                statusTab === false ? 'translate-x-full' : ''
            }`}
        >
            {/* Header */}
            <div className='p-6 bg-[#34495E] flex justify-between items-center'>
                <h2 className='text-white text-2xl font-bold'>Shopping Cart</h2>
                <div className="flex gap-4">
                    {!isCheckout && (
                        <button
                            className='bg-[#3498DB] text-white px-6 py-3 rounded-lg hover:bg-[#2980B9] transition-all duration-300'
                            onClick={handleCheckoutClick}
                        >
                            Checkout
                        </button>
                    )}
                    <button
                        onClick={handleCloseTabCart}
                        className='bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300'
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Cart Items or Checkout Form */}
            <div className='p-6 overflow-y-auto'>
                {!isCheckout ? (
                    // Display cart items
                    <>
                        {carts.map((item, key) => (
                            <CartItem key={key} data={item} />
                        ))}
                        {/* Display total price */}
                        <div className='text-white text-right mt-6'>
                            <strong className='text-xl'>Total Price: ${totalPrice.toFixed(2)}</strong>
                        </div>
                    </>
                ) : (
                    // Display checkout form
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='text-white block mb-2'>First Name</label>
                            <input
                                type='text'
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-white block mb-2'>Last Name</label>
                            <input
                                type='text'
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-white block mb-2'>Address</label>
                            <input
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-white block mb-2'>Phone Number</label>
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-white block mb-2'>Email Address</label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                required
                            />
                        </div>
                        <div>
                            <label className='text-white block mb-2'>Card Number</label>
                            <input
                                type='text'
                                name='cardNumber'
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                placeholder='1234 5678 9012 3456'
                                required
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='text-white block mb-2'>Expiration Date</label>
                                <input
                                    type='text'
                                    name='expirationDate'
                                    value={formData.expirationDate}
                                    onChange={handleInputChange}
                                    className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                    placeholder='MM/YY'
                                    required
                                />
                            </div>
                            <div>
                                <label className='text-white block mb-2'>CVV</label>
                                <input
                                    type='text'
                                    name='cvv'
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    className='w-full p-3 rounded-lg bg-[#34495E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498DB]'
                                    placeholder='123'
                                    required
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <button
                                type='button'
                                className='bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-all duration-300'
                                onClick={handleBackToCart}
                            >
                                Back to Cart
                            </button>
                            <button
                                type='submit'
                                className='bg-[#3498DB] text-white p-3 rounded-lg hover:bg-[#2980B9] transition-all duration-300'
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CartTab;