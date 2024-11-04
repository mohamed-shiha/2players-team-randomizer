import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getStorageData, saveStorageData } from '../utils/storage';
import { Team } from '../types/types';
import { useState, useEffect } from 'react';

const SavedTeams = () => {
  const [savedTeams, setSavedTeams] = useState<Team[]>([]);

  useEffect(() => {
    const data = getStorageData();
    setSavedTeams(data.savedTeams);
  }, []);

  const handleDelete = (teamId: string) => {
    const data = getStorageData();
    const updatedTeams = data.savedTeams.filter(team => team.id !== teamId);
    saveStorageData({
      ...data,
      savedTeams: updatedTeams
    });
    setSavedTeams(updatedTeams);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Saved Teams
        </Typography>

        {savedTeams.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            No saved teams yet
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {savedTeams.map((team) => (
              <Grid item xs={12} key={team.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" gutterBottom>
                        {team.name}
                      </Typography>
                      <IconButton onClick={() => handleDelete(team.id)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography>
                      {team.players[0].name} & {team.players[1].name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default SavedTeams; 