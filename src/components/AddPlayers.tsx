import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Player, Group } from '../types/types';
import { getStorageData, saveStorageData } from '../utils/storage';
import Notification from './Notification';

const AddPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [groupName, setGroupName] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'error' as const
  });
  const navigate = useNavigate();

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const playerName = newPlayer.trim();
    
    if (playerName) {
      // Check if player name already exists (case insensitive)
      const nameExists = players.some(
        player => player.name.toLowerCase() === playerName.toLowerCase()
      );

      if (nameExists) {
        setNotification({
          open: true,
          message: 'This player name already exists!',
          severity: 'error'
        });
        return;
      }

      const player: Player = {
        id: Date.now().toString(),
        name: playerName,
      };
      setPlayers([...players, player]);
      setNewPlayer('');
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    setPlayers(players.filter(player => player.id !== playerId));
  };

  const handleSaveGroup = () => {
    if (players.length >= 4 && groupName.trim()) {
      const newGroup: Group = {
        id: Date.now().toString(),
        name: groupName.trim(),
        players,
      };
      
      const data = getStorageData();
      saveStorageData({
        ...data,
        groups: [...data.groups, newGroup],
      });
      
      navigate(`/teams/${newGroup.id}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add Players
        </Typography>

        <form onSubmit={handleAddPlayer} style={{ display: 'flex', gap: '8px' }}>
          <TextField
            fullWidth
            label="Player Name"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: '16px', minWidth: '100px' }}
            disabled={!newPlayer.trim()}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </form>

        <List>
          {players.map((player) => (
            <ListItem
              key={player.id}
              secondaryAction={
                <IconButton onClick={() => handleRemovePlayer(player.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={player.name} />
            </ListItem>
          ))}
        </List>

        {players.length >= 4 && (
          <TextField
            fullWidth
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="normal"
          />
        )}

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveGroup}
            disabled={players.length < 4 || !groupName.trim()}
          >
            Save Group
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 2 }}
        >
          {players.length < 4 
            ? `Add ${4 - players.length} more player${4 - players.length === 1 ? '' : 's'} to continue`
            : 'Ready to save group!'}
        </Typography>
      </Box>
    </Container>
  );
};

export default AddPlayers; 