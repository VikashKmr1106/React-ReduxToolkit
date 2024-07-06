import React from 'react';
import Layout from '../Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, removeAllCart } from '../../redux/Slice/Cart.slice';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  console.log('Cart items:', cart); // Debugging line to check the cart content

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(removeAllCart());
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center bg-zinc-700 lg:px-24 md:px-12 sm:px-10 p-4">
        <h1 className='w-full text-center shadow-lg bg-zinc-600 rounded-md p-4 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500'>Cart</h1>
        {cart.length > 0 && (
          <button 
            className='mt-4 text-white font-medium bg-red-500 hover:bg-red-400 p-2 rounded-md'
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-5">
          {cart.length > 0 ? cart.map((item) => (
            <div key={item.id} className='rounded-lg p-3 bg-zinc-800 hover:shadow-xl transition-shadow duration-300'>
              <div className="bg-zinc-600 p-4 rounded shadow-md flex flex-col h-full">
                <div className='mb-4 w-full h-[300px] object-cover'>
                  <img className='w-full h-[300px] object-contain' src={item.image} alt={item.title} />
                </div>
                <h2 className="text-xl text-white font-bold mb-2">{item.title}</h2>
                <p className="text-white flex-grow">{item.description?.slice(0, 60)} ...</p>
                <div className="price mb-2">
                  <p className='text-white font-bold text-lg'>$.{item.price}</p>
                </div>
								<div className='flex items-center gap-3'>
								<button className='text-white font-medium bg-green-500 hover:bg-red-400 p-2 rounded-md' >Buy Now</button>
								<button className='text-white font-medium bg-red-500 hover:bg-red-400 p-2 rounded-md' onClick={() => handleRemove(item.id)}>Remove from Cart</button>
								</div>
                
              </div>
            </div>
          )) : 
          <div className='flex items-center justify-center col-span-1 sm:col-span-2 lg:col-span-4 md:col-span-2'>
            <p className='text-white text-center'>Your cart is empty</p>
          </div>
          }
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
