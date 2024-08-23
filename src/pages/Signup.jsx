import React, { useState } from "react";
import axios from "axios";
import { Avatar, Container, TextField, ThemeProvider, Typography, Box, createTheme, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { AdminPanelSettings } from "@mui/icons-material";

const defaultTheme = createTheme({
    paletts: {
        primary: {
            main: "#192D6E",
        },
        secondary: {
            main: green[500],
        },
    },
})

export const Signup = () => {
    document.title = "Signup"
    const [data, setData] = useState({
        // name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/register', data).then( (req) => {
            if(req.status === 200){
                window.location.href="/";
                alert("Welcome to Our App!");
            } else {
                alert("Check your credentials..")
            }
        })
    }
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container sx={{ my: "15px" }} maxWidth="md">
                    <form onSubmit={ e => handleSubmit(e)} className="mx-0">
                        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", boxShadow: 2, py:4, mx:0 }} >
                            <Avatar>
                                <AdminPanelSettings fontSize="medium" color="primary" />
                            </Avatar>
                            <Typography className="font-semibold text-[#192D6E]" variant="h4" >
                                Sign up
                            </Typography>
                            {/* <Typography variant="body2" component="div" sx={{ mt:5, mx:0 }}>
                                <TextField variant="standard" label="Name" required name="name" value={data.name} onChange={ e => setData({...data, name:e.target.value})} />
                            </Typography> */}
                            <Typography variant="body2" component="div" sx={{ mt:5, mx:0 }}>
                                <TextField  variant="standard" label="Email" required type="email" value={data.email} onChange={ e => setData({...data, email:e.target.value})} />
                            </Typography>
                            <Typography variant="body2" component="div" sx={{ mt:5, mx:0 }}>
                                <TextField  variant="standard" label="Password" required type="password" value={data.password} onChange={ e => setData({...data, password:e.target.value})} />
                            </Typography>
                            <div className="flex justify-center">
                                <Button variant="contained" sx={{ mt:5, bgcolor: "192D6E", px:4, py:1, mx:0 }} type="submit"> 
                                    <span className="flex justify-center items-center">
                                        Submit
                                    </span>
                                </Button>
                            </div>
                            <Typography sx={{ mt:3 }}>
                                <a href="/login" className="underline-none text-blue-500">
                                    Already have an account ? Login
                                </a>
                            </Typography>
                        </Box>
                    </form>
                </Container>
            </ThemeProvider>
        </>
    )
}