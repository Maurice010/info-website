import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { formatDateTime } from '../utils/dateUtils';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: loggedUser } = useAuth();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setError('Nie udało się pobrać wydarzenia.');
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/events');
    } catch (err) {
      console.error(err);
      setError('Nie udało się usunąć wydarzenia.');
    }
  };

  if (!event) {
    return (
      <Container maxWidth="md">
        <Typography sx={{ mt: 4 }}>Ładowanie wydarzenia...</Typography>
      </Container>
    );
  }

  console.log('loggedUser:', loggedUser);
  console.log('event.ownerId:', event.ownerId);
  const isOwner = loggedUser && String(event.ownerId) === String(loggedUser.id);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Typography><strong>Start:</strong> {formatDateTime(event.startDate)}</Typography>
        <Typography><strong>Koniec:</strong> {formatDateTime(event.endDate)}</Typography>
        <Typography><strong>Kategoria:</strong> {event.category}</Typography>
        <Typography><strong>Lokalizacja:</strong> {event.location}</Typography>
        {event.description && (
          <Typography sx={{ mt: 2 }}><strong>Opis:</strong><br />{event.description}</Typography>
        )}
        {event.link && (
          <Typography sx={{ mt: 1 }}>
            <strong>Link:</strong>{' '}
            <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a>
          </Typography>
        )}

        {isOwner && (
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate(`/event/edit/${event.id}`)}
            >
              Edytuj
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDialogOpen(true)}
            >
              Usuń
            </Button>
          </Box>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Czy na pewno chcesz usunąć to wydarzenie?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Anuluj</Button>
          <Button onClick={handleDelete} color="error">Usuń</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetails;
