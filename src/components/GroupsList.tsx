import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Container,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Group } from '../types/types';
import { getStorageData, saveStorageData } from '../utils/storage';

const GroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorageData();
    setGroups(data.groups);
  }, []);

  const handleDeleteGroup = (groupId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const data = getStorageData();
    const updatedGroups = data.groups.filter(group => group.id !== groupId);
    saveStorageData({
      ...data,
      groups: updatedGroups,
    });
    setGroups(updatedGroups);
  };

  const handleEditGroup = (groupId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/edit-group/${groupId}`);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          2Players Team Randomizer
        </Typography>
        
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => navigate('/add-players')}
          sx={{ mb: 4 }}
        >
          Create New Group
        </Button>

        {groups.length > 0 ? (
          <>
            <Typography variant="h6" gutterBottom>
              Saved Groups
            </Typography>
            <List>
              {groups.map((group) => (
                <ListItem 
                  key={group.id} 
                  disablePadding
                  secondaryAction={
                    <Box>
                      <IconButton 
                        edge="end" 
                        onClick={(e) => handleEditGroup(group.id, e)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        onClick={(e) => handleDeleteGroup(group.id, e)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemButton onClick={() => navigate(`/teams/${group.id}`)}>
                    <ListItemText 
                      primary={group.name}
                      secondary={`${group.players.length} players`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            No groups created yet. Create your first group!
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default GroupsList;