import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, Box } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";

// Icons
import { IoMailOpenOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { LiaDonateSolid } from "react-icons/lia";
import { Message } from '../components/MessageComponent';
import { Posts } from "../components/PostComponent";
import Cookies from "universal-cookie";

// Example components to render
const MessagesComponent = () => < Message />;
const PostsComponent = () => < Posts />;
const CalendarComponent = () => <div>Calendar Content</div>;
const DonationsComponent = () => <div>Donations/Sponsership Content</div>;

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#192D6E",
    },
    secondary: {
      main: green[500],
    },
  },
});

export const Home = () => {
  const [activeComponent, setActiveComponent] = useState("messages");
  const token = document.cookie;

  const check_Auth = async () => {
    console.log(token)
    try {
        const req = await axios.get("http://localhost:3000/profile", {
            headers: {
                Authorization: "Brarer " + token,
                'Content-Type': 'application/json',
            }
        });
        if (req.data === 'Access denied') {
            //window.location = "http://localhost:5173/login";
        }
    } catch (err) {
      alert("Not found")
        //window.location = "http://localhost:5173/notfound";
    }
}

  useEffect(() => {
    check_Auth();
  })

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "messages":
        return <MessagesComponent />;
      case "posts":
        return <PostsComponent />;
      case "calendar":
        return <CalendarComponent />;
      case "donations":
        return <DonationsComponent />;
      default:
        return <PostsComponent />;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: "70px",
            backgroundColor: "#4849A1",
            display: "flex",
            color: 'white',
            fontSize: '45px',
            fontWeight: 'bold',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "25px",
          }}     
        >
          <IoMailOpenOutline onClick={() => setActiveComponent("messages")} />
          <BiMessageDetail onClick={() => setActiveComponent("posts")} />
          <SlCalender onClick={() => setActiveComponent("calendar")} />
          <LiaDonateSolid onClick={() => setActiveComponent("donations")} />
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            padding: "20px",
            backgroundColor: "#f9f9fc", // Light background for contrast
          }}
        >
          {renderComponent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
