import React from 'react';
import {
    Typography,
    Box,
    Tooltip,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Zoom
  } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const IconButtonWithTooltip = ({ title, color, onClick, icon, sx = {} }) => (
  <Tooltip title={title} TransitionComponent={Zoom} arrow>
    <IconButton
      color={color}
      onClick={onClick}
      sx={{
        '&:hover': {
          backgroundColor: `${color}.light`,
        },
        ...sx
      }}
    >
      {icon}
    </IconButton>
  </Tooltip>
);

const CardImage = ({ imageUrl, title }) => (
  <CardMedia
    component="img"
    height="260"
    image={imageUrl}
    alt={title}
    sx={{ objectFit: 'cover' }}
  />
);

const CardTitle = ({ title }) => (
  <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
    {title}
  </Typography>
);

const CardDescription = ({ description }) => (
  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
    {description}
  </Typography>
);

const ActionButtons = ({ clientWebsiteUrl, handleClickOpen, handleDelete, itemId }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
    <IconButtonWithTooltip
      title="Visit Site"
      color="primary"
      onClick={() => window.open(clientWebsiteUrl, '_blank', 'noopener,noreferrer')}
      icon={<LaunchIcon />}
    />
    <Box>
      <IconButtonWithTooltip
        title="Edit"
        color="primary"
        onClick={handleClickOpen}
        icon={<EditIcon />}
        sx={{ mr: 1 }}
      />
      <IconButtonWithTooltip
        title="Delete"
        color="error"
        onClick={() => handleDelete(itemId)}
        icon={<DeleteIcon />}
      />
    </Box>
  </Box>
);

const ItemGridView = ({ item, handleDelete, handleClickOpen }) => {
  const cardSx = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
    },
    opacity: item.isVisible ? 1 : 0.6,
  };

  return (
    <Card elevation={3} sx={cardSx}>
      <CardImage imageUrl={item.imageUrl} title={item.title} />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <CardTitle title={item.title} />
          <CardDescription description={item.description} />
        </Box>
        <ActionButtons
          clientWebsiteUrl={item.clientWebsiteUrl}
          handleClickOpen={handleClickOpen}
          handleDelete={handleDelete}
          itemId={item.id}
        />
      </CardContent>
    </Card>
  );
};

export default ItemGridView;

