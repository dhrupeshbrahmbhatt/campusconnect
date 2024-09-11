import {React, useState} from "react";
import { green } from "@mui/material/colors";
import { createTheme} from '@mui/material/styles';
import { Paper, Box, Typography, Avatar } from "@mui/material";

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

export const Post_temp = (props) => {
    const [posts, setPosts] = useState([]);
    const [postDetails, setPostDetails] = useState([]);
    
    return (
        <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} src={props.ProfileImage} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{props.postTitle}</Typography>
            </Box>
            <Typography variant="body2">{props.postContent}</Typography>
      </Paper>
    )

}