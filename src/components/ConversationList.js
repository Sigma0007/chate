import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';

function ConversationList({ onSelectConversation, selectedConversation, users, currentUser }) {
  const getLastMessage = (userName) => {
    const currentUserData = users.find(u => u.name === currentUser);
    if (!currentUserData || !currentUserData.messages) return 'No messages';
    
    const lastMessage = currentUserData.messages
      .filter(msg => (msg.from === currentUser && msg.to === userName) || 
                    (msg.from === userName && msg.to === currentUser))
      .pop();
    
    return lastMessage ? lastMessage.text : 'No messages yet';
  };

  const conversations = users
    .filter(user => user.name !== currentUser)
    .map(user => ({
      id: user.id,
      name: user.name,
      lastMessage: getLastMessage(user.name)
    }));

  return (
    <List sx={{ height: '100%', overflowY: 'auto' }}>
      {conversations.map((conversation) => (
        <ListItem
          key={conversation.id}
          button
          selected={selectedConversation?.id === conversation.id}
          onClick={() => onSelectConversation(conversation)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: '#128C7E' }}>
              {conversation.name[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={conversation.name}
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {conversation.lastMessage}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ConversationList;