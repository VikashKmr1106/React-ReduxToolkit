  // username: 'emilys',
  // password: 'emilyspass',


import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/Slice/auth.slice';
import { setRemember, eraseRemember } from '../../redux/Slice/Remember.slice';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const auth = useSelector(state => state.auth);
  const remember = useSelector(state => state.remember);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: remember.checked ? remember.email : '',
    password: remember.checked ? remember.password : '',
    remember: remember.checked,
  });

  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(null);
  const [isRememberDisabled, setIsRememberDisabled] = useState(true);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    if (formData.username && formData.password) {
      setIsRememberDisabled(false);
    } else {
      setIsRememberDisabled(true);
    }
  }, [formData.username, formData.password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { username, password, remember } = formData;

    if (!username || !password) {
      alert('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setError(null);
      setLoading(false);
      dispatch(login(response.data));
      
      if (remember) {
        dispatch(setRemember({ email: username, password }));
      } else {
        dispatch(eraseRemember());
      }
      
      navigate('/profile');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
      setLoading(false);
      dispatch(logout());
      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        console.log('Error Response Status:', error.response.status);
        console.log('Error Response Headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error Request:', error.request);
      } else {
        console.log('Error Message:', error.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  if (auth.user) {
    return <Navigate to='/profile' />;
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col gap-y-3 justify-center items-center bg-zinc-600">
        {error && 
          <div className='bg-orange-600 shadow-md w-full sm:w-1/2 lg:w-1/3 text-center p-2 font-semibold text-white rounded-md'>
            <h1>{error}</h1>
          </div>
        }
        <div className='w-full sm:w-1/2 lg:w-1/3 bg-zinc-700 p-4 rounded-md shadow-xl'>
          <div className="bg-white p-8 rounded">
            <h1 className="text-2xl text-center font-bold mb-4 underline underline-offset-8">Login</h1>
            <p> emilys  ----- emilyspass</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                  onChange={handleInput}
                  value={formData.username}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                  required
                  onChange={handleInput}
                  value={formData.password}
                />
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInput}
                    disabled={isRememberDisabled}
                  />
                  <label className={`font-semibold ${isRememberDisabled ? 'text-gray-400' : 'text-gray-700'}`} htmlFor="remember">Remember Me!</label>
                </div>
                <div>
                  {loading ? 
                    <button type="submit" disabled className="w-full bg-gray-500 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">Loading...</button> 
                    : 
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
