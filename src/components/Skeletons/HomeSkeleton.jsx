import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton
  } from '@mui/material';

function Home() {

  return (
    <>
    {[...Array(1)].map((_, index) => (
        <Grid key={index} item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }} className="MyBlogCart">
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  <Skeleton variant="text" width="60%" height={30} />
                </Typography>
                <Typography variant="subtitle1">
                  <Skeleton variant="text" width="70%" height={20} />
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  <Skeleton variant="text" width="60%" height={20} />
                </Typography>
              </CardContent>
              <Skeleton
                variant="rectangular"
                sx={{ width: 150, height: 150, display: { xs: 'none', sm: 'block' } }}
              />
            </Card>
          </CardActionArea>
        </Grid>
      ))}
    </>
  );
}

export default Home;
