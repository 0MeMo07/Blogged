import { useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
import styled from 'styled-components';
import { BsThreeDots, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FiSend } from 'react-icons/fi';
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useGetAuthTokenQuery } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { CreateComment, deleteComment, editComment, increaseCommentLike } from '../../store/slices/blogData';
import toast, { Toaster } from 'react-hot-toast';

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 20px;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentText = styled.p`
  margin: 0;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Icon = styled(IconButton)`
  margin-right: 8px;
  cursor: pointer;
`;

const LikeButton = styled(IconButton)`
  margin-top: 8px;
  color: #777;
`;

const BlogPreviewComments = ({ id, userId }) => {
  const [comment, setComment] = useState('');
  const [commentId, setCommentId] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [commentUserId, setCommentUserId] = useState('');
  const [Like, setLike] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const commentListRef = useRef(null);
  const commentInputRef = useRef(null);
  const { blogs } = useSelector((store) => store.blogData);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const dispatch = useDispatch();

  const handleEditClick = (commentId, name, imageUrl, userId, body) => {
    setCommentId(commentId)
    setName(name)
    setImageUrl(imageUrl)
    setCommentUserId(userId)

    setIsEditing(true)
    setComment(body);
  };

  const handleEditSubmit = () => {
    setIsEditing(false)
    setComment('')
    dispatch(editComment({ blogId: id, commentId, name, body: comment, imageUrl, commentUserId }))
  }

  const handleDeleteClick = (commentId) => {
    dispatch(deleteComment({ blogId: id, commentId }))
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const timeAgo = (createdAt) => {
    const date = new Date(createdAt);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (minutes < 1) {
      return 'Now';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 365) {
      return `${days} days ago`;
    } else {
      return `${years} years ago`;
    }
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      if (!error) {
        const createdAt = new Date().toISOString();
        dispatch(CreateComment({ id: id, name: AuthData.username, body: comment, imageUrl: AuthData.image, userId: AuthData.id, createdAt: createdAt }))
        setComment('')
      }
      else {
        toast.error('Please log in before commenting')
      }
    }
  };

  return (
    <Box sx={{textAlign:'left !important',fontFamily: 'Open Sans'}}>
      <Toaster/>
      <div className='Line'></div>
      <CommentList>
        {blogs
        .filter(blog => blog.id === id) 
        .map(blog => (
        !blog.comments || blog.comments.length === 0 ?
        <>
        <Box sx={{display:'flex', textAlign: 'center', flexDirection: 'column', margin: '50px'}}>
        <Typography sx={{fontSize: '1.6rem', fontFamily: 'monospace'}}>There are no comments yet</Typography>
        <Typography sx={{fontSize: '1.3rem', fontFamily: 'monospace'}}>Start the conversation</Typography>
        </Box>
        </> 
        : 
          blog.comments.map(comment => (
            <CommentItem key={comment.id}>
              <CommentInfo style={{ gap: '5px' }}>
                <Avatar src={comment.imageUrl} alt="Avatar" />
                <Typography variant="subtitle1">{comment.name}</Typography>
                {comment.userId === userId ? (       
                <Typography
                sx={{ fontSize: '0.9rem', color: 'dodgerblue', marginLeft: '4px' }}
                >
                • Creator
                </Typography>
                ) : null}
                <Typography variant="body2" color='gray'>
                  - {timeAgo(comment.createdAt)}
                </Typography>
                {AuthData && AuthData.id !== undefined && AuthData.id !== null && comment.userId === AuthData.id && 
                <IconsWrapper>
                  <Icon variant='span' component='span' sx={{ color: 'gray', fontSize: '20px' }} onClick={() => handleEditClick(comment.id, comment.name, comment.imageUrl, comment.userId, comment.body)}><BsPencilSquare /></Icon>
                  <Icon variant='span' component='span' sx={{ color: 'gray', fontSize: '20px' }} onClick={() => handleDeleteClick(comment.id)}><BsTrash /></Icon>
                </IconsWrapper>
                }
              </CommentInfo>
              <Box sx={{ display: 'inline-block', maxWidth: '100%', overflowWrap: 'break-word', marginLeft: '4px'}}>
                <CommentText>{comment.body}</CommentText>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '4px', textAlign:'center' }}>
                <Typography sx={{ fontSize: '0.9rem', color: 'gray',  }}>{comment.Like ? comment.Like.length : 0} Likes</Typography>
                <LikeButton sx={{ color: 'gray', textAlign:'center', fontSize:'1rem' }} 
                onClick={() => {
                error 
                ? 
                toast.error('Please log in before liking a comment.')
                :
                dispatch(increaseCommentLike({blogId: id, commentId: comment.id, userId: AuthData.id}))
                }}>{!isLoading && Like && AuthData && AuthData.id &&
                    comment.Like && comment.Like.includes(AuthData.id) ? <BiSolidLike color='blue'/> : <BiLike />
                    }</LikeButton>
              </Box>
            </CommentItem>
          ))
        ))}
      </CommentList>
        <Box sx={{textAlign:'center', alignItems:'center'}}>
            <TextField
            inputRef={commentInputRef}
            multiline
            rows={4}
            variant="outlined"
            placeholder="Write your comment here..."
            fullWidth
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (isEditing) { 
                    handleEditSubmit(); 
                    } else { 
                    handleSubmitComment(); 
                    }
                }
            }}
            margin="normal"
            InputProps={{
                style: { color: 'gray' } 
            }}
            value={comment}
            onChange={handleCommentChange}
            />
            <Button variant="contained" type="submit" 
            startIcon={isEditing ? <BsPencilSquare /> : <FiSend />}
            onClick={() => {
            if (isEditing) { 
            handleEditSubmit(); 
            } else { 
            handleSubmitComment(); 
            }
            }}
            color="primary"
            >
            Submit
            </Button>
        </Box>
    </Box>
  );
};

export default BlogPreviewComments;
