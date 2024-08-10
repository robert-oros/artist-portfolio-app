import React, { useState, useEffect } from 'react';
import { Grid, Typography, Alert, Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fade, Fab, Zoom, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';
import PortfolioItem from './PortfolioItem';
import AddIcon from '@mui/icons-material/Add';

const PortfolioList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    imageUrl: '',
    clientWebsiteUrl: '',
    isVisible: true
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/portfolio');
      setItems(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching portfolio items:', err);
      setError('Unable to fetch portfolio items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/portfolio/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting portfolio item:', err);
      setError('Unable to delete portfolio item. Please try again later.');
    }
  };

  const handleEdit = async (editedItem) => {
    try {
      const response = await axios.patch(`http://localhost:3000/portfolio/${editedItem.id}`, editedItem);
      setItems((prevItems) => prevItems.map((item) => item.id === editedItem.id ? response.data : item));
      setError(null);
    } catch (err) {
      console.error('Error updating portfolio item:', err);
      setError('Unable to update portfolio item. Please try again later.');
    }
  };

  const handleAddItem = async () => {
    try {
      const formData = new FormData();
      Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));
      if (newImage) {
        formData.append('image', newImage);
      }

      const response = await axios.post('http://localhost:3000/portfolio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setItems((prevItems) => [...prevItems, response.data]);
      setError(null);
      setOpenAddDialog(false);
      setNewItem({
        title: '',
        description: '',
        imageUrl: '',
        clientWebsiteUrl: '',
        isVisible: true
      });
      setNewImage(null);
    } catch (err) {
      console.error('Error adding portfolio item:', err);
      setError('Unable to add portfolio item. Please try again later.');
    }
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewItem({
      title: '',
      description: '',
      imageUrl: '',
      clientWebsiteUrl: '',
      isVisible: true
    });
    setNewImage(null);
  };

  const handleNewItemChange = (e) => {
    if (e.target.name === 'image') {
      setNewImage(e.target.files[0]);
    } else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value });
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

  const visibleItems = showHidden ? items : items.filter(item => item.isVisible);

  return (
    <Box sx={{ py: 6, px: 2, position: 'relative' }}>
      <FormControlLabel
        control={<Switch checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />}
        label="Show hidden items"
        sx={{ mb: 2 }}
      />
      {visibleItems.length === 0 ? (
        <Typography variant="h5" textAlign="center" color="text.secondary" mt={4}>
          No portfolio items found. Start by adding a new item!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {visibleItems.map((item, index) => (
            <Fade in={true} timeout={500 * (index + 1)} key={item.id}>
              <Grid item xs={12} sm={6} md={4}>
                <PortfolioItem item={item} handleDelete={handleDelete} handleEdit={handleEdit} />
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}

      <Zoom in={true}>
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleAddDialogOpen}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
          }}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>Add New Portfolio Item</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newItem.title}
            onChange={handleNewItemChange}
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
            value={newItem.description}
            onChange={handleNewItemChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newItem.imageUrl}
            onChange={handleNewItemChange}
            sx={{ mb: 2 }}
          />
          <input
            accept="image/*"
            type="file"
            name="image"
            onChange={handleNewItemChange}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            name="clientWebsiteUrl"
            label="Client Website URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newItem.clientWebsiteUrl}
            onChange={handleNewItemChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleAddDialogClose} color="inherit">Cancel</Button>
          <Button onClick={handleAddItem} variant="contained" color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioList;