import React from 'react';
import {Typography, Container, Box, List, ListItem, Divider } from '@mui/material';

const chats= [
    { id:1, name: 'GC1', lastMesage: 'Heythere'},
    { id:2, name: 'GC2', lastMesage: 'what is up'},
    { id:3, name: 'GC3', lastMesage: 'Meting at 5'},
    { id:4, name: 'GC4', lastMesage: 'Hy bro'}
]

export const Message = () => {
    return (
        <Box
        sx={{
            display: 'flex',
            height: '100vh',
            backgroundColor: '#f9f9fc',
            padding: '0px'
        }}
        >
            <Box
                sx={{
                    flex: "1 1 0",              // Takes 1/3 of the space
                    backgroundColor: "#f9f9fc",   // Optional background color for the box
                    padding: "20px",            // Padding inside the box
                    borderRadius: "10px",       // Rounded corners
                    marginRight: "20px",        // Space between left and right sides
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow
                    overflowY: "auto",          // Scrollable if content overflows
                }}>
                <Typography variant="h6" gutterBottom>
                    Chats
                </Typography> 
                <List>
                    {chats.map(chat => (
                    <React.Fragment key={chat.id}>
                        <ListItem button>
                        <Typography variant="body1">{chat.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {chat.lastMesage}
                        </Typography>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                    ))}
                </List>              
            </Box>
            <Box
                sx={{
                    flex: "2 1 0",             // Takes 2/3 of the space
                    backgroundColor: "#f9f9fc",  // Optional background color for the box
                    padding: "20px",           // Padding inside the box
                    // borderRadius: "10px",     
                    overflowY: "auto",         // Scrollable if content overflows
                }}
                >
                <Typography variant="h6" gutterBottom>
                    Active Group Chat
                </Typography>
                {/* Chat content goes here */}
                <Box sx={{ height: "400px", overflowY: "auto", marginTop: "20px" }}>
                    <Typography variant="body1">
                    [Chat messages will be displayed here]
                    </Typography>
                </Box>
            </Box>

            
        </Box>
    )
}