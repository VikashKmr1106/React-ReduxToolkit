import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeImage } from '../../redux/Slice/Images.slice';
import { IoClose } from "react-icons/io5";
import Layout from '../Layout/Layout';
const Images = () => {
	const urls = useSelector((state) => state.images.urls);
	const dispatch = useDispatch();

	const handleRemoveImage = (urlToRemove) => {
		dispatch(removeImage(urlToRemove));
	};

	return (
		<Layout>
	<div className='bg-zinc-700 w-full min-h-screen lg:p-24 md:p-12 sm:p-10 p-3  flex justify-center'>
			<div className='shadow-lg p-4 drop-shadow-lg bg-zinc-600 rounded-lg w-full'>
				<h1 className='text-center shadow-lg bg-zinc-700 p-4 rounded-md lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-violet-500'>
					Uploaded Images
				</h1>
				{urls.length > 0 ? (
					<div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-3'>
						{urls.map((url, index) => (
							<div  key={index} className='rounded-lg p-3 bg-zinc-700 hover:shadow-xl'>
								<div className='relative w-full h-52 shadow-lg  '>
									<img
										src={url}
										alt='Uploaded'
										className='rounded-md w-full object-cover h-full'
										onError={() => alert('Invalid URL')}
									/>
									<button
										onClick={() => handleRemoveImage(url)}
										className='absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-white bg-zinc-700 bg-opacity-50 rounded-full p-1'>
										<IoClose />
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className='text-center text-white mt-4'>No images uploaded.</p>
				)}
			</div>
		</div>
		</Layout>
	
	);
};

export default Images;
