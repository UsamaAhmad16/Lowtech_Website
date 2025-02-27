// import React, { useEffect, useState } from 'react' 
// import { useParams } from 'react-router-dom' 
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../stores/cart';
// import { getPosts } from '../api';

// const Detail = () => {
//     const { slug } = useParams();
//     const [detail, setDetail] = useState(null); // Initialize as null
//     const [quantity, setQuantity] = useState(1);
//     const dispatch = useDispatch();
//     const [data2, setData2] = useState([]);

//     useEffect(() => {
//         getPosts().then((posts) => setData2(posts));
//     }, [slug]); 

//     useEffect(() => {
//         const matchedItem = data2.find((item) => item.slug === slug);
//         if (matchedItem) {
//             // console.log("Match found:", matchedItem.name);
//             setDetail(matchedItem);
//         } else {
//             // console.log("No match found");
//             setDetail(null); // Ensure we handle cases with no match
//         }
//     }, [data2, slug]);

//     // Prevent error by checking if `detail` exists before accessing properties
//     if (!detail) {
//         return <h2 className='text-3xl text-center'>Product Not Found</h2>;
//     }

//     const handleMinusQuantity = () => {
//         setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
//     };

//     const handlePlusQuantity = () => {
//         setQuantity(quantity + 1);
//     };

//     const handleAddToCart = () => {
//         dispatch(addToCart({
//             productId: detail.productId,
//             quantity: quantity,
//         }));
//     };

//     return (
//         <div>
//             <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
//             <div className='grid grid-cols-2 gap-5 mt-5'>
//                 <div>
//                     <img src={detail.imageUrl} alt={detail.name} className='w-full'/>
//                 </div>
//                 <div className='flex flex-col gap-5'>
//                     <h1 className='text-4xl uppercase font-bold'>{detail.name}</h1>
//                     <p className='font-bold text-3xl'>${detail.price}</p>
//                     <div className='flex gap-5'>
//                         <div className='flex gap-2 justify-center items-center'>
//                             <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
//                             <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
//                             <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>
//                         </div>
//                         <button className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl' onClick={handleAddToCart}>
//                             Add To Cart
//                         </button>
//                     </div>
//                     <p>{detail.description}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Detail;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import { getPosts } from '../api';
import { FaShoppingCart } from 'react-icons/fa'; // Import shopping cart icon

const Detail = () => {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null); // Initialize as null
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const [data2, setData2] = useState([]);
    const [zoomStyle, setZoomStyle] = useState({ display: 'none' }); // State for zoom effect

    useEffect(() => {
        getPosts().then((posts) => setData2(posts));
    }, [slug]);

    useEffect(() => {
        const matchedItem = data2.find((item) => item.slug === slug);
        if (matchedItem) {
            setDetail(matchedItem);
        } else {
            setDetail(null); // Ensure we handle cases with no match
        }
    }, [data2, slug]);

    // Prevent error by checking if `detail` exists before accessing properties
    if (!detail) {
        return <h2 className='text-3xl text-center'>Product Not Found</h2>;
    }

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: detail.productId,
            quantity: quantity,
        }));
    };

    // Handle mouse move for zoom effect
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setZoomStyle({
            display: 'block',
            backgroundImage: `url(${detail.imageUrl})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: '300%', // Increased zoom level
            position: 'fixed', // Fixed position for the magnifier
            top: '50%', // Center vertically
            right: '20px', // Position to the right of the image
            transform: 'translateY(-50%)', // Center the magnifier box
            width: '300px', // Increased size of the magnifier box
            height: '300px',
            border: '2px solid #ccc',
            borderRadius: '8px',
            pointerEvents: 'none', // Ensure the zoom box doesn't interfere with clicks
            zIndex: 10,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
        });
    };

    // Hide zoom box when mouse leaves the image
    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none' });
    };

    return (
        <div>
            <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                {/* Product Image with Zoom Effect */}
                <div className='relative'>
                    <img
                        src={detail.imageUrl}
                        alt={detail.name}
                        className='w-full cursor-zoom-in'
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    />
                    {/* Zoom Box */}
                    <div style={zoomStyle}></div>
                </div>

                {/* Product Details */}
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl uppercase font-bold'>{detail.name}</h1>
                    <p className='font-bold text-3xl'>${detail.price}</p>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 justify-center items-center'>
                            <button
                                className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center hover:bg-gray-200 transition-all duration-300'
                                onClick={handleMinusQuantity}
                            >
                                -
                            </button>
                            <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>
                                {quantity}
                            </span>
                            <button
                                className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center hover:bg-gray-200 transition-all duration-300'
                                onClick={handlePlusQuantity}
                            >
                                +
                            </button>
                        </div>
                        <button
                            className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl flex items-center gap-2 hover:bg-slate-800 transition-all duration-300'
                            onClick={handleAddToCart}
                        >
                            <FaShoppingCart className="w-6 h-6" /> {/* Shopping cart icon */}
                            Add To Cart
                        </button>
                    </div>
                    <p>{detail.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
