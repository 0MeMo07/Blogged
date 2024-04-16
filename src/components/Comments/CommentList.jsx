import React, { useState, useRef, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { FiSend } from 'react-icons/fi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CreateComment, deleteComment, editComment, increaseCommentLike } from '../../store/slices/blogData';
import { useGetAuthTokenQuery } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDots, BsPencilSquare, BsTrash } from "react-icons/bs";
import { BiLike, BiSolidLike } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components'

const Puller = styled.div`
width: 30px;
height: 6px;
background-color: gray;
border-radius: 3px;
position: absolute;
top: 8px;
left: calc(50% - 15px);
`;

const Comments = ({id, userId}) => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [comment, setComment] = useState('');

  const [commentId, setCommentId] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [commentUserId, setCommentUserId] = useState('');
  const [ Like, setLike] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const commentListRef = useRef(null);
  const commentInputRef = useRef(null);
  const { blogs } = useSelector((store) => store.blogData);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const dispatch = useDispatch() 

  const [showOptions, setShowOptions] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const handleOptionsClick = (commentId) => {
    setSelectedCommentId(commentId);
    setShowOptions(!showOptions);
  };

  const handleEditClick = (commentId, name, imageUrl, userId, body) => {
    setCommentId(commentId)
    setName(name)
    setImageUrl(imageUrl)
    setCommentUserId(userId)

    setIsEditing(true)
    setComment(body);
    setShowOptions(false);
  };

  const handleEditSubmit = () => {
    setIsEditing(false)
    setComment('')
    dispatch(editComment({blogId: id, commentId, name, body: comment, imageUrl, commentUserId})) 
  }

  const handleDeleteClick = (commentId) => {
    dispatch(deleteComment({blogId: id, commentId}))
    setShowOptions(false);
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
      if (!error){
      const createdAt = new Date().toISOString();
      dispatch(CreateComment({id: id, name: AuthData.username, body: comment, imageUrl: AuthData.image, userId: AuthData.id, createdAt: createdAt  }))
      setComment('')
      }
      else{
        toast.error('Please log in before commenting')
      }
    }
  };
  return (
    <>
    <Toaster/>
    <SwipeableDrawer 
      sx={{
        width: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '100%',
          maxHeight: 400,
          overflowY: 'auto',
        },
      }}
      swipeAreaWidth={30}
      anchor="bottom"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: '#e2e2e2',
        position: 'sticky', 
        top: 0,
        zIndex: 1, 
      }}>
        <Puller />
        <Typography marginTop='20px' sx={{fontFamily:'Space Mono', fontSize:'1.2rem'}}>Comments</Typography>
        <div className='Line' style={{backgroundColor:'white'}}></div>
      </Box> 
      <div style={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#e2e2e2' }}>
      {/* <Typography
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          fontFamily: 'monospace',
          opacity: 0.3, 
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        Blogged
      </Typography> */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }} ref={commentListRef}>
          <List>
            {
            blogs
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
                blog.comments && blog.comments.map(comment => (
                
                  <ListItem key={comment.id} disablePadding>
                    <Avatar alt={comment.name} src={comment.imageUrl} />
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '4px'
                          }}
                        >
                          <Typography
                            sx={{ fontFamily: 'monospace' ,fontWeight: 'bold', fontSize: '0.9rem', color: 'text.primary' }}
                          >
                            {comment.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {comment.userId === userId ? (
                              
                              <Typography
                                sx={{ fontSize: '0.8rem', color: 'dodgerblue', marginLeft: '4px' }}
                              >
                              • Creator
                              </Typography>
                              ) : null}
                              <Typography
                                sx={{ fontSize: '0.7rem', color: 'text.secondary', marginLeft: '4px' }}
                              >
                                - {timeAgo(comment.createdAt)}
                              </Typography>

                              {
                              AuthData && AuthData.id !== undefined && AuthData.id !== null && comment.userId === AuthData.id ? 
 
                              <Box
                                sx={{
                                  position: 'relative',
                                  cursor: 'pointer',
                                }}
                                onClick={() => handleOptionsClick(comment.id)}
                              >
                                <BsThreeDots style={{ marginLeft: '4px', marginBottom: '-3px' }} />
                                {showOptions && selectedCommentId === comment.id && (
                                  <Box
                                  ref={optionsRef}
                                  sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'white',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    zIndex: 999999,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2px',
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: '100%',
                                      transition: 'background-color 0.3s',
                                      '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '8px 8px 0 0',
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: '10px',
                                      }}
                                      onClick={() => {
                                        handleEditClick(comment.id, comment.name, comment.imageUrl, comment.userId, comment.body)
                                      }}
                                    >
                                      <BsPencilSquare />
                                      <Typography sx={{ marginLeft: '4px', color: 'black', fontFamily: 'monospace'}}>Edit</Typography>
                                    </Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      width: '100%',
                                      transition: 'background-color 0.3s',
                                      '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '0 0 8px 8px',
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: '10px',
                                      }}
                                      onClick={() => {
                                        handleDeleteClick(comment.id);
                                      }}
                                    >
                                      <BsTrash />
                                      <Typography sx={{ marginLeft: '4px', color: 'black', fontFamily: 'monospace' }}>Delete</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                
                                )}
                              </Box>
                              :
                              null
                              }
                            </Box>
                          </Box>
                      }
                      secondary={
                        <>
                        <Box
                          sx={{ display: 'inline-block', maxWidth: '75%', overflowWrap: 'break-word', marginLeft: '4px' }}
                        >
                          <Typography
                            sx={{ display: 'inline', fontSize: '0.9rem', color: 'text.primary', fontFamily: 'Open Sans'}}
                            component="span"
                            variant="body2"
                          >
                            {comment.body}
                          </Typography>    
                          
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
                          <Typography sx={{ fontSize: '0.9rem'}}>{comment.Like && comment.Like.length > 0 ? comment.Like.length : 0} Likes</Typography>
                          <IconButton size="small" color="gray" onClick={() => {
                            error 
                            ? 
                            toast.error('Please log in before liking a comment.')
                            :
                            dispatch(increaseCommentLike({blogId: id, commentId: comment.id, userId: AuthData.id}))
                          }}>
                            
                            {!isLoading && Like && AuthData && AuthData.id &&
                            comment.Like && comment.Like.includes(AuthData.id) ? <BiSolidLike color='blue'/> : <BiLike />
                            }

                          </IconButton>
                        </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))
              ))
            }
          </List>
        </div>

        {/*Pc*/}

        <Box sx={{ display: { xs: 'none', sm: 'flex' } , position: 'sticky', bottom: 0, padding:'5px', backgroundColor: '#e2e2e2' }}>
          <TextField
            inputRef={commentInputRef}
            label="Write your comment here"
            variant="outlined"
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
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            sx={{ flex: 1, height: 'auto' }}
            size="small" 
          />
          <IconButton
            onClick={() => {
              if (isEditing) { 
                handleEditSubmit(); 
              } else { 
                handleSubmitComment(); 
              }
            }}
            color="primary"
            sx={{ ml: 1 }}
          >
            {isEditing ? <BsPencilSquare /> : <FiSend />}
          </IconButton>
        </Box>

        {/*Mobile*/}

        <Box sx={{ display: { xs: 'flex', sm: 'none' } , position: 'sticky', bottom: 0, padding:'5px', backgroundColor: '#e2e2e2'  }}>
         <TextField
            inputRef={commentInputRef}
            label="Write your comment here"
            variant="outlined"
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
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            sx={{ flex: 1, height: 'auto' }}
            size="small" 
          />
          <IconButton
            onClick={() => {
              if (isEditing) { 
                handleEditSubmit(); 
              } else { 
                handleSubmitComment(); 
              }
            }}
            color="primary"
            sx={{ ml: 1 }}
          >
            {isEditing ? <BsPencilSquare /> : <FiSend />}
          </IconButton>
        </Box>
      </div>
    </SwipeableDrawer>
    </>
  );
};

export default Comments;
