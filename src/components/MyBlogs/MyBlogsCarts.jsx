import { useState, useEffect } from 'react';
import { clearOneBlogData, IncreaseLike } from '../../store/slices/blogData';
import { useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useGetAuthTokenQuery } from '../../store';
import CardSkeleton from '../Skeletons/CardSkeleton';
import { FaHeart ,FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import {trimText} from '../../helpers/MaxLenght';
import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import {
  Typography,
  Container,
  CardActions,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Avatar,
  CardMedia,
  IconButton
} from '@mui/material';
import MyBlogsEdit from './MyBlogsEdit'
import { useNavigate } from 'react-router-dom';
import Comments from './../Comments/CommentList';

function MyBlogsCarts({ id, title, body, Image, userId, name, userAvatar, Like, createdAt }) {
  const dispatch = useDispatch();
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState('');
  const [editContant, setEditContant] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editUserAvatar, setEditUserAvatar] = useState(''); 
  const [editLike, setEditLike] = useState(''); 
  const [editCreatedAt, setEditCreatedAt] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isLoading && Like) {
      setIsLiked(Like.includes(AuthData.id));
    }
  }, [isLoading, Like, AuthData]);
  
  const MAX_TITLE_LENGTH = 19;
  const MOBİL_MAX_TITLE_LENGTH = 8;

  const MAX_CONTENT_LENGTH = 30;
  const MOBİL_MAX_CONTENT_LENGTH = 15;


  const trimmedContent = trimText(body, MAX_CONTENT_LENGTH);
  const trimmedTitle = trimText(title, MAX_TITLE_LENGTH);

  const MobiltrimmedContent = trimText(body, MOBİL_MAX_CONTENT_LENGTH);
  const MobiltrimmedTitle = trimText(title, MOBİL_MAX_TITLE_LENGTH);

  const handleDelete = (event,id) => {
    event.stopPropagation();
    dispatch(clearOneBlogData({id}))
  }

  const handleEdit = (event,{ editId, title, body, Image, userId, userAvatar, Like, createdAt}) => {
    event.stopPropagation();
    setEditId(editId);
    setEditContant(body);
    setEditTitle(title);
    setEditImage(Image);
    setEditUserId(userId);
    setEditUserAvatar(userAvatar);
    setEditLike(Like)
    setEditCreatedAt(createdAt)
    setOpenEdit(true); 
  };

  const toggleCommentsVisibility = () =>{
    setCommentsVisible(!commentsVisible);
  }

  const handleCloseEdit = () => {
    setOpenEdit(false); 
  };

  const handleLike = () => {
    dispatch(IncreaseLike({ id: id, userId:AuthData.id }));
    setIsLiked(!isLiked)
  };

  const handleBlogId = () =>{
    navigate(`/Blogs/${id}`);
  }

  return (
    <>
    {commentsVisible && <Comments id={id} userId={userId}/>}
    {isLoading ? <CardSkeleton/> :
      (AuthData.id === userId) && 
      (
        <Grid item xs={12} md={6} >
          <CardActionArea component="a"
          onClick={()=>{
          handleBlogId()
          }}>
            <Card sx={{ display: 'flex', borderRadius:"0",borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className="MyBlogCart">
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
                  display: { xs: 'none', sm: 'block' },
                  fontSize: "14px",
                }}
              >
                <MarkdownRenderer>{trimmedContent.split('\n')[0].replace(/#+\s/g, '')}</MarkdownRenderer>
              </Typography>


                {/*Mobile*/}
                <Typography variant="subtitle1" color="gray"
                sx={{ 
                  display: { xs: 'block', sm: 'none' } 
                }}
                >
                  <MarkdownRenderer>{MobiltrimmedContent.split('\n')[0].replace(/#+\s/g, '')}</MarkdownRenderer>
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
                image={Image}
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
                image={Image}
              />

              <div style={{ display:"flex", flexDirection: "column", height:"20px"}} >
              <IconButton 
                onClick={(event) => {
                  handleDelete(event, id); 
                  event.stopPropagation();
                }}
                aria-label="delete" 
                sx={{fontSize:"23px", color:"red"}}
              >
                <MdDelete />
              </IconButton>


              <IconButton 
                aria-label="edit" 
                onClick={(event) => {
                  handleEdit(event, { editId: id, title, body, Image, userId, userAvatar, Like, createdAt });
                  event.stopPropagation();
                }}
                sx={{fontSize:"23px", color:"blue"}}
              >
                <MdEdit />
              </IconButton>

              </div>
                
            </Card>
            <CardActions sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#F4F1F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Avatar src={userAvatar}/>
              <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color='white'
                    size='small'
                    className='ActionBtns'
                    onClick={(event) => {
                      handleLike()
                      event.stopPropagation();
                    }}
                    style={{
                      transition: 'transform 0.2s',
                      transform: isLiked ? 'scale(1.2)' : 'scale(1)' 
                    }}
                  >
                    {isLiked ? (
                      <FaHeart fontSize="18px" color='red'/>
                    ) : (
                      <FaRegHeart fontSize="18px" />
                    )}
                  </IconButton>
                  <Typography variant="h6" component="p" fontSize='medium' color="black">
                    {Like && Like.length > 0 ? Like.length : 0} Likes
                  </Typography>
              </div>
              <IconButton color='white' size='small' className='ActionBtns' onClick={(event)=>{
                event.stopPropagation()
                toggleCommentsVisibility()
              }}>
                  <FaRegCommentDots fontSize="18px" />
              </IconButton>
            </CardActions>

          </CardActionArea>
        </Grid>
      ) 

    }
    <MyBlogsEdit 
      open={openEdit} 
      handleClose={handleCloseEdit} 
      editId={editId}
      title={editTitle} 
      name={name}
      content={editContant} 
      imageUrl={editImage}
      userId={editUserId}
      userAvatar={editUserAvatar}
      Like={editLike}
      createdAt={editCreatedAt}
  />

    </>
  );
}

export default MyBlogsCarts;
