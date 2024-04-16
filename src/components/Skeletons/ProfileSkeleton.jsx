import React from 'react';
import { Skeleton } from '@mui/material';
import { Box, Avatar, Typography, Divider, Grid, Button } from '@mui/material';
import { FaMapMarkerAlt, FaBirthdayCake, FaPhoneAlt, FaRegUser, FaUniversity, FaAddressCard, FaArrowLeft } from 'react-icons/fa';

function ProfileSkeleton() {
  return (
    <div style={{paddingTop: "50px"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4}}>
        <Skeleton variant="circular" width={150} height={150} />
        <Skeleton variant="text" width={200} height={40} sx={{ mt: 2 }} />
        <Skeleton variant="text" width={150} height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={200} height={20} sx={{ mb: 1 }} />
        <Divider sx={{ width: '100%', marginBottom: 2}} />
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaMapMarkerAlt style={{ marginRight: 8}} />
              <Typography variant="subtitle2">Address:</Typography>
            </Box>
            <Skeleton variant="text" width={200} height={20} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaBirthdayCake style={{ marginRight: 8 }} />
              <Typography variant="subtitle2">Date of Birth:</Typography>
            </Box>
            <Typography variant="body2"><Skeleton variant="text" width={100} height={20} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaPhoneAlt style={{ marginRight: 8 }} />
              <Typography variant="subtitle2">Phone:</Typography>
            </Box>
            <Typography variant="body2"><Skeleton variant="text" width={100} height={20} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaRegUser style={{ marginRight: 8 }} />
              <Typography variant="subtitle2">Username:</Typography>
            </Box>
            <Typography variant="body2"><Skeleton variant="text" width={100} height={20} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaUniversity  style={{ marginRight: 8 }} />
              <Typography variant="subtitle2">University:</Typography>
            </Box>
            <Typography variant="body2"><Skeleton variant="text" width={100} height={20} /></Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FaAddressCard  style={{ marginRight: 8 }} />
              <Typography variant="subtitle2">Your Ip Addres:</Typography>
            </Box>
            <Typography variant="body2"><Skeleton variant="text" width={100} height={20} /></Typography>
          </Grid>
        </Grid>
        <Divider sx={{ width: '100%', marginY: 2}} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button startIcon={<FaArrowLeft/>} variant="variant" color="primary">Back Home</Button>
        </Box>
      </Box>
    </div>
  );
}

export default ProfileSkeleton;
