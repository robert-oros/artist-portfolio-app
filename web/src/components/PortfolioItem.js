import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Switch, FormControlLabel } from '@mui/material';
import ItemListView from './ItemListView';
import ItemGridView from './ItemGridView'
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

  const validateImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => reject('Invalid image URL. Please check the link.');
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });

    if (name === 'imageUrl') {
      if (value) {
        try {
          await validateImageUrl(value);
          setImagePreview(value);
          setImageError(null);
        } catch (error) {
          setImagePreview(null);
          setImageError(error);
        }
      } else {
        setImagePreview(null);
        setImageError(null);
      }
    }
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

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setEditedItem(prev => ({ ...prev, imageUrl: '' }));
  };

  const renderGridView = () => (
    <ItemGridView item={item} handleClickOpen={handleClickOpen} handleDelete={handleDelete} />
  );

  const renderListView = () => (
    <ItemListView item={item} handleClickOpen={handleClickOpen} handleDelete={handleDelete} />
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
          {(imagePreview || editedItem.imageUrl) && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRemoveImage}
              sx={{ mb: 2, ml: 2 }}
            >
              Remove Image
            </Button>
          )}
          
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

