import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, List, ListItem, Divider } from '@mui/material';
import axios from 'axios'; // For API calls

export const Message = () => {
  // State for chats and messages
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch chats from API when the component mounts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('/chats'); // Assume this API returns a list of chats
        setChats(res.data);
      } catch (err) {
        console.error('Error fetching chats:', err);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages for the selected chat
  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`/chats/${chatId}/messages`); // Fetch messages for a specific chat
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Handle when a chat is clicked
  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
    fetchMessages(chatId); // Fetch messages for this chat
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f9f9fc',
        padding: '0px'
      }}
    >
      {/* Left Side: Chats List */}
      <Box
        sx={{
          flex: "1 1 0",
          backgroundColor: "#f9f9fc",
          padding: "20px",
          borderRadius: "10px",
          marginRight: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Chats
        </Typography>
        <List>
          {chats.map(chat => (
            <React.Fragment key={chat.id}>
              <ListItem button onClick={() => handleChatClick(chat.id)}>
                <Typography variant="body1">{chat.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {chat.lastMessage} {/* Assuming lastMessage is part of chat data */}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Right Side: Messages */}
      <Box
        sx={{
          flex: "2 1 0",
          backgroundColor: "#f9f9fc",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedChatId ? 'Active Group Chat' : 'Select a Chat'}
        </Typography>
        <Box sx={{ height: "400px", overflowY: "auto", marginTop: "20px" }}>
          {selectedChatId ? (
            messages.length > 0 ? (
              messages.map((message, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {message.text} {/* Assuming each message has a 'text' property */}
                </Typography>
              ))
            ) : (
              <Typography variant="body1">No messages yet.</Typography>
            )
          ) : (
            <Typography variant="body1">Please select a chat to view messages.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
