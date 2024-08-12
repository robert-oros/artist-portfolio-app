import { Button, Typography, Box, IconButton, Tooltip, Zoom, ListItem } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const ItemListView = ({ item, handleDelete, handleClickOpen }) => {
    return (
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
    )
}

export default ItemListView