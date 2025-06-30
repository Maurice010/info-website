import { useEffect, useState } from 'react';
import { Box, Container, Typography, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { formatDateTime } from '../utils/dateUtils';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [savedEvents, setSavedEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [error, setError] = useState('');
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

    const fetchSaved = async () => {
      try {
        const res = await axios.get('/api/users/me/events', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedEvents(res.data);
      } catch (err) {
        setError('Błąd podczas pobierania wydarzeń z kalendarza');
      }
    };

    const fetchFavorites = async () => {
      try {
        const res = await axios.get('/api/users/me/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavoriteEvents(res.data);
      } catch (err) {
        setError('Błąd podczas pobierania ulubionych wydarzeń');
      }
    };

    fetchSaved();
    fetchFavorites();
  }, [navigate]);

  const renderEventsList = (events) =>
    events.length === 0 ? (
      <Typography color="text.secondary">Brak wydarzeń.</Typography>
    ) : (
      events.map((event) => (
        <Paper
          key={event.id}
          component={Link}
          to={`/event/${event.id}`}
          sx={{
            p: 2,
            mb: 2,
            cursor: 'pointer',
            display: 'block',
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { boxShadow: 6 }
          }}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Typography variant="h6">{event.name}</Typography>
          <Typography color="text.secondary">
            {formatDateTime(event.startDate)} – {formatDateTime(event.endDate)}
          </Typography>
          <Typography color="text.secondary">{event.location}</Typography>
        </Paper>
      ))
    );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profil użytkownika
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Zalogowany jako: <strong>{username}</strong>
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Ulubione wydarzenia
          </Typography>
          {renderEventsList(favoriteEvents)}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Mój kalendarz
          </Typography>
          {renderEventsList(savedEvents)}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
