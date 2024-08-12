import React from 'react';
import { Button, Typography, Box, IconButton, Tooltip, Zoom, ListItem } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemImage = ({ imageUrl, title }) => (
  <Box sx={{ flexShrink: 0, mr: 2, width: 100, height: 100 }}>
    <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </Box>
);

const ItemContent = ({ title, description }) => (
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Typography variant="h6" component="div" noWrap>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
      {description}
    </Typography>
  </Box>
);

const ActionButtons = ({ clientWebsiteUrl, handleClickOpen, handleDelete, itemId }) => (
  <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
    <Button
      variant="outlined"
      size="small"
      startIcon={<LaunchIcon />}
      href={clientWebsiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ mr: 1 }}
    >
      Visit Site
    </Button>
    <Box>
      <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
        <IconButton color="primary" onClick={handleClickOpen} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
        <IconButton color="error" onClick={() => handleDelete(itemId)} size="small">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  </Box>
);

const ItemListView = ({ item, handleDelete, handleClickOpen }) => {
  return (
    <ListItem
      sx={{
        borderBottom: '1px solid #eee',
        opacity: item.isVisible ? 1 : 0.6,
        flexWrap: 'wrap',
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', mb: { xs: 2, sm: 0 } }}>
        <ItemImage imageUrl={item.imageUrl} title={item.title} />
        <ItemContent title={item.title} description={item.description} />
      </Box>
      <ActionButtons
        clientWebsiteUrl={item.clientWebsiteUrl}
        handleClickOpen={handleClickOpen}
        handleDelete={handleDelete}
        itemId={item.id}
      />
    </ListItem>
  );
};

export default ItemListView;
