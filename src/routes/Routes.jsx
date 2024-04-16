import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login';
import Profile from '../components/Profile';
import AddBlogs from '../components/AddBlogs/AddBlogs';
import Footer from '../components/footer';
import MyBlogs from '../components/MyBlogs/MyBlogs';
import Blogs from '../components/Blogs/Blogs'
import ClickedBlogPrewiew from '../components/BlogPrewiew/ClickedBlogPrewiew';

const AppRoutes = () => {
  const location = useLocation();
  const showFooterRoutes = ['/', '/Profile', '/AddBlogs', '/MyBlogs', '/Blogs', `/Blogs/:BlogId`];
  const showFooter = showFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/AddBlogs' element={<AddBlogs />} />
        <Route path='/MyBlogs' element={<MyBlogs />} />
        <Route path='/Blogs' element={< Blogs/>} />
        <Route path='/Blogs/:BlogId' element={<ClickedBlogPrewiew />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default AppRoutes;
