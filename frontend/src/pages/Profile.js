import { useEffect, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.login || 'Użytkownik');
    } catch {
      setUsername('Użytkownik');
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profil użytkownika
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Zalogowany jako: <strong>{username}</strong>
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5">Ulubione</Typography>
          <Typography color="text.secondary">Tutaj pojawią się Twoje ulubione wydarzenia lub artykuły.</Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5">Mój kalendarz</Typography>
          <Typography color="text.secondary">Twój spersonalizowany kalendarz pojawi się tutaj.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
