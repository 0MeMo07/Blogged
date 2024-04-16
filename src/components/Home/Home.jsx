import React from 'react';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedCarts from './FeaturedCarts';
import FeaturedBlog from './FeaturedBlog';
import SlideBar from './Slidebar';
import { Grid, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetAuthTokenQuery } from '../../store';

function Home() {
  const { blogs } = useSelector((store) => store.blogData);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const topTwoLikedBlogs = blogs
  .slice()
  .sort((a, b) => b.Like.length - a.Like.length)
  .slice(0, 2);
  return (
    <>
      <MainFeaturedPost />
      <Container>
        <Grid container spacing={2}>
        {
          blogs.length > 0 ?
          topTwoLikedBlogs.map((blog) => {
              const blogData = JSON.parse(blog.content);
              return (
                <FeaturedCarts
                  key={blog.id}
                  id={blog.id}
                  Like={blog.Like}
                  title={blogData.title}
                  name={blogData.name}
                  body={blogData.body}
                  Image={blogData.imageUrl}
                  userId={blogData.userId}
                  userAvatar={blogData.userAvatar}
                />
              );
            })
          :
          "" // <BlogsEmpty/>
        }
      </Grid>
    </Container>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={8}>
          <FeaturedBlog />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", borderLeft: "2px solid #00000034"}}>
          <SlideBar />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
