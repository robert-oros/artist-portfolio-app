import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Zoom, Switch, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';

const PortfolioItem = ({ item, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [newImage, setNewImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedItem({ ...item });
    setNewImage(null);
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setNewImage(e.target.files[0]);
    } else if (e.target.name === 'isVisible') {
      setEditedItem({ ...editedItem, isVisible: e.target.checked });
    } else {
      setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(editedItem).forEach(key => formData.append(key, editedItem[key]));
    if (newImage) {
      formData.append('image', newImage);
    }
    handleEdit(formData);
    setOpen(false);
  };

  return (
    <Card 
    elevation={3}
    sx={{
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
      }}>
      <CardMedia
        component="img"
        height="260"
        image={item.imageUrl}
        alt={item.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
            {item.description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Tooltip title="Visit Site" TransitionComponent={Zoom} arrow>
            <IconButton 
              color="primary"
              href={item.clientWebsiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}>
              <LaunchIcon />
            </IconButton>
          </Tooltip>
          <Box>
            <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
              <IconButton
                color="primary"
                onClick={handleClickOpen}
                sx={{
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
              <IconButton
                color="error"
                onClick={() => handleDelete(item.id)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'error.light',
                  },
                }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>Edit Portfolio Item</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editedItem.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={editedItem.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editedItem.imageUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <input
            accept="image/*"
            type="file"
            name="image"
            onChange={handleChange}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            name="clientWebsiteUrl"
            label="Client Website URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editedItem.clientWebsiteUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={editedItem.isVisible}
                onChange={handleChange}
                name="isVisible"
              />
            }
            label="Visible"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PortfolioItem;