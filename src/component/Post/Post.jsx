// components/Post.jsx
import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/Slice/Post.slice';

const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector(state => state.post);
	console.log('hello world', post)

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center  bg-zinc-700 lg:px-24 md:px-12 sm:px-10 p-4  ">
        <h1 className='w-full text-center shadow-lg bg-zinc-600 rounded-md p-4 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500'>Posts</h1>


				{post.loading  && <div className="flex flex-col items-center justify-center min-h-screen text-lg  ">
					<h1 className='bg-white shadow-lg rounded-lg p-3 font-semibold'>Loading...</h1></div>}
        {post.error && <div className="flex flex-col items-center justify-center min-h-screen text-lg">
					<h1 className='text-red-500 shadow-lg rounded-lg p-3 font-semibold'>Error: {post.error}</h1></div>}        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 mt-5">
          {post.data && post.data.map((post) => (
						<div key={post.id} className='rounded-lg p-3 bg-zinc-800 hover:shadow-xl h-full'>
            <div  className="bg-zinc-600 p-4 rounded shadow-md h-full">
							<h1 className='text-5xl text-white font-semibold mb-2'>{post.id}.</h1>
              <h2 className="text-xl text-white font-bold mb-2">{post.title}</h2>
              <p className="text-white">{post.body}</p>
            </div>
						</div>
            
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Post;




// import React, { useEffect, useCallback } from 'react';
// import Layout from '../Layout/Layout';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPost, incrementPage } from '../../redux/Slice/Post.slice';

// const Post = () => {
//   const dispatch = useDispatch();
//   const post = useSelector(state => state.post);

//   const handleScroll = useCallback(() => {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || post.loading || !post.hasMore) return;
//     dispatch(incrementPage());
//   }, [dispatch, post.loading, post.hasMore]);

//   useEffect(() => {
//     dispatch(getPost(post.page));
//   }, [dispatch, post.page]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return (
//     <Layout>
//       <div className="min-h-screen flex flex-col items-center bg-zinc-700 lg:px-24 md:px-12 sm:px-10 p-4">
//         <h1 className="w-full text-center shadow-lg bg-zinc-600 rounded-md p-4 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500">
//           Posts
//         </h1>

//         {post.error && (
//           <div className="flex flex-col items-center justify-center min-h-screen text-lg">
//             <h1 className="text-red-500 shadow-lg rounded-lg p-3 font-semibold">Error: {post.error}</h1>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 mt-5">
//           {post.data.map((post) => (
//             <div key={post.id} className="rounded-lg p-3 bg-zinc-800 hover:shadow-xl h-full">
//               <div className="bg-zinc-600 p-4 rounded shadow-md h-full">
//                 <h1 className="text-5xl text-white font-semibold mb-2">{post.id}</h1>
//                 <h2 className="text-xl text-white font-bold mb-2">{post.title}</h2>
//                 <p className="text-white">{post.body}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {post.loading && (
//           <div className="flex flex-col items-center justify-center min-h-screen text-lg">
//             <h1 className="bg-white shadow-lg rounded-lg p-3 font-semibold">Loading...</h1>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Post;