import React from 'react';
import { Card, Grid ,CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';


const BlogPreviewCard = ({ trimmedTitle, trimmedContent, editImageUrl }) => {
    return (
        <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex', borderRadius: "0", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} className='BlogCart'>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            {trimmedTitle || 'Title'}
                        </Typography>
                        <Typography variant="subtitle1" color="gray">
                            {trimmedContent || 'Content'}
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
                    image={editImageUrl}
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
                    image={editImageUrl}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    </Grid>
    );
};

export default BlogPreviewCard;
