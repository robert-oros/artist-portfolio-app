import { Typography, Box, IconButton, Card, CardContent, CardMedia, Tooltip, Zoom } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';

const ItemGridView = ({ item, handleDelete, handleClickOpen }) => {
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
    )
}

export default ItemGridView