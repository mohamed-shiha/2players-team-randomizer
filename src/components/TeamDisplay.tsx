import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import { Group, Team, Player } from '../types/types';
import { getStorageData, saveStorageData } from '../utils/storage';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const TeamDisplay = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const data = getStorageData();
    const foundGroup = data.groups.find(g => g.id === groupId);
    if (foundGroup) {
      setGroup(foundGroup);
      generateTeams(foundGroup.players);
    }
  }, [groupId]);

  const generateTeams = (players: Player[]) => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const newTeams: Team[] = [];
    
    for (let i = 0; i < shuffled.length; i += 2) {
      newTeams.push({
        id: Date.now().toString() + i,
        players: [shuffled[i], shuffled[i + 1]] as [Player, Player],
      });
    }
    
    setTeams(newTeams);
  };

  const handleSaveTeams = () => {
    if (teamName.trim() && group) {
      const data = getStorageData();
      
      const newTeam: Team = {
        id: Date.now().toString(),
        name: teamName.trim(),
        players: teams[0].players
      };
      
      const existingTeam = data.savedTeams.find(team => team.name === teamName.trim());
      
      if (!existingTeam) {
        saveStorageData({
          ...data,
          savedTeams: [...data.savedTeams, newTeam],
        });
        
        setTeamName('');
        setShowSuccess(true);
      } else {
        alert('A team with this name already exists. Please choose a different name.');
      }
    }
  };

  if (!group) {
    return (
      <Container maxWidth="sm">
        <Typography>Group not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {group.name} - Teams
        </Typography>

        <Box sx={{ mb: 4 }}>
          {teams.map((team, index) => (
            <Card key={team.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Team {index + 1}
                </Typography>
                <Typography>
                  {team.players[0].name} & {team.players[1].name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <TextField
          fullWidth
          label="Save teams as"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          margin="normal"
        />

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => generateTeams(group.players)}
          >
            Regenerate Teams
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSaveTeams}
            disabled={!teamName.trim()}
          >
            Save Teams
          </Button>
        </Box>

        <Button
          variant="text"
          fullWidth
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Groups
        </Button>
      </Box>

      <Snackbar 
        open={showSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Teams saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeamDisplay; 