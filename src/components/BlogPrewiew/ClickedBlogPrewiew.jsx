import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardContent, Typography, Avatar, Divider, Container,Box } from '@mui/material';
import styled from 'styled-components';
import '../../css/markdownStyle.css'
import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import BlogPrewiewComments from './BlogPrewiewComments';


const StyledContainer = styled(Container)`
  && {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 75px;
    @media (max-width: 600px) {
      padding: 10px;
    }
  }
`;

const StyledTitle = styled(Typography)`
  && {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;

    @media (max-width: 600px) {
      font-size: 2.8rem;
    }
  }
`;

const StyledDivider = styled(Divider)`
  && {
    margin-bottom: 20px;
  }
`;

const StyledAuthorInfo = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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

const StyledBody = styled(Typography)`
  && {
    font-size: 1.2rem;
    text-align: justify;
    line-height: 1.6;
    /* white-space: pre-line;  */

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;


const StyledComments = styled(Box)`
  && {
    font-size: 1.2rem;
    text-align: justify;
    line-height: 1.6;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    /* white-space: pre-line;  */

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;
const BlogPreview = () => {
  const { BlogId } = useParams();
  const { blogs } = useSelector((store) => store.blogData);

  const selectedBlog = blogs.find((blog) => blog.id === parseInt(BlogId));
  const blogData = JSON.parse(selectedBlog.content);

  if (!selectedBlog) {
    return <Typography variant="h5">Blog not found</Typography>;
  }


  return (
    <>
    <StyledContainer variant="div" component='div' className='BlogPrewiew'>
      <StyledTitle variant="h1" component='h6'>{blogData.title}</StyledTitle>
      <StyledDivider />
      <StyledAuthorInfo>
        <StyledAuthorAvatar src={blogData.userAvatar} alt="Author Avatar"/>
        <div>
          <StyledAuthorName variant="h2" component='p'>{blogData.name}</StyledAuthorName>
          <StyledDate variant="body2">• {selectedBlog.createdAt}</StyledDate>
        </div>
      </StyledAuthorInfo>
        <StyledBody variant="div">
        <div className='markdown'>
          <MarkdownRenderer>
          {blogData.body}
          </MarkdownRenderer>
        </div>
        
        </StyledBody>
    </StyledContainer>
    <StyledComments>
      <BlogPrewiewComments id={parseInt(BlogId)} userId={blogData.userId}/>
    </StyledComments>
    </>
  );
};

export default BlogPreview;