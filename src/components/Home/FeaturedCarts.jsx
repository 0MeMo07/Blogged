import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import CardMedia from '@mui/material/CardMedia';
import { IncreaseLike } from '../../store/slices/blogData';
import { useDispatch } from 'react-redux';
import { FaHeart ,FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { useGetAuthTokenQuery } from '../../store';
import { trimText } from '../../helpers/MaxLenght';
import { Avatar } from '@mui/material';
import Loading from '../Loading'
import toast, { Toaster } from 'react-hot-toast';
import MarkdownRenderer from '../../helpers/MarkdownRenderer'
import { useNavigate } from 'react-router-dom';
import Comments from '../Comments/CommentList';
import HomeSkeleton from '../Skeletons/HomeSkeleton';

function FeaturedPost(props) {
  const { id, Like, title, name, body, Image, userId, userAvatar } = props;
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const [isLiked, setIsLiked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const navigate = useNavigate() 

  useEffect(() => {
    if (!isLoading && Like && AuthData && AuthData.id) {
      setIsLiked(Like.includes(AuthData.id));
    }
  }, [isLoading, Like, AuthData]);


  const dispatch = useDispatch()
  const MAX_TITLE_LENGTH = 19;
  const MOBİL_MAX_TITLE_LENGTH = 8;

  const MAX_CONTENT_LENGTH = 30;
  const MOBİL_MAX_CONTENT_LENGTH = 15;


  const trimmedContent = trimText(body, MAX_CONTENT_LENGTH);
  const trimmedTitle = trimText(title, MAX_TITLE_LENGTH);

  const MobiltrimmedContent = trimText(body, MOBİL_MAX_CONTENT_LENGTH);
  const MobiltrimmedTitle = trimText(title, MOBİL_MAX_TITLE_LENGTH);

  const handleLike = () => {
    if (!error){
      dispatch(IncreaseLike({ id: id, userId:AuthData.id }))
      setIsLiked(!isLiked)
    }
    else{
      toast.error('You need to log in before you can like.');
    }
  }

  const toggleCommentsVisibility = () =>{
    setCommentsVisible(!commentsVisible);
  }

  const handleBlogId = () =>{
    navigate(`/Blogs/${id}`);
  }
  return (
    <>
    <Toaster/>
    {commentsVisible && <Comments id={id} userId={userId}/>}
    {isLoading 
    ? 
    <HomeSkeleton/>
    :
    <Grid item xs={12} md={6}>
    <CardActionArea component="a" onClick={handleBlogId}>
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
            display: { xs: 'block', sm: 'none' },
            fontSize: "14px",
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
          
      </Card>
      <CardActions sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#F4F1F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Avatar src={userAvatar}/>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
              color='white'
              size='small'
              className='ActionBtns'
              onClick={
              (event)=>
              {
                event.stopPropagation()
                handleLike()
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
                {Like.length || 0} Likes
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
  }
  </>
  );
}

export default FeaturedPost;
