import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function MessageArea({ messages, onSendMessage, currentUser, otherUser }) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const getAllMessages = () => {
    // Filter out duplicate messages based on message ID
    const uniqueMessages = messages.filter((message, index, self) =>
      index === self.findIndex((m) => m.id === message.id)
    );
    
    return uniqueMessages.map(message => ({
      ...message,
      isSender: message.from === currentUser
    }));
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {getAllMessages().map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.isSender ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                backgroundColor: message.isSender ? '#1976d2' : '#f5f5f5',
                color: message.isSender ? 'white' : 'black',
                maxWidth: '70%',
                borderRadius: 2
              }}
            >
              <Typography>{message.text}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {message.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      <Paper sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Message ${otherUser}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{ mr: 1 }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            sx={{ backgroundColor: '#1976d2', color: 'white', '&:hover': { backgroundColor: '#1565c0' } }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default MessageArea;