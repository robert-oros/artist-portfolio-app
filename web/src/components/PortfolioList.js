import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  Tooltip,
  DialogContent,
  DialogTitle,
  TextField,
  Fade,
  Fab,
  Zoom,
  Switch,
  FormControlLabel,
  List,
  ListItem
} from '@mui/material';
import axios from 'axios';
import PortfolioItem from './PortfolioItem';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

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
  const [showHidden, setShowHidden] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

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
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setError(null);
    } catch (err) {
      handleError(err, 'Unable to delete portfolio item. Please try again later.');
    }
  };

  const handleEdit = async (editedItem) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/portfolio/${editedItem.id}`, editedItem);
      setItems(prevItems => prevItems.map(item => item.id === editedItem.id ? response.data : item));
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
        imagePath = uploadResponse.data.path;
      }
      
      const response = await axios.post(`${API_BASE_URL}/portfolio`, {
        ...newItem,
        imageUrl: imagePath ? API_BASE_URL + "/" + imagePath : newItem.imageUrl,
      });

      setItems(prevItems => [...prevItems, response.data]);
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

  const validateImageUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => reject('Invalid image URL. Please check the link.');
    });
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));

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
    setNewItem(prev => ({ ...prev, isVisible: e.target.checked }));
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

  const toggleShowHidden = () => {
    setShowHidden(prev => !prev);
  };

  const toggleViewMode = () => {
    setViewMode(prevMode => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setNewItem(prev => ({ ...prev, imageUrl: '' }));
  };

  const filteredItems = showHidden ? items : items.filter(item => item.isVisible);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">Portfolio Items</Typography>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={showHidden}
                onChange={toggleShowHidden}
                name="showHidden"
                color="primary"
              />
            }
            label="Show Hidden Items"
          />
          <Tooltip title={viewMode === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}>
            <Button onClick={toggleViewMode} startIcon={viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}>
              {viewMode === 'grid' ? 'List' : 'Grid'}
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {filteredItems.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="text.secondary" mt={4}>
          No portfolio items found. Start by adding a new item!
        </Typography>
      ) : viewMode === 'grid' ? (
        <Grid container spacing={4}>
          {filteredItems.map((item, index) => (
            <Fade in={true} timeout={500 * (index + 1)} key={item.id}>
              <Grid item xs={12} sm={6} md={4}>
                <PortfolioItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} viewMode={viewMode} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      ) : (
        <List>
          {filteredItems.map((item, index) => (
            <Fade in={true} timeout={500 * (index + 1)} key={item.id}>
              <ListItem>
                <PortfolioItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} viewMode={viewMode} />
              </ListItem>
            </Fade>
          ))}
        </List>
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
          {(imagePreview || newItem.imageUrl) && (
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
            value={newItem.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            disabled={imageFile !== null}
          />

          <FormControlLabel
            control={
              <Switch
                checked={newItem.isVisible}
                onChange={handleVisibilityChange}
                name="isVisible"
                color="primary"
              />
            }
            label="Visible"
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
