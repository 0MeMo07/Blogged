import React from 'react';
import { Button ,Skeleton, AppBar, Container, Toolbar, Typography, Box, IconButton  } from '@mui/material';

function NavBarSkeleton() {
  return (
    <AppBar position="fixed" style={{ backgroundColor:"rgba(0, 0, 0, 0.7)", backdropFilter:"blur(10px)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" aria-label="menu" color="inherit" sx={{ mr: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}>
          <Skeleton variant="text" width={100} height={30} sx={{ mr:2 }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ mr: 1 }}>
                <Skeleton variant="text" width={100} height={30} />
            </Button>
            <Button sx={{ mr: 1 }}>
              <Skeleton variant="text" width={50} height={30} />
            </Button>
            <Button sx={{ mr: 1 }}>
              <Skeleton variant="text" width={50} height={30} />
            </Button>
            <Button>
              <Skeleton variant="text" width={50} height={30} />
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Skeleton variant="circular" width={40} height={40} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarSkeleton;
