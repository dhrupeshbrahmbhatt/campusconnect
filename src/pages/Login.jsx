import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion'; // for animations
import axios from 'axios';
import Cookies from 'universal-cookie';


// Custom theme setup
const customTheme = createTheme({
  palette: {
    primary: {
      main: '#27245f', // Accent color (10%)
    },
    background: {
      default: '#f9f9f9', // 60% white shades
      paper: '#e5e5e5',   // 30% natural tones
    },
    text: {
      primary: '#333333',  // Dark grey for text
    },
  },
});

export function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', data);

      if( res.status === 200){
        const token = res.data;
        const Cookie = new Cookies();
        Cookie.set('Auth', token);
        window.location.href = "http://localhost:5173/"
        alert("Welcome Back!");
        return null;
      }
    } catch (err) {
      alert("Invalid Credentials!")
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Grid container justifyContent="center" alignItems="center" className="min-h-screen">
          {/* Centered Signup Form */}
          <Grid item xs={12} md={6} className="flex items-center justify-center bg-gray-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }}
              className="p-8 w-full max-w-md border border-gray-300 shadow-lg rounded-lg"
            >
              <Typography variant="h5" className="text-gray-800 mb-6">
                Sign In
              </Typography>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email */}
                <TextField 
                  label="Email Address" 
                  name="email"
                  variant="outlined" 
                  fullWidth 
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  className="bg-white"
                />
                {/* Password */}
                <TextField 
                  label="Password" 
                  name="password"
                  variant="outlined" 
                  fullWidth 
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  className="bg-white"
                />
                {/* Sign In Button */}
                <Button 
                  variant="contained" 
                  fullWidth 
                  className="bg-[#27245f] text-white hover:bg-[#1f1b4b]"
                  type="submit"
                >
                  Sign In
                </Button>
                <Typography variant="p" className="text-gray-800 mb-6">
                <a href="/signup"> Dont have an account? Sign Up</a>
              </Typography>
              </form>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
