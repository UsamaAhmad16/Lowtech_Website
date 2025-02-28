// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { changeQuantity } from '../stores/cart';
// import { getPosts } from '../api';

// const CartItem = (props) => {
//     const { productId, quantity } = props.data;
//     const [data2, setData2] = useState([]);
//     const [detail, setDetail] = useState(null);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [stock, setStock] = useState(productId); // Use productId as stock value
//     const dispatch = useDispatch();

//     useEffect(() => {
//         getPosts().then((posts) => setData2(posts));
//     }, []); // Fetch products on component mount

//     useEffect(() => {
//         if (data2.length > 0) {
//             const findDetail = data2.find(product => product.productId === productId);
//             if (findDetail) {
//                 setDetail(findDetail);
//                 // Calculate and set the total price
//                 const newTotalPrice = findDetail.price * quantity;
//                 setTotalPrice(newTotalPrice);
//             }
//         }
//     }, [data2, productId, quantity]); // Recalculate total price when detail or quantity changes

//     const handleMinusQuantity = () => {
//         if (quantity > 0) {
//             dispatch(changeQuantity({
//                 productId: productId,
//                 quantity: quantity - 1
//             }));
//         }
//     };

//     const handlePlusQuantity = () => {
//         if (quantity < stock) { // Check if quantity is less than stock
//             dispatch(changeQuantity({
//                 productId: productId,
//                 quantity: quantity + 1
//             }));
//         } else {
//             alert(`Stock is limited! You cannot add more than ${stock} items.`);
//         }
//     };

//     return (
//         <div className='overflow-y-auto flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
//             <img src={detail?.imageUrl} alt="" className='w-12' />
//             <h3 className='flex-1'>{detail?.name}</h3> {/* Allow the name to take up remaining space */}
//             <p className='w-20 text-right'>${totalPrice.toFixed(2)}</p> {/* Fixed width for price */}
            
//             <p className='w-20 text-right'>In Stock: {stock}</p> {/* Display the stock */}
//             <div className='w-20 flex justify-between gap-2'>
//                 <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
//                 <span>{quantity}</span>
//                 <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
//             </div>
//         </div>
//     );
// };

// export default CartItem;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../stores/cart';
import { getPosts } from '../api';

const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [data2, setData2] = useState([]);
    const [detail, setDetail] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [stock, setStock] = useState(productId); // Use productId as stock value
    const dispatch = useDispatch();

    // Fetch product data on component mount
    useEffect(() => {
        getPosts().then((posts) => setData2(posts));
    }, []);

    // Find product details and calculate total price
    useEffect(() => {
        if (data2.length > 0) {
            const findDetail = data2.find(product => product.productId === productId);
            if (findDetail) {
                setDetail(findDetail);
                // Calculate and set the total price
                const newTotalPrice = findDetail.price * quantity;
                setTotalPrice(newTotalPrice);
            }
        }
    }, [data2, productId, quantity]);

    const handleMinusQuantity = () => {
        if (quantity > 0) {
            dispatch(changeQuantity({
                productId: productId,
                quantity: quantity - 1
            }));
        }
    };

    const handlePlusQuantity = () => {
        if (quantity < stock) { // Check if quantity is less than stock
            dispatch(changeQuantity({
                productId: productId,
                quantity: quantity + 1
            }));
        } else {
            alert(`Stock is limited! You cannot add more than ${stock} items.`);
        }
    };

    return (
        <div className='overflow-y-auto flex justify-between items-center bg-slate-600 text-white p-2 border-b-2 border-slate-700 gap-5 rounded-md'>
            <img src={detail?.imageUrl} alt="" className='w-12' />
            <h3 className='flex-1'>{detail?.name}</h3> {/* Allow the name to take up remaining space */}
            <p className='w-20 text-right'>${totalPrice.toFixed(2)}</p> {/* Fixed width for price */}
            
            <p className='w-20 text-right'>In Stock: {stock}</p> {/* Display the stock */}
            <div className='w-20 flex justify-between gap-2'>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handleMinusQuantity}>-</button>
                <span>{quantity}</span>
                <button className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600' onClick={handlePlusQuantity}>+</button>
            </div>
        </div>
    );
};

export default CartItem;