import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EventEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      // Simulated API delay
      await new Promise((r) => setTimeout(r, 500));

      // Simulated event data
      const mockEvent = {
        id,
        name: 'Konferencja React',
        startDate: '2025-08-01T09:00',
        endDate: '2025-08-01T17:00',
        category: 'IT',
        location: 'Warszawa',
        description: 'Konferencja dla entuzjastów Reacta.',
        link: 'https://reactconf.pl'
      };

      setEventData(mockEvent);
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedEvent = {
      id,
      name: formData.get('name'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      category: formData.get('category'),
      location: formData.get('location'),
      description: formData.get('description'),
      link: formData.get('link'),
    };

    console.log('Updated event:', updatedEvent);
    navigate('/events');
  };

  if (!eventData) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Ładowanie wydarzenia...</Typography>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edytuj wydarzenie
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          Wprowadź zmiany i zapisz:
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nazwa wydarzenia"
            name="name"
            fullWidth
            required
            margin="normal"
            defaultValue={eventData.name}
          />
          <TextField
            label="Data i godzina rozpoczęcia"
            name="startDate"
            type="datetime-local"
            fullWidth
            required
            margin="normal"
            defaultValue={eventData.startDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data i godzina zakończenia"
            name="endDate"
            type="datetime-local"
            fullWidth
            required
            margin="normal"
            defaultValue={eventData.endDate}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Kategoria"
            name="category"
            fullWidth
            margin="normal"
            defaultValue={eventData.category}
          />
          <TextField
            label="Lokalizacja"
            name="location"
            fullWidth
            margin="normal"
            defaultValue={eventData.location}
          />
          <TextField
            label="Opis"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            defaultValue={eventData.description}
          />
          <TextField
            label="Link (np. strona wydarzenia)"
            name="link"
            type="url"
            fullWidth
            margin="normal"
            defaultValue={eventData.link}
          />

          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Zapisz zmiany
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EventEdit;
