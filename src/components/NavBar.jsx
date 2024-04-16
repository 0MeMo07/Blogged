import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FiMenu } from "react-icons/fi";
import { IoExitOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdLogin } from "react-icons/md";
import NavBarSkeleton from './Skeletons/NavBarSkeleton';
import { useGetAuthTokenQuery, useAuthTokenVerificationMutation } from '../store';
import { useDispatch } from 'react-redux';
import { CiLight, CiDark, CiLogin  } from "react-icons/ci";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearAuthorizationToken, Authorization } from '../store/slices/userData';
import DarkMode from './DarkMode'

function ResponsiveAppBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [redirected, setRedirected] = useState(false);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const { darkMode, toggleDarkMode } = DarkMode();
  const [AuthTokenVerification] = useAuthTokenVerificationMutation({
    fixedCacheKey: 'login'
  });

  if (error){
    const getToken = async() => {
      const username = JSON.parse(sessionStorage.getItem('Authorization'))?.username;
      const password = JSON.parse(sessionStorage.getItem('Authorization'))?.password;
      if (username || password){
        const authTokenResult = await AuthTokenVerification({username: username, password: password});
        const token = authTokenResult.data.token;
        dispatch(Authorization({ token }));
        if(!authTokenResult.isLoading){
        window.location.reload();
        }
        
      }
    }
    getToken();
  }

  

  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleHome = () => {
    setAnchorElNav(null);
    navigate('/')
  }

  const handleBlogs = () => {
    setAnchorElNav(null);
    navigate('/Blogs')
  }

  const handleAddBlogs = () => {
    setAnchorElNav(null);
    navigate('/AddBlogs')
  }

  const handleMyBlogs = () => {
    setAnchorElNav(null);
    navigate('/MyBlogs')
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(clearAuthorizationToken())
    navigate('/')
    window.location.reload();
  }

  const handleProfile = () => {
    setAnchorElUser(null);
    navigate('/Profile')
  }
  return (
    <>
    {isLoading ?
    <NavBarSkeleton/>
    :
    <AppBar position="fixed" style={{ backgroundColor:"rgba(0, 0, 0, 0.7)", backdropFilter:"bulur(10px)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          Blogged
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
               <FiMenu /> 
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleHome}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>


              <MenuItem onClick={handleBlogs}>
                <Typography textAlign="center">Blogs</Typography>
              </MenuItem>

              {error ? null :
              <MenuItem onClick={handleAddBlogs}>
                <Typography textAlign="center">Add Blogs</Typography>
              </MenuItem>
              }
              {error ? null :
              <MenuItem onClick={handleMyBlogs}>
                <Typography textAlign="center">My Blogs</Typography>
              </MenuItem>
              }
        
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blogged
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                onClick={handleHome}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>

              
              <Button
                onClick={handleBlogs}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Blogs
              </Button>
              
              {error ? null :
              <Button
                onClick={handleAddBlogs}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Add Blogs
              </Button>
              }

              {error ? null :
              <Button
              onClick={handleMyBlogs}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
              My Blogs
              </Button>
              }
              
          </Box>
          
          {isLoading ? null :
          error ? <Button 
          startIcon={<MdLogin/>}
          variant='text' 
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          onClick={()=> {
            navigate('/login');
          }}>login</Button> :
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {AuthData ? (
                <Avatar alt="Remy Sharp" src={AuthData.image} />
              ) : (
                <Avatar alt="Remy Sharp" src="" />
              )}
              </IconButton>
            </Tooltip>
            <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleProfile}>
              <RiAccountCircleLine style={{padding:"5px" }}/>
              <Typography variant="body1" textAlign="center">
                Profile
              </Typography>
            </MenuItem>

            <MenuItem onClick={toggleDarkMode}>
              {darkMode ? <CiLight color='dark' style={{padding:"5px" }}/> : <CiDark color='dark' style={{padding:"5px" }}/>}
              <Typography variant="body1" textAlign="center">
              {darkMode ? "Light" : "Dark"}
              </Typography>
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <IoExitOutline style={{padding:"5px" }}/>
              <Typography variant="body1" textAlign="center">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
          </Box>
        }
        </Toolbar>
      </Container>
    </AppBar>
    }
    </>
  );
}

export default ResponsiveAppBar;