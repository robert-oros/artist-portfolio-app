import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Zoom, Alert, Switch, FormControlLabel, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const PortfolioItem = ({ item, handleDelete, handleEdit, viewMode }) => {
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setImagePreview(item.imageUrl);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedItem({ ...item });
    setImageFile(null);
    setImagePreview(item.imageUrl);
    setImageError(null);
  };

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleVisibilityChange = (e) => {
    setEditedItem({ ...editedItem, isVisible: e.target.checked });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setImageError('Please upload an image file.');
        setImageFile(null);
        setImagePreview(null);
        return;
      }

      setImageFile(file);
      setEditedItem(prev => ({ ...prev, imageUrl: '' }));
      setImageError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
      setImageError(null);
    }
  };

  const handleSubmit = async () => {
    try {
      let imagePath = editedItem.imageUrl;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imagePath = API_BASE_URL + "/" + uploadResponse.data.path;
      }
      
      const updatedItem = {
        ...editedItem,
        imageUrl: imagePath,
      };

      handleEdit(updatedItem);
      setOpen(false);
    } catch (err) {
      console.error('Error updating portfolio item:', err);
      setImageError('Unable to update portfolio item. Please try again later.');
    }
  };

  const renderGridView = () => (
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
        opacity: item.isVisible ? 1 : 0.6,
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
    </Card>
  );

  const renderListView = () => (
    <ListItem
      sx={{
        borderBottom: '1px solid #eee',
        opacity: item.isVisible ? 1 : 0.6,
        flexWrap: 'wrap',
        py: 2,
      }}>
      <Box sx={{ display: 'flex', width: '100%', mb: { xs: 2, sm: 0 } }}>
        <Box sx={{ flexShrink: 0, mr: 2, width: 100, height: 100 }}>
          <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" component="div" noWrap>
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {item.description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LaunchIcon />}
          href={item.clientWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mr: 1 }}>
          Visit Site
        </Button>
        <Box>
          <Tooltip title="Edit" TransitionComponent={Zoom} arrow>
            <IconButton color="primary" onClick={handleClickOpen} size="small">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" TransitionComponent={Zoom} arrow>
            <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </ListItem>
  );

  return (
    <>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
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
            name="clientWebsiteUrl"
            label="Client Website URL"
            type="text"
            fullWidth
            variant="outlined"
            value={editedItem.clientWebsiteUrl}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="edit-upload-image-file"
            type="file"
            onChange={handleImageFileChange}
          />
          <label htmlFor="edit-upload-image-file">
            <Button
              variant="contained"
              component="span"
              sx={{ mb: 2 }}
              disabled={editedItem.imageUrl !== '' && !imageFile}>
              Upload New Image
            </Button>
          </label>

          {imageError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{imageError}</Alert>
          )}

          {imagePreview && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Image Preview:</Typography>
              <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
          )}

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
            disabled={imageFile !== null}
          />

          <FormControlLabel
            control={
              <Switch
                checked={editedItem.isVisible}
                onChange={handleVisibilityChange}
                name="isVisible"
                color="primary"
              />
            }
            label="Visible"
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={imageError !== null}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PortfolioItem;

