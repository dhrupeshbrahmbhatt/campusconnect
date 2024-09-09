import React, { useState } from 'react';
import { Typography, Box, List, ListItem, Divider } from '@mui/material';

export const Message = () => {
  // Hardcoded chat and message data for testing
  const chats = [
    { id: 1, name: 'GC1', lastMessage: 'Hey there' },
    { id: 2, name: 'GC2', lastMessage: 'What is up?' },
    { id: 3, name: 'GC3', lastMessage: 'Meeting at 5' },
    { id: 4, name: 'GC4', lastMessage: 'Hey bro' }
  ];

  const messagesData = {
    1: [
      { text: 'Hey there' },
      { text: 'How are you?' },
      { text: 'All good!' }
    ],
    2: [
      { text: 'What is up?' },
      { text: 'Not much, just working' }
    ],
    3: [
      { text: 'Meeting at 5' },
      { text: 'Got it, see you there' }
    ],
    4: [
      { text: 'Hey bro' },
      { text: 'Long time no see!' }
    ]
  };

  // State for selected chat and messages
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // Handle when a chat is clicked
  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
    setMessages(messagesData[chatId] || []);
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
                  {chat.lastMessage}
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
          {selectedChatId ? `Active Group Chat: ${chats.find(chat => chat.id === selectedChatId)?.name}` : 'Select a Chat'}
        </Typography>
        <Box sx={{ height: "400px", overflowY: "auto", marginTop: "20px" }}>
          {selectedChatId ? (
            messages.length > 0 ? (
              messages.map((message, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {message.text}
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
