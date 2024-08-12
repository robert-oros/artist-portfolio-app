import React, { useState, useEffect } from 'react';
import { Grid, Typography, Alert, Box, CircularProgress, Button, Dialog, DialogActions, Tooltip, DialogContent, DialogTitle, TextField, Fade, Fab, Zoom } from '@mui/material';
import axios from 'axios';
import PortfolioItem from './PortfolioItem';
import AddIcon from '@mui/icons-material/Add';

const API_BASE_URL = 'http://localhost:3000';

const initialItemState = {
  title: '',
  description: '',
  imageUrl: '',
  clientWebsiteUrl: '',
  isVisible: true,
};

const PortfolioList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newItem, setNewItem] = useState(initialItemState);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio`);
      setItems(response.data);
      setError(null);
    } catch (err) {
      handleError(err, 'Unable to fetch portfolio items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err, message) => {
    console.error(message, err);
    setError(message);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/portfolio/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      handleError(err, 'Unable to delete portfolio item. Please try again later.');
    }
  };

  const handleEdit = async (editedItem) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/portfolio/${editedItem.id}`, editedItem);
      setItems((prevItems) => prevItems.map((item) => item.id === editedItem.id ? response.data : item));
      setError(null);
    } catch (err) {
      handleError(err, 'Unable to update portfolio item. Please try again later.');
    }
  };

  const handleAddItem = async () => {
    try {
      let imagePath = newItem.imageUrl;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadResponse = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imagePath = uploadResponse.data;
      }
      
      const response = await axios.post(`${API_BASE_URL}/portfolio`, {
        ...newItem,
        imageUrl: API_BASE_URL + "/" + imagePath.path,
      });

      setItems((prevItems) => [...prevItems, response.data]);
      resetForm();
    } catch (err) {
      handleError(err, 'Unable to add portfolio item. Please try again later.');
    }
  };

  const resetForm = () => {
    setNewItem(initialItemState);
    setImageFile(null);
    setImagePreview(null);
    setOpenAddDialog(false);
    setError(null);
    setImageError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
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
      setNewItem(prev => ({ ...prev, imageUrl: '' }));
      setImageError(null);
      
      // Create a preview of the selected image
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" variant="filled" sx={{ mt: 2 }}>{error}</Alert>;
  }

  return (
    <Box sx={{ py: 6, px: 2, position: 'relative' }}>
      {items.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="text.secondary" mt={4}>
          No portfolio items found. Start by adding a new item!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Fade in={true} timeout={500 * (index + 1)} key={item.id}>
              <Grid item xs={12} sm={6} md={4}>
                <PortfolioItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}

      <Zoom in={true}>
        <Tooltip title="Add Item" arrow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setOpenAddDialog(true)}
            sx={{ position: 'fixed', bottom: 37, right: 37 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Zoom>

      <Dialog open={openAddDialog} onClose={resetForm} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>Add New Portfolio Item</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {['title', 'description', 'clientWebsiteUrl'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
              type="text"
              fullWidth
              variant="outlined"
              value={newItem[field]}
              onChange={handleInputChange}
              multiline={field === 'description'}
              rows={field === 'description' ? 4 : 1}
              sx={{ mb: 2 }}
            />
          ))}

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image-file"
            type="file"
            onChange={handleImageFileChange}
          />
          <label htmlFor="upload-image-file">
            <Button
              variant="contained"
              component="span"
              sx={{ mb: 2 }}
              disabled={newItem.imageUrl !== ''}>
              Upload Image
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
            value={newItem.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            disabled={imageFile !== null}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={resetForm} color="inherit">Cancel</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary" disabled={imageError !== null}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioList;

