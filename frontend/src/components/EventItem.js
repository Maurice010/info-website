import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { formatDateTime } from '../utils/dateUtils'
import {
  Typography,
  Divider,
  Paper,
  Link as MuiLink,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'

function EventItem({ event }) {
    const { user: loggedUser } = useAuth();
  
    const [added, setAdded] = useState(false);
    const [favorite, setFavorite] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      const checkAdded = async () => {
        try {
          const res = await axios.get('/api/users/me/events', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAdded(res.data.some(e => e.id === event.id));
        } catch {
          setAdded(false);
        }
      };
  
      const checkFavorite = async () => {
        try {
          const res = await axios.get('/api/users/me/favorites', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorite(res.data.some(e => e.id === event.id));
        } catch {
          setFavorite(false);
        }
      };
  
      checkAdded();
      checkFavorite();
    }, [event.id]);
  
    const handleAddToCalendar = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Musisz się zalogować, aby dodać wydarzenie.');
  
      try {
        await axios.post(`/api/users/me/events/${event.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdded(true);
      } catch (error) {
        alert('Nie udało się dodać wydarzenia.');
      }
    };
  
    const handleRemoveFromCalendar = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Zaloguj się');
      try {
        await axios.delete(`/api/users/me/events/${event.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdded(false);
      } catch {
        alert('Błąd usuwania');
      }
    };
  
    const handleAddToFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Musisz się zalogować.');
  
      try {
        await axios.post(`/api/users/me/favorites/${event.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorite(true);
      } catch {
        alert('Nie udało się dodać do ulubionych.');
      }
    };
  
    const handleRemoveFromFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Zaloguj się');
  
      try {
        await axios.delete(`/api/users/me/favorites/${event.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorite(false);
      } catch {
        alert('Błąd usuwania z ulubionych');
      }
    };
  
    return (
      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, borderRadius: 2, cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
      >
        <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" gutterBottom>{event.name}</Typography>
          <Typography color="text.secondary"><strong>Start:</strong> {formatDateTime(event.startDate)}</Typography>
          <Typography color="text.secondary"><strong>Koniec:</strong> {formatDateTime(event.endDate)}</Typography>
          <Typography color="text.secondary"><strong>Kategoria:</strong> {event.category}</Typography>
          <Typography color="text.secondary"><strong>Lokalizacja:</strong> {event.location}</Typography>
          <Typography color="text.secondary" sx={{ mb: 1 }}><strong>Opis:</strong> {event.description}</Typography>
        </Link>
  
        {event.link && (
          <Typography>
            <strong>Link:</strong>{' '}
            <MuiLink href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</MuiLink>
          </Typography>
        )}
  
        <Divider sx={{ mt: 2 }} />
  
        {loggedUser && (
          <>
            {!added ? (
              <Button variant="outlined" sx={{ mt: 2, mr: 1 }} onClick={handleAddToCalendar}>Dodaj do mojego kalendarza</Button>
            ) : (
              <Button variant="outlined" color="error" sx={{ mt: 2, mr: 1 }} onClick={handleRemoveFromCalendar}>Usuń z kalendarza</Button>
            )}
            {!favorite ? (
              <Button variant="outlined" sx={{ mt: 2 }} onClick={handleAddToFavorites}>Dodaj do ulubionych</Button>
            ) : (
              <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleRemoveFromFavorites}>Usuń z ulubionych</Button>
            )}
          </>
        )}
      </Paper>
    );
  }
  
  export default EventItem;