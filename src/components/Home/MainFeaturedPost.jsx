import {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function MainFeaturedPost() {
  const navigate = useNavigate()
  const handleLetsGo = () => {
    navigate('/Blogs')
  }
  return (
    <>
    {/* Pc */}
      <Paper
        sx={{
          marginTop: "80px",
          marginRight: "80px",
          marginLeft: "80px",
          borderRadius:"10px",
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random?blog)`,
          display: { xs: 'none', sm: 'block' }
        }}
      >
        <Box
          sx={{

            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
                Start reading blogs
              </Typography>
              <Typography variant="h6" component="div" color="inherit" display="flex" paragraph>
              <Typography variant="h6" color="inherit" marginRight="10px" className='FeaturedOk'>‣</Typography> Like, comment and start reading blogs
              </Typography>
              <Button onClick={handleLetsGo} variant="contained" sx={{
                textDecoration: "none",
                borderRadius: "20px",
                backgroundColor: "black",
                color: "white",
                border: "solid 1px black"
                
              }}>
                Let's go
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

    {/* mobile */}
    <Paper
        sx={{
          marginTop: "80px",
          borderRadius:"10px",
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://source.unsplash.com/random?blog)`,
          display: { xs: 'block', sm: 'none' }
        }}
      >
        <Box
          sx={{

            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}>
                Start reading blogs
              </Typography>
              
              <Typography variant="h6" color="inherit" display="flex" paragraph>
                Like, comment and start reading blogs
              </Typography>
              <Button onClick={handleLetsGo} variant="contained" href="#" sx={{
                textDecoration: "none",
                borderRadius: "20px",
                backgroundColor: "black",
                color: "white",
                border: "solid 1px black"
              }}>
                Let's go
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MainFeaturedPost;
