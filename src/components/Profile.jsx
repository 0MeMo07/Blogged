import { Avatar, Typography, Box, Button, Divider, Grid } from '@mui/material';
import { FaMapMarkerAlt, FaBirthdayCake, FaPhoneAlt, FaRegUser, FaUniversity, FaAddressCard, FaArrowLeft  } from 'react-icons/fa';
import { useGetAuthTokenQuery } from '../store';
import { useNavigate } from 'react-router-dom';
import ProfileSkeleton from './Skeletons/ProfileSkeleton'
const UserProfile = () => {
  const { data: AuthData, error, isLoading } = useGetAuthTokenQuery();
  const navigate = useNavigate()
  return (
    <div style={{paddingTop: "50px"}}>
    { 
    isLoading ? 
    <ProfileSkeleton/>
    :
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4}}>
      <Avatar alt="John Doe" src={AuthData.image} sx={{ width: 150, height: 150 }} />
      <Typography variant="h4" sx={{ marginTop: 2}}>{AuthData.firstName} {AuthData.lastName}</Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 1}}>{AuthData.company.title}</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2}}>{AuthData.email}</Typography>
      <Divider sx={{ width: '100%', marginBottom: 2}} />
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaMapMarkerAlt style={{ marginRight: 8}} />
            <Typography variant="subtitle2">Address:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.address.address}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaBirthdayCake style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Date of Birth:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.birthDate}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaPhoneAlt style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Phone:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.phone}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaRegUser style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Username:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.username}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaUniversity  style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">University:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.university}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FaAddressCard  style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Your Ip Addres:</Typography>
          </Box>
          <Typography variant="body2">{AuthData.ip}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ width: '100%', marginY: 2}} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button startIcon={<FaArrowLeft/>} variant="variant" color="primary" onClick={()=>{
           navigate('/');
        }}>Back Home</Button>
      </Box>
    </Box>
    }
    </div>
  );
};

export default UserProfile;
