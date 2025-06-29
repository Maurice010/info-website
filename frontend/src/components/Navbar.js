import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ścieżka do AuthContext

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="default" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}>
            InfoTech
          </Typography>
          <Button component={Link} to="/events" sx={{ mr: 2 }} variant="outlined" color="primary">
            Wydarzenia
          </Button>
          <Button component={Link} to="/calendar" sx={{ mr: 2 }} variant="outlined" color="primary">
            Kalendarz ogólny
          </Button>
          <Button component={Link} to="/create-event" sx={{ mr: 2 }} variant="outlined" color="primary">
            Dodaj wydarzenie
          </Button>
        </Box>
        <Box>
          {isLoggedIn ? (
            <>
              <Button component={Link} to="/profile" sx={{ mr: 2 }} variant="outlined" color="primary">
                Mój profil
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{ backgroundColor: '#9b0000', '&:hover': { backgroundColor: '#600000' } }}
              >
                Wyloguj się
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/register" sx={{ mr: 2 }} variant="outlined" color="primary">
                Zarejestruj się
              </Button>
              <Button component={Link} to="/login" variant="contained" color="primary">
                Zaloguj się
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
