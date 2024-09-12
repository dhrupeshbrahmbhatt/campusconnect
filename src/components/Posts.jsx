import {React, useState} from "react";
import { green } from "@mui/material/colors";
import { createTheme} from '@mui/material/styles';
import { Box, Typography, Avatar, Button, IconButton, Card, CardContent, CardActions, Divider } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';


const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#192D6E",
      },
      secondary: {
        main: green[500],
      },
      background: {
        default: "#f9f9fc",
      },
    },
    typography: {
      fontFamily: 'Arial, sans-serif',
    },
  });

export const Posts_Component = ({ post }) => {
    return (
        <Card sx={{ margin: '20px 0', boxShadow: 3 }}>
          <CardContent>
            {/* Header */}
            <Box display='flex' alignItems='center' mb={2}> 
              <Avatar sx={{ marginRight: '10px'}}>{ post.user[0].toUpperCase()}</Avatar>
            </Box>
            <Box>
              <Typography variant="h6" >{post.user}</Typography>
              <Typography variant="caption" color='textSecondary'> {new Date(post.createdAt)} </Typography>
            </Box>
            {/* Post content */}
            <Typography variant="body1" gutterBottom>
              {post.content}
            </Typography>

            {/* Post media */}
            {
              post.media && (
                <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                  <img src={post.media} alt='post Media' style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                </Box>
              )
            }
            {/* Hashtags */}
            <Box sx={{ marginTop: '10px' }}>
              {
                post.hashtags && post.hashtags.map(( hashtag, index ) => {
                  <Typography key={index} variant="caption" color='primary' sx={{ marginRight: '5px' }}>
                    {hashtag}
                  </Typography>
                })
              }
            </Box>
          </CardContent>
            {/* Actions */}
            <CardActions>
              {/* Like button */}
              <IconButton aria-label='like'>
                <ThumbUpAltIcon />
                <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                  {post.likes.length} Likes
                </Typography>
              </IconButton>

              {/* Comment Button */}
              <IconButton aria-label="comment">
                <CommentIcon />
                <Typography variant="body2" sx={{ marginLeft: '5px' }}>
                  {post.comments.length} Comments
                </Typography>
              </IconButton>

              {/* Share Button */}
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

            </CardActions>

            {/* Comments section */}
            {post.comments.length > 0 && (
              <Box sx={{ padding: '10px 20px' }}>
                <Divider />
                {post.comments.map((comment, index) => (
                  <Box key={index} sx={{ marginTop: '10px' }}>
                    <Typography variant="subtitle2">{comment.user}</Typography>
                    <Typography variant="body2">{comment.content}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
        </Card>
    )
}