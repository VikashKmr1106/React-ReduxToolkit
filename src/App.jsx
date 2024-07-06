import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Crud from './component/Crud.jsx';
import Background from './component/Background.jsx';
import Foreground from './component/Foreground.jsx';
import Home from './component/Home/Home.jsx';
import Images from './component/Images/Images.jsx';
import Layout from './component/Layout/Layout.jsx';
import NotFound from './component/NotFound/NotFound.jsx';
import Login from './component/Login/Login.jsx';
import Profile from './component/Profile/Profile.jsx';
import Post from './component/Post/Post.jsx';
import Products from './component/Products/Products.jsx';
import Cart from './component/Cart/Cart.jsx';
import Protected from './Protected/Protected.jsx';

const App = () => {
  return (
    <>
      {/* <Crud/> */}
      {/* <div className='relative w-full h-screen bg-zinc-800'>
        <Background/>
        <Foreground/>
      </div> */}
      {/* for security the profile when login only ... */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/images' element={<Images/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/product' element={<Products/>} />
          <Route element={<Protected/>}>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/post' element={<Post/>} />
            <Route path='/cart' element={<Cart/>} />
          </Route>
					
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
