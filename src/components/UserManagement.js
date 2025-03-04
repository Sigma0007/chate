import React, { useState } from 'react';
import { 
  Box, Typography, Paper, List, ListItem,
  ListItemText, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, ListItemSecondaryAction, Snackbar, Grid, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConversationList from './ConversationList';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  const navigate = useNavigate();
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatView, setChatView] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'india', email: 'india@example.com', messages: [] },
    { id: 2, name: 'japan', email: 'japan@example.com', messages: [] },
    { id: 3, name: 'aus', email: 'aus@example.com', messages: [] }
  ]);
  const [messageText, setMessageText] = useState('');

  const ChatView = ({ currentUser }) => (
    <>
      <Box sx={{ 
        p: 2, 
        backgroundColor: '#008069', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <IconButton onClick={() => setSelectedChat(null)} sx={{ color: 'white' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">{selectedChat}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, backgroundColor: '#e4e4e4' }}>
        {users.find(u => u.name === currentUser || u.name === selectedChat)?.messages
          .filter(msg => 
            (msg.from === currentUser && msg.to === selectedChat) || 
            (msg.from === selectedChat && msg.to === currentUser)
          )
          .map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: message.from === currentUser ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Paper sx={{
                p: 1,
                px: 2,
                maxWidth: '70%',
                backgroundColor: message.from === currentUser ? '#dcf8c6' : '#fff',
                borderRadius: 2
              }}>
                <Typography>{message.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {message.timestamp}
                </Typography>
              </Paper>
            </Box>
          ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: '#f0f0f0' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <input
            fullWidth
            size="small"
            placeholder="Type a message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(currentUser, selectedChat)}
          />
          <IconButton 
            onClick={() => handleSendMessage( selectedChat)}
            sx={{ backgroundColor: '#128C7E', color: 'white', '&:hover': { backgroundColor: '#075E54' } }}
          >
            <MessageIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );

  // Fix the component name casing in UserDashboard
  const UserDashboard = () => (
    <Box sx={{ p: 3, height: '100vh', backgroundColor: '#f0f2f5' }}>
      {!selectedDashboard ? (
        <Grid container spacing={3}>
          {users.map(user => (
            <Grid item xs={4} key={user.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
                onClick={() => setSelectedDashboard(user.name)}
              >
                <Avatar sx={{ width: 60, height: 60, margin: '0 auto', bgcolor: '#128C7E' }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>{user.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => setSelectedDashboard(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">Dashboard: {selectedDashboard}</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ borderRadius: 2, height: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {selectedChat ? (
                  <ChatView currentUser={selectedDashboard} />
                ) : (
                  <List>
                    {users.filter(user => user.name !== selectedDashboard).map(user => (
                      <ListItem 
                        key={user.id}
                        button
                        onClick={() => setSelectedChat(user.name)}
                      >
                        <Avatar sx={{ bgcolor: '#128C7E', mr: 2 }}>
                          {user.name[0].toUpperCase()}
                        </Avatar>
                        <ListItemText primary={user.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
  // Add the handleSendMessage function
  const handleSendMessage = (fromUser, toUser) => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        from: fromUser,
        to: toUser,
        timestamp: new Date().toLocaleTimeString()
      };

      setUsers(users.map(user => {
        if (user.name === fromUser || user.name === toUser) {
          return {
            ...user,
            messages: [...user.messages, newMessage]
          };
        }
        return user;
      }));
      setMessageText('');
    }
  };
  return <UserDashboard />;
}

export default UserManagement;
