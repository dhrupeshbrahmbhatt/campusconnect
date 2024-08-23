import React, { useState } from "react";

import { Avatar, Box, Button, Container, TextField, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import axios from "axios";
import { green } from "@mui/material/colors";
import Cookies from "universal-cookie";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#192D6E",
    },
    secondary: {
      main: green[500],
    }
  }
})


export const Login = () => {
    document.title = "Login"

    const [data, setData] = useState({
      email: "",
      password: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(`http://localhost:3000/login`, data);

          //Check if the response status is 200
          if(response.status === 200){
            
            //Extract the token from the res data
            const token = response.data;
            const Cookie = new Cookies(); 
            Cookie.set('Auth', token);

            // document.cookie = `Auth=${token}; Max-Age=3600; Secure`;


            //store the token in the browser's local storage
            //localStorage.setItem("Auth", token);
            //console.log(token);

            // Redirect after successful request
            window.location.href = "/";
            alert("welcome Back"); 
          }
        } catch (err) {
          console.error("Error occured during login", err);
        }
    }

    return (
        <>
              <ThemeProvider theme={defaultTheme}>
                <Container sx={{ my: "15px"}} maxWidth="md">
                  <form onSubmit={ e => handleSubmit(e)} className="mx-0" >
                    <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 2, py:4, mx:0 }}>
                      {/* <Avatar> 
                        <AdminPanelSettingsIcon fontSize="medium" color="primary"/>
                      </Avatar> */}
                      <Typography className="font-semibold text-[#192D6E]" variant="h4" sx={{ mt:3, mx:0 }}>
                        Login
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ mt:5, mx:0 }}>
                      <TextField variant="standard" label="Email" required name="email" type="email" value={data.email} onChange={ e => setData({...data, email: e.target.value})} autoComplete="True" />
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ mt:5, mx:0 }}>
                      <TextField variant="standard" label="Password" required name="password" type="password" value={data.password} onChange={ e => setData({...data, password: e.target.value})} autoComplete="True" />
                    </Typography>
                      <div className="flex justify-center">
                        <Button variant="cpmtaomed" sx={{ mt:5, bgcolor: "192D6E", px:4, py:1, mx:0 }} type="submit">
                          <span className="flex justify-center items-center">
                            Submit
                          </span>
                        </Button>
                      </div>
                      <Typography sx={{ mt:2 }}>
                        <a href="/signup" className="underline-none text-blue-500">Don't have an account? Signup </a>
                      </Typography>
                    </Box>
                  </form>
                </Container>
              </ThemeProvider>
        </>
    )
}