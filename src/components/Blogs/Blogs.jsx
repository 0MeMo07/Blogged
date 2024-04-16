import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetAuthTokenQuery } from '../../store';
import BlogsEmpty from './BlogsEmpty';
import BlogsCarts from './BlogsCarts';
import SearchInput from '../SearchInput';

function MyBlogs() {
  const { blogs } = useSelector((store) => store.blogData);
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();

  const handleSearch = (term) => {
    const filtered = blogs.filter((blog) => {
      const blogData = JSON.parse(blog.content);
      const { title, name, body } = blogData;
      const searchText = term.toLowerCase();
      return (
        title.toLowerCase().includes(searchText) ||
        name.toLowerCase().includes(searchText) ||
        body.toLowerCase().includes(searchText)
      );
    });
    setFilteredBlogs(filtered);
  };

  return (
    <Container sx={{ paddingTop: 10 }}>
      <SearchInput
        onChange={handleSearch}
        placeholder="Search..."
      />
      <Grid container spacing={2}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => {
            const blogData = JSON.parse(blog.content);
            return (
              <BlogsCarts
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
          blogs.length > 0 && <BlogsEmpty />
        )}
      </Grid>
    </Container>
  );
}

export default MyBlogs;
