import React from 'react';
import { Container, Typography, Divider, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BlogsEmpty from '../Blogs/BlogsEmpty';
import MarkdownRenderer from '../../helpers/MarkdownRenderer'
import BlogPreviewComments from '../BlogPrewiew/BlogPrewiewComments';


const StyledContainer = styled(Container)`
  && {
    /* max-width: 800px; */
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    @media (max-width: 600px) {
      padding: 10px;
    }
  }
`;

const StyledTitle = styled(Typography)`
  && {
    font-weight: bold;
    margin-bottom: 10px;
    /* text-align: center; */

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
`;

const StyledAuthorInfo = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* margin-top: 20px; */
`;

const StyledAuthorAvatar = styled(Avatar)`
  && {
    width: 60px;
    height: 60px;
    margin-right: 10px;

    @media (max-width: 600px) {
      width: 40px;
      height: 40px;
    }
  }
`;

const StyledAuthorName = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: bold;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

const StyledDate = styled(Typography)`
  && {
    font-size: 1rem;
    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const StyledContent = styled(Typography)`
  && {
    font-size: 1.2rem;
    text-align: justify; 
    justify-content: center;
    line-height: 1.2;
    margin-bottom: 10px;
    /* white-space: pre-line;  */
    
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

const StyledMetaContainer = styled('div')`
  display: flex;
  align-items: center;
`;

const StyledMetaItem = styled(Typography)`
  && {
    font-size: 1rem;
    color: gray;
    margin-right: 30px;

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

const FeaturedBlog = () => {
  const { blogs } = useSelector((store) => store.blogData);
  const topOneLikedBlog = blogs
    .slice()
    .sort((a, b) => b.Like.length - a.Like.length)
    .slice(0, 1);

  return (
    <StyledContainer>
      {topOneLikedBlog.length > 0 ? (
        topOneLikedBlog.map((blog) => {
          const blogData = JSON.parse(blog.content);
          return (
            <>
            <div key={blog.id}>
              <StyledTitle variant="h3" style={{
              display:"flex", 
              justifyContent:"center", 
              textAlign:"center",
              marginTop:"60px",
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              }}>Most Liked Blog</StyledTitle>
              <div className='Line'></div>
              <div style={{padding:"25px"}}>
              <StyledAuthorInfo>
                <StyledAuthorAvatar src={blogData.userAvatar} alt="Author Avatar"/>
                <div>
                  <StyledAuthorName variant="h2" component='p'>{blogData.name}</StyledAuthorName>
                  <StyledDate variant="body2">• {blog.createdAt}</StyledDate>
                </div>
              </StyledAuthorInfo>
              <StyledTitle variant="h4">{blogData.title}</StyledTitle>
              <div className='Line'></div>
              <div className='markdown'>
                <StyledContent variant="div">
                  <MarkdownRenderer>{blogData.body}</MarkdownRenderer>
                </StyledContent>
              </div>
              <StyledMetaContainer>
                <StyledMetaItem variant="body2">
                  Writer: {blogData.name}
                </StyledMetaItem>
              </StyledMetaContainer>
              </div>
            </div>
            <BlogPreviewComments id={blog.id} userId={blogData.userId}/>
            </>
          );
        })
      ) : (
        <BlogsEmpty />
      )}
    </StyledContainer>
  );
};

export default FeaturedBlog;
