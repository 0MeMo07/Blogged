import { useState, useEffect } from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Avatar ,CardActions, Typography, IconButton } from '@mui/material'; // MUI kütüphanesinden gerekli bileşenleri içe aktarın
import { FaHeart ,FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { IncreaseLike } from '../../store/slices/blogData';
import {trimText} from '../../helpers/MaxLenght';
import { useGetAuthTokenQuery } from '../../store';
import toast, { Toaster } from 'react-hot-toast';
import CardSkeleton from '../Skeletons/CardSkeleton';
import { useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../../helpers/MarkdownRenderer';
import Comments from '../Comments/CommentList'

function Blogs({id, title, name, body, Image, userId, userAvatar, Like}) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isLoading && Like) {
      setIsLiked(Like.includes(AuthData.id));
    }
  }, [isLoading, Like, AuthData]);
  
  const handleLike = () => {
    if (!error){
      dispatch(IncreaseLike({ id: id, userId:AuthData.id }))
      setIsLiked(!isLiked)
    }
    else{
      toast.error('You need to log in before you can like.');
    }
  }

  const handleBlogId = () =>{
    navigate(`/Blogs/${id}`);
  }

  const toggleCommentsVisibility = () =>{
    setCommentsVisible(!commentsVisible);
  }
  
  const MAX_TITLE_LENGTH = 19;
  const MOBILE_MAX_TITLE_LENGTH = 8;

  const MAX_CONTENT_LENGTH = 30;
  const MOBILE_MAX_CONTENT_LENGTH = 15;

  const trimmedContent = trimText(body, MAX_CONTENT_LENGTH);
  const trimmedTitle = trimText(title, MAX_TITLE_LENGTH);

  const mobilTrimmedContent = trimText(body, MOBILE_MAX_CONTENT_LENGTH);
  const mobilTrimmedTitle = trimText(title, MOBILE_MAX_TITLE_LENGTH);

  return (
    <>
    {commentsVisible && <Comments id={id} userId={userId}/>}
    <Toaster/>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <Grid item xs={12} md={6} >
          <CardActionArea component="a" onClick={handleBlogId} >
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
                    display: { xs: 'block', sm: 'none' } ,
                    whiteSpace: "nowrap"
                  }}
                >
                  {mobilTrimmedTitle}
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
                    display: { xs: 'block', sm: 'none' },
                    fontSize: "14px",
                  }}
                >
                  <MarkdownRenderer>{trimmedContent.split('\n')[0].replace(/#+\s/g, '')}</MarkdownRenderer>
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
            </Card>
            <CardActions sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#F4F1F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Avatar src={userAvatar}/>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color='white'
                  size='small'
                  className='ActionBtns'
                  onClick={(event)=>{
                    event.stopPropagation()
                    handleLike(event)}}
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
        
      )}
    </>
  );
}

export default Blogs;
