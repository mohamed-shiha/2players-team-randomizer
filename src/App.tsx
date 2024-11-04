import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AddPlayers from './components/AddPlayers';
import GroupsList from './components/GroupsList';
import TeamDisplay from './components/TeamDisplay';
import SavedTeams from './components/SavedTeams';
import NavBar from './components/NavBar';
import EditGroup from './components/EditGroup';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={process.env.PUBLIC_URL}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<GroupsList />} />
              <Route path="/add-players" element={<AddPlayers />} />
              <Route path="/teams/:groupId" element={<TeamDisplay />} />
              <Route path="/saved-teams" element={<SavedTeams />} />
              <Route path="/edit-group/:groupId" element={<EditGroup />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 