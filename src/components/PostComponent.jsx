import {React, useState} from 'react';
import { Box, Typography, Avatar, Paper, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Custom theme
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
export const Posts = () => {
        // State to handle posts and modal visibility
    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [postDetails, setPostDetails] = useState({ title: "", content: "" });

    // Function to handle opening the modal
    const handleOpen = () => setOpen(true);

    // Function to handle closing the modal
    const handleClose = () => setOpen(false);

    // Function to handle form submission
    const handleSubmit = () => {
        setPosts([...posts, postDetails]);
        setPostDetails({ title: "", content: "" });
        handleClose();
    };
    return (
        <Container sx={{ margin: '0', padding: '0' }}>
      <Box sx={{ backgroundColor: defaultTheme.palette.background.default, padding: "20px", display: 'flex', justifyContent: 'space-around', minHeight: '100vh' }}>
        {/* Left Sidebar */}
        <Box sx={{ width: '20%', backgroundColor: '#F0F0F6', padding: "10px", borderRadius: '15px'}}>
          <Paper elevation={3} sx={{ padding: '10px 10px 250px', textAlign: 'center', marginBottom: '20px' }}>
            <Avatar sx={{ bgcolor: '#4849A1', margin: 'auto', width: 56, height: 56 }} />
            <Typography variant="h6" sx={{ mt: 2 }}>Demo Name</Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Recents</Typography>
          </Paper>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: '50%', backgroundColor: '#F0F0F6', padding: "10px", borderRadius: '8px' }}>
          <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>This is first post about my job.</Typography>
            </Box>
            <Typography variant="body2">#job #firstday #new</Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>This is first post about my job.</Typography>
            </Box>
            <Typography variant="body2">#job #firstday #new</Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>This is first post about my job.</Typography>
            </Box>
            <Typography variant="body2">#job #firstday #new</Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>This is first post about my job.</Typography>
            </Box>
            <Typography variant="body2">#job #firstday #new</Typography>
          </Paper>
          <Paper elevation={3} sx={{ padding: '10px', marginBottom: '20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar sx={{ bgcolor: '#4849A1', width: 40, height: 40, marginRight: '10px' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>This is first post about my job.</Typography>
            </Box>
            <Typography variant="body2">#job #firstday #new</Typography>
          </Paper>

        </Box>

        {/* Right Sidebar */}
        <Box sx={{ width: '20%', backgroundColor: '#F0F0F6', padding: "10px", borderRadius: '8px' }}>
          <Paper elevation={3} sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Latest News</Typography>
          </Paper>
        </Box>
      </Box>
        </Container>
    )
};