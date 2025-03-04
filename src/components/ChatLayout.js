import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, AppBar, Toolbar, Typography, IconButton, Badge, Avatar } from '@mui/material';
import ConversationList from './ConversationList';
import MessageArea from './MessageArea';
import NotificationsIcon from '@mui/icons-material/Notifications';

function ChatLayout() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'india', messages: [] },
    { id: 2, name: 'japan', messages: [] }
  ]);

  const handleSendMessage = (from, to, text) => {
    if (text.trim()) {
      const newMessage = {
        id: Date.now(),
        text: text,
        from: from,
        to: to,
        timestamp: new Date().toLocaleTimeString()
      };
    // Store message in both users' message arrays
    setUsers(prevUsers => prevUsers.map(user => ({
      ...user,
      messages: [...user.messages, newMessage]
    })));
  }
};

const getFilteredMessages = (user) => {
  const allMessages = users.flatMap(u => u.messages);
  return allMessages.filter(msg => 
    msg.from === user || msg.to === user
  );
};
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Chat Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container sx={{ flexGrow: 1, overflow: 'hidden', p: 2, gap: 2 }}>
        {/* India's Dashboard */}
        <Grid item xs={5.9}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ backgroundColor: '#128C7E' }}>
              <Toolbar>
                <Avatar sx={{ mr: 2 }}>I</Avatar>
                <Typography variant="h6">India's Dashboard</Typography>
              </Toolbar>
            </AppBar>
            <MessageArea
              messages={getFilteredMessages('india')}
              onSendMessage={(text) => handleSendMessage('india', 'japan', text)}
              currentUser="india"
              otherUser="japan"
            />
          </Paper>
        </Grid>

        {/* Japan's Dashboard */}
        <Grid item xs={5.9}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ backgroundColor: '#128C7E' }}>
              <Toolbar>
                <Avatar sx={{ mr: 2 }}>J</Avatar>
                <Typography variant="h6">Japan's Dashboard</Typography>
              </Toolbar>
            </AppBar>
            <MessageArea
              messages={getFilteredMessages('japan')}
              onSendMessage={(text) => handleSendMessage('japan', 'india', text)}
              currentUser="japan"
              otherUser="india"
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
export default ChatLayout;