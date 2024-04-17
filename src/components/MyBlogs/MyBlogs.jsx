import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlogVerificationByUserId } from '../../store/slices/blogData';
import { useGetAuthTokenQuery } from '../../store';
import { Container, Grid } from '@mui/material';
import MyBlogsCarts from './MyBlogsCarts';
import MyBlogEmpty from './MyBlogEmpty';
import SearchInput from '../SearchInput'; 

function MyBlogs() {
  const dispatch = useDispatch();
  const { blogs, userHasBlogVerification } = useSelector((store) => store.blogData);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isLoading) {
      dispatch(BlogVerificationByUserId({ userId: AuthData.id }));
    }
  }, [blogs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const blogData = JSON.parse(blog.content);
    const { title, name, body } = blogData;
    const searchText = searchTerm.toLowerCase();
    return (
      title.toLowerCase().includes(searchText) ||
      name.toLowerCase().includes(searchText) ||
      body.toLowerCase().includes(searchText)
    );
  });

  return (
    <Container sx={{ paddingTop: 10 }}>
    <SearchInput onChange={handleSearch} placeholder="Search..."/>
    <Grid container spacing={2}>
      {userHasBlogVerification ? (
        filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => {
            const blogData = JSON.parse(blog.content);
            return (
              <MyBlogsCarts
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
        ) : (
          <MyBlogEmpty />
        )
      ) : (
        <MyBlogEmpty />
      )}
    </Grid>
  </Container>
  );
}

export default MyBlogs;
