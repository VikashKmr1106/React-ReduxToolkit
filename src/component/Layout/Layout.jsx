import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Slice/auth.slice';
import { CiLogout } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { selectCartItemsCount } from '../../redux/Slice/Cart.slice';
const Layout = ({ children }) => {
	const auth = useSelector((state) => state.auth.user);
	const cartItemCount = useSelector(selectCartItemsCount);
	const dispatch = useDispatch();
	console.log('user login', auth);

	const [sidebar, setSidebar] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const navigate = useNavigate();

	const toggleSidebar = () => {
		setSidebar(!sidebar);
	};

	const menus = [
		{ label: 'Home', to: '/' },
		{ label: 'Images', to: '/images' },
		{ label: 'Post', to: '/post' },
		{ label: 'Products', to: '/product' },
		{ label: 'Cart', to: '/cart', badge: cartItemCount > 0 ? cartItemCount : null },
	];

	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest('.profile-dropdown')) {
			setDropdownOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const logoutBtn = (event) => {
		dispatch(logout());
		setDropdownOpen(false);
		navigate('/');
	};

	return (
		<>
			<div className='sticky top-0 left-0 w-full z-10 flex justify-between items-center bg-slate-600 text-white 
			lg:px-24 md:px-12 sm:px-10 p-4  '>
				<div className='text-2xl font-semibold'>Redux</div>
				<div
					className='text-2xl md:hidden cursor-pointer'
					onClick={toggleSidebar}>
					☰
				</div>
				<div className='hidden md:flex space-x-4 items-center'>
					{menus.map((menu, index) => (
						<NavLink
							key={index}
							to={menu.to}
							className={({ isActive }) =>
								isActive ? 'text-sky-400' : 'hover:text-gray-400'
							}>
							{menu.label}
							{menu.badge && (
								<span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{menu.badge}</span>
							)}
						</NavLink>
					))}
					{!auth ? (
						<NavLink
							to='/login'
							className={({ isActive }) =>
								isActive ? 'text-sky-400' : 'hover:text-gray-400'
							}>
							Log In
						</NavLink>
					  
					) : (
						<>
							{auth.image && (
								<div className='relative profile-dropdown flex items-center justify-center'>
									<button
										onClick={handleDropdownToggle}
										className='w-8 h-8 bg-slate-900 rounded-full'>
										<img
											src={auth.image}
											alt='Profile'
											className='w-full h-full rounded-full'
										/>
									</button>
									{dropdownOpen && (
										<div className='absolute bg-zinc-600 top-14 rounded-md shadow-md p-3 right-0 w-78 z-20'>
											<Link to='/profile'
												className='text-white w-full text-left'
												onClick={() => setDropdownOpen(false)}>
												My profile
											</Link>
											<hr className='mt-1' />
											<p className='text-white py-2'>{auth.email}</p>
											<hr className='mt-1' />
											<button
												onClick={logoutBtn}
												className='text-white pt-2 font-medium w-full text-left flex items-center gap-2'>
												<CiLogout size={24} /> Log Out
											</button>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</div>
			<div
				className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 z-10 transform ${
					sidebar ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 md:hidden`}>
				<div className='flex justify-end'>
					<div className='text-2xl cursor-pointer' onClick={toggleSidebar}>
						×
					</div>
				</div>
				<nav className='mt-8'>
					{menus.map((menu, index) => (
						<NavLink
							key={index}
							to={menu.to}
							className={({ isActive }) =>
								isActive
									? 'block py-2 text-sky-400'
									: 'block py-2 hover:text-gray-400'
							}
							onClick={toggleSidebar}>
							{menu.label}
							{menu.badge && (
								<span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{menu.badge}</span>
							)}
						</NavLink>
					))}
					{!auth ? (
						<NavLink
							to='/login'
							className={({ isActive }) =>
								isActive
									? 'block py-2 text-sky-400'
									: 'block py-2 hover:text-gray-400'
							}
							onClick={toggleSidebar}>
							Log In
						</NavLink>
					) : (
						<>
							{auth.image && (
								<div className='relative profile-dropdown'>
									<button
										onClick={handleDropdownToggle}
										className='w-8 h-8 bg-slate-900 rounded-full'>
										<img
											src={auth.image}
											alt='Profile'
											className='w-full h-full rounded-full'
										/>
									</button>
									{dropdownOpen && (
										<div className='absolute bg-zinc-600 top-10 rounded-md shadow-md p-3 left-0 w-70 z-20'>
											<Link to='/profile'
												className='text-white w-full text-left'
												onClick={() => setDropdownOpen(false)}>
												My profile
											</Link>
											<hr className='mt-1' />
											<p className='text-white py-2'>{auth.email}</p>
											<hr className='mt-1' />
											<button
												onClick={logoutBtn}
												className='text-white pt-2 font-medium w-full text-left flex items-center gap-2'>
												<CiLogout size={24} /> Log Out
											</button>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</nav>
			</div>
			<div>{children}</div>
			<footer className='bg-slate-600 lg:p-24 md:p-12 sm:p-10 p-4'>
				<h1 className='text-white text-3xl lg:text-6xl md:text-4xl sm:text-3xl font-bold'>
					Footer Section
				</h1>
			</footer>
		</>
	);
};

export default Layout;
