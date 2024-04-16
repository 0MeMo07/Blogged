import React from 'react';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import {useGetAuthTokenQuery} from '../../store'
import { MdAdd, MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function MyBlogEmpty() {
    const navigate = useNavigate()
    const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
    return (
      <Box
        sx={{
          position: 'relative',
          borderRadius:"20px",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          width: '100%',
          // backgroundImage: "url('https://source.unsplash.com/random?blog')",
          backgroundSize: 'cover',
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
            sx={{
              backdropFilter:"blur(1px)",
              padding: 4,
              textAlign: 'center',
              borderRadius: 8,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Blogs are empty
            </Typography>
            <Typography variant="body1" gutterBottom>
              {/* There doesn't seem to be any blog to display. Start sharing your thoughts and experiences by adding a new blog. Be the first to add a blog */}
              There doesn't seem to be any blogs, how about adding one?
            </Typography>
            {error
            ?
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdLogin />}
              onClick={() =>{navigate('/Login')}}
              sx={{ borderRadius: 20, marginTop: 2 }}
            >
              Login
            </Button>
            :
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdAdd />}
              onClick={() =>{navigate('/AddBlogs')}}
              sx={{ borderRadius: 20, marginTop: 2 }}
            >
              Add Blog
            </Button>
            }
          </Paper>
        </Container>
      </Box>
    );
}

export default MyBlogEmpty;
