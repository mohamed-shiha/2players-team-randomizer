import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Player, Group } from '../types/types';
import { getStorageData, saveStorageData } from '../utils/storage';

const EditGroup = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const data = getStorageData();
    const group = data.groups.find(g => g.id === groupId);
    if (group) {
      setPlayers(group.players);
      setGroupName(group.name);
    } else {
      navigate('/');
    }
  }, [groupId, navigate]);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlayer.trim()) {
      const player: Player = {
        id: Date.now().toString(),
        name: newPlayer.trim(),
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
      const data = getStorageData();
      const updatedGroups = data.groups.map(group => 
        group.id === groupId
          ? { ...group, name: groupName, players }
          : group
      );
      
      saveStorageData({
        ...data,
        groups: updatedGroups,
      });
      
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Edit Group
        </Typography>

        <TextField
          fullWidth
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
        />

        <form onSubmit={handleAddPlayer}>
          <TextField
            fullWidth
            label="Add Player"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            margin="normal"
          />
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
            Save Changes
          </Button>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 2 }}
        >
          {players.length < 4 
            ? `Need at least 4 players (currently have ${players.length})`
            : 'Ready to save changes'}
        </Typography>
      </Box>
    </Container>
  );
};

export default EditGroup; 