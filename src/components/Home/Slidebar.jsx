import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { MdAdd, MdLogin } from "react-icons/md";
import { useSelector } from 'react-redux';
import {useGetAuthTokenQuery} from '../../store'
import { useNavigate } from 'react-router-dom';
function Sidebar() {
  const { blogs } = useSelector((store) => store.blogData);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const navigate = useNavigate()
  return (
    <>
    <Grid item xs={12} md={4} sx={{display: { xs: 'none', sm: 'block' }}}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 2, width:"175px"}}>
        <Typography variant="h6" gutterBottom>
        About me
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Hello, my name is Mehmet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat ligula id leo ultricies, ac vehicula metus tristique.
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 2, mt: 3, width:"175px" }}>
        <Typography variant="h6" gutterBottom>
          Blogs
        </Typography>
        {
        blogs.length > 0 
        ?
        blogs.map((blog) =>{
          const blogData = JSON.parse(blog.content);
          return(
          <div key={blog.id}>
            <Typography 
            variant="body2"
            color="blue" 
            key={blog.id} 
            onClick={() =>{navigate(`/Blogs/${blog.id}`)}}
            style={{
              cursor:"pointer"
            }}
            >
            - {blogData.name}: {blog.id}<br />
            </Typography>
          </div>
        )
        })
        :
        error 
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
    </Grid>


    <Grid item xs={12} md={4} sx={{display: { xs: 'block', sm: 'none' }}}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 2, width:"90%"}}>
        <Typography variant="h6" gutterBottom>
          About me
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Hello, my name is Mehmet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat ligula id leo ultricies, ac vehicula metus tristique.
        </Typography>
      </Paper>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 2, mt: 3, width:"90%" }}>
        <Typography variant="h6" gutterBottom>
          Blogs
        </Typography>
        {
        blogs.length > 0 
        ?
        blogs.map((blog) =>{
          const blogData = JSON.parse(blog.content);
          return(
          <div key={blog.id}>
            <Typography  variant="body2"
            color="blue" 
            key={blog.id} 
            onClick={() =>{navigate(`/Blogs/${blog.id}`)}}
            style={{
              cursor:"pointer"
            }}>
            - {blogData.name}: {blog.id}<br />
            </Typography>
          </div>
        )
        })
        :
        error 
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
    </Grid>
    </>
  );
}

export default Sidebar;
