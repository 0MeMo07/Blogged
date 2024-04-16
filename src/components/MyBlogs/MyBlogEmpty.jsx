import React from 'react';
import { Typography, Button, Box, Container, Paper } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function MyBlogEmpty() {
    const navigate = useNavigate()
    return (
      <Box
        sx={{
          position: 'relative',
          borderRadius:"20px",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '75vh',
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
              Your Blog is Empty
            </Typography>
            <Typography variant="body1" gutterBottom>
              It seems like there are no blogs to display. Start sharing your thoughts and experiences by adding a new blog.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MdAdd />}
              onClick={() =>{navigate('/AddBlogs')}}
              sx={{ borderRadius: 20, marginTop: 2 }}
            >
              Add Blog
            </Button>
          </Paper>
        </Container>
      </Box>
    );
}

export default MyBlogEmpty;
