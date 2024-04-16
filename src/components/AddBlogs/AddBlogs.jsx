import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import {
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  CardActions,
  IconButton,
  Avatar,
  CardMedia
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AddBlogSchema } from '../../schemas/validationSchemas'
import DarkMode from '../DarkMode';
import axios from 'axios';
import { addBlog } from '../../store/slices/blogData';
import { useGetAuthTokenQuery } from '../../store';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {trimText} from '../../helpers/MaxLenght';

const BlogInputs = styled(TextField)({
  '& label.Mui-focused': {
    color: '#0080ff',
  },
  'label': {
    color: '#5f5f5f',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0080ff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ffffff32',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff32',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffffff32',
    },
  },
});

function AddBlogs() {
  const dispatch = useDispatch();
  const initialValues = {
    newBlogTitle: '',
    newBlogContent: '',
    newBlogImage: '',
  };
  const { darkMode } = DarkMode();
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const navigate = useNavigate()

  const [normalTitle, setNormalTitle] = useState('');
  const [normalContent, setNormalContent] = useState('');

  const [trimmedTitle, setTrimmedTitle] = useState('Title');
  const [trimmedContent, setTrimmedContent] = useState('Content');

  const [MobiltrimmedTitle, setMobiltrimmedTitle] = useState('Title');
  const [MobiltrimmedContent, setMobiltrimmedContent] = useState('Content');

  const updateTrimmedTitleValues = (newTitle) => {
    const MAX_TITLE_LENGTH = 19;
    const MOBİL_MAX_TITLE_LENGTH = 8;
  


    const trimmedTitleResult = trimText(newTitle || 'Title', MAX_TITLE_LENGTH);
    const MobiltrimmedTitle = trimText(newTitle || 'Title', MOBİL_MAX_TITLE_LENGTH);

    setNormalTitle(newTitle);
    setTrimmedTitle(trimmedTitleResult);
    setMobiltrimmedTitle(MobiltrimmedTitle);
  };


  const updateTrimmedContentValues = (newContent) => {
    const MAX_CONTENT_LENGTH = 30;
    const MOBİL_MAX_CONTENT_LENGTH = 15;

    const trimmedContentResult = trimText(newContent || 'Content', MAX_CONTENT_LENGTH);
    const MobiltrimmedContent = trimText(newContent || 'Content', MOBİL_MAX_CONTENT_LENGTH);
    setNormalContent(newContent);
  
    setTrimmedContent(trimmedContentResult);
    setMobiltrimmedContent(MobiltrimmedContent)
  };

  useEffect(() => {
    if( error ){
      navigate("/")
    }
  },[error]) 

  const handleAddBlog = async (values, { setSubmitting, resetForm }) => {
    const FetchBlogAdd = async () => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: AuthData.username,
                title: values.newBlogTitle,
                body: values.newBlogContent,
                imageUrl: values.newBlogImage,
                userId: AuthData.id,
                userAvatar: AuthData.image,
               
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        
        dispatch(addBlog({
            name: response.data.name, 
            title: response.data.title, 
            content: response.data.body, 
            ImageUrl: response.data.imageUrl, 
            userId: response.data.userId,
            userAvatar: response.data.userAvatar,


            // name: AuthData.username,
            // title: values.newBlogTitle,
            // content: values.newBlogContent,
            // ImageUrl: values.newBlogImage,
            // userId: AuthData.id,
            // userAvatar: AuthData.image,
        }))

    };

    if (!error) {
      await FetchBlogAdd();
      resetForm();
      setNormalContent('');
      setNormalTitle('');
    }
    resetForm()
    setSubmitting(false);
    };



  return (
    <Container style={{ paddingTop: '75px'}}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ position: 'sticky', zIndex: '1000' }}
        sx={{
          mr: 2,
          display: { xs: 'flex' },
          justifyContent: "center",
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.2rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Add Blog
      </Typography>
      <div className='Line' style={{marginBottom:"25px"}}></div>
      
      <Formik
      initialValues={initialValues}
      validationSchema={AddBlogSchema}
      onSubmit={handleAddBlog}
    >
      {({ values ,isSubmitting }) => (
        <Form>
          <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Grid item xs={12} md={6} >
              <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex', borderRadius:"0" ,borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className='BlogCart'>
                  <CardContent sx={{ flex: 1 }}>
                    {/*Pc*/}
                    <Typography component="h2" variant="h5"
                    sx={{ 
                      display: { xs: 'none', sm: 'block' } 
                    }}
                    >
                      {trimmedTitle}
                    </Typography>

                    {/*Mobile*/}
                    <Typography component="h2" variant="h5"
                    sx={{ 
                      display: { xs: 'block', sm: 'none' } 
                    }}
                    >
                      {MobiltrimmedTitle}
                    </Typography>

                    {/*Pc*/}
                    <Typography variant="subtitle1" color="gray"
                    sx={{ 
                      display: { xs: 'none', sm: 'block' } 
                    }}
                    >
                      {trimmedContent.split('\n')[0].replace(/#+\s/g, '')}
                    </Typography>

                    {/*Mobile*/}
                    <Typography variant="subtitle1" color="gray"
                    sx={{ 
                      display: { xs: 'block', sm: 'none' } 
                    }}
                    >
                      {MobiltrimmedContent}
                    </Typography>

                    <Typography variant="subtitle1" color="primary">
                      Continue reading...
                    </Typography>
                  </CardContent>

                <CardMedia
                  component="img"
                  sx={{ 
                    borderRadius:"60px",
                    width: 125, 
                    height: 125, 
                    display: { xs: 'none', sm: 'block' } }}
                  image={values.newBlogImage}
                />
                <CardMedia
                  component="img"
                  sx={{ 
                    borderRadius:"60px",
                    width: 100, 
                    height: 100, 
                    margin: 'auto',
                    display: { xs: 'block', sm: 'none' } 
                  }}
                  image={values.newBlogImage}
                />
                </Card>
                <CardActions sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#F4F1F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Avatar src={AuthData.image}/>
                <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton 
                  color='white' 
                  size='small' 
                  className='ActionBtns'
                >
                <FaRegHeart fontSize="18px" />
                </IconButton>
                    <Typography variant="h6" component="p" fontSize='medium' color="black">
                        0 Likes
                    </Typography>
                </div>
                <IconButton color='white' size='small' className='ActionBtns'>
                    <FaRegCommentDots fontSize="18px" />
                </IconButton>
                </CardActions>

              </CardActionArea>
            </Grid>
          </Grid>

          <Field name="newBlogTitle">
            {({ field }) => (
              <BlogInputs
                {...field}
                className='AddBlog'
                label="Title"
                fullWidth
                margin="normal"
                value={normalTitle}
                variant="standard"
                sx={{ mb: 2, width: '100%' }}
                onChange={(e) => {
                  field.onChange(e);
                  updateTrimmedTitleValues(e.target.value, values.newBlogTitle);
                }}
                onBlur={(e) => {
                  field.onBlur(e);
                  updateTrimmedTitleValues(e.target.value, values.newBlogTitle); 
                }}
              />
            )}
          </Field>
          <ErrorMessage name="newBlogTitle" component="div" className="error" />

          <Field name="newBlogImage">
            {({ field }) => (
              <BlogInputs
                {...field}
                className='AddBlog'
                label="Image Url"
                fullWidth
                margin="normal"
                variant="standard"
                sx={{ mb: 2, width: '100%' }}
              />
            )}
          </Field>
          <ErrorMessage name="newBlogImage" component="div" className="error" />

          <Field name="newBlogContent">
            {({ field }) => (
              <BlogInputs
                {...field}
                className='AddBlog'
                label="Content"
                fullWidth
                multiline
                value={normalContent}
                rows={3}
                margin="normal"
                variant="standard"
                sx={{ mb: 2, width: '100%' }}
                onChange={(e) => {
                  field.onChange(e);
                  updateTrimmedContentValues(e.target.value, values.newBlogContent);
                }}
                onBlur={(e) => {
                  field.onBlur(e);
                  updateTrimmedContentValues(e.target.value, values.newBlogContent); 
                }}
              />
            )}
          </Field>
          <ErrorMessage name="newBlogContent" component="div" className="error" />

          <div style={{ textAlign: "center" }}>
            <Button sx={{ borderRadius: 20, marginTop: 2 }} type="submit" disabled={isSubmitting} startIcon={<IoIosAdd />} variant='outlined'>Add Blog</Button>
          </div>
        </Form>
      )}
    </Formik>
    </Container>
  );
}

export default AddBlogs;
