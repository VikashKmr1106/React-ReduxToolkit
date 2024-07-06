import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/Slice/Products.slice';
import { addToCart } from '../../redux/Slice/Cart.slice';

const Products = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center bg-zinc-700 lg:px-24 md:px-12 sm:px-10 p-4">
        <h1 className='w-full text-center shadow-lg bg-zinc-600 rounded-md p-4 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500'>Products</h1>

        {product.loading && (
          <div className="flex flex-col items-center justify-center min-h-screen text-lg">
            <h1 className='bg-white shadow-lg rounded-lg p-3 font-semibold'>Loading...</h1>
          </div>
        )}
        {product.error && (
          <div className="flex flex-col items-center justify-center min-h-screen text-lg">
            <h1 className='text-red-500 shadow-lg rounded-lg p-3 font-semibold'>Error: {product.error}</h1>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-5">
          {product.data && product.data.map((product) => (
            <div key={product.id} className='rounded-lg p-3 bg-zinc-800 hover:shadow-xl transition-shadow duration-300'>
              <div className="bg-zinc-600 p-4 rounded shadow-md flex flex-col h-full">
                <div className='mb-4 w-full h-[300px] object-cover'>
                  <img className='w-full h-[300px] object-contain' src={product.image} alt={product.title} />
                </div>
                <h2 className="text-xl text-white font-bold mb-2">{product.title}</h2>
                <p className="text-white flex-grow">{product.description.slice(0, 60)} ...</p>
                <div className="price mb-2">
                  <p className='text-white font-bold text-lg'>$.{product.price}</p>
                </div>
                <div className='flex items-center gap-3 mt-4'>
                  <button className='text-white font-medium bg-orange-500 hover:bg-orange-400 p-2 rounded-md flex-grow'>Buy Now</button>
                  <button
                    className='text-white font-medium bg-green-500 hover:bg-green-400 p-2 rounded-md flex-grow'
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
