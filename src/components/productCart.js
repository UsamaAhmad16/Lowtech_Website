// import React from 'react' 
// import { Link } from 'react-router-dom';
// import iconCart from '../assets/images/iconCart.png'
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart } from '../stores/cart';

// const ProductCart = (props) => {
//     const carts = useSelector(store => store.cart.items);
//     // const {id, name, price, image, slug} = props.data;
//     const id=props.data.productId;
//     const name=props.data.name;
//     const price=props.data.price;
//     const image=props.data.imageUrl;
//     const slug=props.data.slug;
//     const categ=props.cate;
//     // console.log("category", categ);
//     // console.log("all data",id,name,price);
//     const dispatch = useDispatch();
//     const handleAddToCart = () => {
//         dispatch(addToCart({
//             productId: id,
//             quantity: 1
//         }));
//     }
//     return (
//         <div className='bg-white p-5 rounded-xl shadow-sm flex flex-col'>
//         <Link to={slug}>
//             <img src={image} alt='' className='w-full h-80 object-cover object-top drop-shadow-[0_80px_30px_#0007]' />
//         </Link>
//         <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
//         <div className='flex flex-grow justify-between items-end'>
//             <p>
//                 $<span className='text-2xl font-medium'>{price}</span>
//             </p>
//             <button className='bg-blue-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2' onClick={handleAddToCart}>
//                 <img src={iconCart} alt="" className='w-5'/>
//                 Add To Cart
//             </button>
//         </div>
//     </div>
//   )
// }

// export default ProductCart

import React from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const ProductCart = (props) => {
    const carts = useSelector(store => store.cart.items);
    const { productId, name, price, imageUrl, slug } = props.data;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: productId,
            quantity: 1
        }));
    };

    return (
        <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col'>
            {/* Product Image */}
            <Link to={slug} className="flex justify-center items-center bg-gray-100 rounded-lg p-4">
                <img
                    src={imageUrl}
                    alt={name}
                    className='w-full max-h-80 object-contain object-center transform hover:scale-105 transition-transform duration-300'
                />
            </Link>

            {/* Product Name */}
            <h3 className='text-2xl py-4 text-center font-semibold text-[#2C3E50]'>
                {name}
            </h3>

            {/* Price and Add to Cart Button */}
            <div className='flex flex-grow justify-between items-end mt-4'>
                {/* Price */}
                <p className='text-xl font-medium text-[#3498DB]'>
                    $<span className='text-2xl'>{price}</span>
                </p>

                {/* Add to Cart Button */}
                <button
                    className='bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2'
                    onClick={handleAddToCart}
                >
                    <img src={iconCart} alt="Cart" className='w-5' />
                    Add To Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCart;