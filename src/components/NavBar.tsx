import { AppBar, Toolbar, Button, Box, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
          aria-label="home"
        >
          <HomeIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button 
            color="inherit"
            onClick={() => navigate('/')}
            variant={location.pathname === '/' ? 'outlined' : 'text'}
          >
            Groups
          </Button>
          <Button 
            color="inherit"
            onClick={() => navigate('/saved-teams')}
            variant={location.pathname === '/saved-teams' ? 'outlined' : 'text'}
          >
            Saved Teams
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar; 