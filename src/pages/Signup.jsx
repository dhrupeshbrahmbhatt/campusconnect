import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion'; // for animations
import axios from 'axios';

// Custom theme setup with new color scheme
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#27245f', // Accent color
    },
    background: {
      default: '#FFFFFF', // Dominant white shade for the background
      paper: '#F5F5F5',   // Lighter white shades
    },
    secondary: {
      main: '#E5E5E5', // Natural tones for form and text fields
    },
    text: {
      primary: '#333333', // Dark grey for readability
      secondary: '#27245f', // Accent for important text
    },
  },
});

export function Signup({ isDarkMode }) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data); // Handle form data
    await axios.post('http://localhost:3000/signup', data).then((res)=> {
      if (res.status === 200) {
        window.location.href = "/"
        alert("Welcome!");
      } else {
        alert("Invalid credentials, please try again.");
      }
    });
    console.log(data); // Handle form data
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Grid container>
          {/* Left Side: Display Website Content */}
          <Grid item xs={12} md={6} className="hidden md:flex items-center justify-center bg-secondary-main">
            <div className="p-8">
              <Typography variant="h4" className="text-primary-main mb-4">
                Welcome to CampusConnect!
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Experience seamless communication and networking with our innovative features.
              </Typography>
            </div>
          </Grid>

          {/* Right Side: Signup Form */}
          <Grid item xs={12} md={6} className="flex items-center justify-center bg-background-default">
            {/* Animated signup form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }}
              className="p-8 w-full max-w-md border border-gray-300 shadow-lg rounded-lg"
            >
              <Typography variant="h5" className="text-primary-main mb-6">
                Create Your Account
              </Typography>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* First Name */}
                <TextField 
                  label="First Name" 
                  name="firstName"
                  variant="standard" 
                  fullWidth 
                  value={data.firstName}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#27245f' }, // Accent color for the label
                  }}
                />
                {/* Last Name */}
                <TextField 
                  label="Last Name" 
                  name="lastName"
                  variant="standard" 
                  fullWidth 
                  value={data.lastName}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#27245f' }, // Accent color for the label
                  }}
                />
                {/* Email */}
                <TextField 
                  label="Email Address" 
                  name="email"
                  variant="standard" 
                  fullWidth 
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#27245f' }, // Accent color for the label
                  }}
                />
                {/* Password */}
                <TextField 
                  label="Password" 
                  name="password"
                  variant="standard" 
                  fullWidth 
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#27245f' }, // Accent color for the label
                  }}
                />
                {/* Confirm Password */}
                <TextField 
                  label="Phone Number." 
                  name="phoneNumber"
                  variant="standard" 
                  fullWidth 
                  type="password"
                  value={data.phoneNumber}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { color: '#27245f' }, // Accent color for the label
                  }}
                />
                {/* Signup Button */}
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  className="text-white hover:bg-primary-dark"
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>

              <Typography variant="body2" className="text-gray-600 mt-4">
                Already have an account? <a href="signin" className="text-primary-main">Sign In</a>
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
