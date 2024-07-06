import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, removeImage , resetImages} from '../../redux/Slice/Images.slice.js';
import { IoClose } from "react-icons/io5";
import Layout from '../Layout/Layout.jsx';


const Home = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const dispatch = useDispatch();
  const urls = useSelector(state => state.images.urls);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUrl) {
      dispatch(addImage(currentUrl));
      setCurrentUrl('');
    }
  };

  const handleInputChange = (event) => {
    setCurrentUrl(event.target.value);
  };

  const handleRemoveImage = (urlToRemove) => {
    dispatch(removeImage(urlToRemove));
  };

  const handleReset = () => {
    dispatch(resetImages());
  };

  return (
    <Layout>
 <div className='bg-zinc-700 w-full min-h-screen lg:p-24 md:p-12 sm:p-10 p-3  flex justify-center'>
      <div className='shadow-lg p-4 drop-shadow-lg bg-zinc-600 rounded-lg w-full '>
        <h1 className='text-center shadow-lg bg-zinc-700 rounded-md p-4 lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500'>Paste Image URL</h1>
        <div className='mt-4'>
          <form  onSubmit={handleSubmit}>
            <input 
              type="url" 
              className='form-input rounded-md w-full' 
              name="url" 
              placeholder='Paste the url' 
              value={currentUrl}
              onChange={handleInputChange}
              required 
            />
            <button className='bg-indigo-500 hover:bg-indigo-400 p-2 rounded-md mt-4 text-white mr-4 uppercase'>Submit</button>
            <Link to='/images' className='font-semibold text-violet-500 p-2 rounded-md bg-white'>View</Link>
            <button type='button' onClick={handleReset} className='bg-indigo-500  hover:bg-indigo-400  p-2 rounded-md mt-4 text-white ml-4 uppercase'>Reset</button>
          </form>
        </div>
        {urls.length > 0 ? (
          <div className="mt-4">
            <p className="text-white">Image Previews:</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-3">
              {urls.map((url, index) => (
                <div  key={index} className='rounded-lg  p-3 bg-zinc-700 hover:shadow-xl'>
                  <div className="relative w-full h-52 shadow-lg ">
                  <img src={url} className='rounded-md w-full object-cover h-full' alt="Preview"  onError={() => alert('Invalid URL')} />
                  <button 
                    onClick={() => handleRemoveImage(url)} 
                    className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-white bg-zinc-700 bg-opacity-50 rounded-full p-1"
                  >
                   <IoClose />
                  </button>
                </div> 
                </div>
                
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-white mt-4">No images uploaded. Please upload an image.</p>
        )}
      </div>
    </div>
    </Layout>
   
  );
}

export default Home;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const Home = () => {
//   const [src, setSrc] = useState(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const url = event.target[0].value;
//     console.log('URL Submitted:', url); // Debugging line
//     alert(url);
//     setSrc(url);
//   };

//   const handleRemoveImage = () => {
//     setSrc(null);
//   };

//   return (
//     <div className='bg-zinc-700 w-full min-h-screen px-24 flex items-center justify-center'>
//       <div className='shadow-lg p-4 drop-shadow-lg bg-zinc-600 rounded-lg md:w-8/12'>
//         <h1 className='text-center text-5xl font-bold text-violet-500'>Paste Image URL</h1>
//         <div className='mt-4'>
//           <form onSubmit={handleSubmit}>
//             <input type="url" className='form-input rounded-md w-full' name="url" placeholder='Paste the url' required />
//             <button className='bg-indigo-500 p-2 rounded-md mt-4 text-white mr-4 uppercase'>Submit</button>
//             <Link to='/images' className='font-semibold text-violet-500 p-2 rounded-md bg-white'>View</Link>
//           </form>
//         </div>
//         {src && (
//           <div className="mt-4 relative">
						
//             <p className="text-white">Image Preview:</p>
// 						<div>
// 						<img src={src} alt="Preview" width={240} onError={() => alert('Invalid URL')} />
//             <button 
//               onClick={handleRemoveImage} 
//               className="absolute top-0 right-0 mt-2 mr-2 text-white bg-red-500 rounded-full p-1"
//             >
//               X
//             </button>
// 						</div>
           
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Home;
