import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventCreation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setSuccess('')

    const formData = new FormData(e.target);

    const eventData = {
      name: formData.get('name'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      category: formData.get('category'),
      location: formData.get('location'),
      description: formData.get('description'),
      link: formData.get('link'),
    };

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/events', eventData, {
        headers: {
        Authorization: `Bearer ${token}`
        }
      });
        
      setSuccess('Wydarzenie zostało utworzone.')
      e.target.reset()
    } catch (err) {
      console.error('Błąd przy tworzeniu wydarzenia:', err)
      setError('Nie udało się utworzyć wydarzenia.')
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tworzenie wydarzenia
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Uzupełnij dane nowego wydarzenia:
        </Typography>

        <Divider sx={{ my: 4 }} />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nazwa wydarzenia"
            name="name"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Data i godzina rozpoczęcia"
            name="startDate"
            type="datetime-local"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data i godzina zakończenia"
            name="endDate"
            type="datetime-local"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Kategoria"
            name="category"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Lokalizacja"
            name="location"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Opis"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Link (np. strona wydarzenia)"
            name="link"
            type="url"
            fullWidth
            margin="normal"
          />

          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Utwórz wydarzenie
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EventCreation;
