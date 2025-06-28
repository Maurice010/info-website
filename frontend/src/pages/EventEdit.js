import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EventEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEventData(res.data);
      } catch (err) {
        console.error('Błąd przy pobieraniu wydarzenia:', err);
        setError('Nie udało się pobrać danych wydarzenia.');
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);

    const updatedEvent = {
      name: formData.get('name'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      category: formData.get('category'),
      location: formData.get('location'),
      description: formData.get('description'),
      link: formData.get('link'),
    };

    try {
      await axios.put(`/api/events/${id}`, updatedEvent);
      setSuccess('Wydarzenie zostało zaktualizowane.');
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      console.error('Błąd przy aktualizacji wydarzenia:', err);
      setError('Nie udało się zapisać zmian.');
    }
  };

  if (!eventData) {
    return (
      <Container maxWidth="md">
        <Typography sx={{ mt: 4, textAlign: 'center' }}>Ładowanie wydarzenia...</Typography>
      </Container>
    );
  }

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

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

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
            defaultValue={eventData.startDate?.slice(0, 16)} // ISO 8601 → yyyy-MM-ddTHH:mm
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data i godzina zakończenia"
            name="endDate"
            type="datetime-local"
            fullWidth
            required
            margin="normal"
            defaultValue={eventData.endDate?.slice(0, 16)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Kategoria"
            name="category"
            fullWidth
            required
            margin="normal"
            defaultValue={eventData.category}
          />
          <TextField
            label="Lokalizacja"
            name="location"
            fullWidth
            required
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


// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   TextField,
//   Typography
// } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';

// const EventEdit = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [eventData, setEventData] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       // Simulated API delay
//       await new Promise((r) => setTimeout(r, 500));

//       // Simulated event data
//       const mockEvent = {
//         id,
//         name: 'Konferencja React',
//         startDate: '2025-08-01T09:00',
//         endDate: '2025-08-01T17:00',
//         category: 'IT',
//         location: 'Warszawa',
//         description: 'Konferencja dla entuzjastów Reacta.',
//         link: 'https://reactconf.pl'
//       };

//       setEventData(mockEvent);
//     };

//     fetchEvent();
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);

//     const updatedEvent = {
//       id,
//       name: formData.get('name'),
//       startDate: formData.get('startDate'),
//       endDate: formData.get('endDate'),
//       category: formData.get('category'),
//       location: formData.get('location'),
//       description: formData.get('description'),
//       link: formData.get('link'),
//     };

//     console.log('Updated event:', updatedEvent);
//     navigate('/events');
//   };

//   if (!eventData) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Ładowanie wydarzenia...</Typography>;

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Edytuj wydarzenie
//         </Typography>

//         <Typography variant="h6" color="text.secondary" gutterBottom>
//           Wprowadź zmiany i zapisz:
//         </Typography>

//         <Divider sx={{ my: 4 }} />

//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             label="Nazwa wydarzenia"
//             name="name"
//             fullWidth
//             required
//             margin="normal"
//             defaultValue={eventData.name}
//           />
//           <TextField
//             label="Data i godzina rozpoczęcia"
//             name="startDate"
//             type="datetime-local"
//             fullWidth
//             required
//             margin="normal"
//             defaultValue={eventData.startDate}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Data i godzina zakończenia"
//             name="endDate"
//             type="datetime-local"
//             fullWidth
//             required
//             margin="normal"
//             defaultValue={eventData.endDate}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Kategoria"
//             name="category"
//             fullWidth
//             margin="normal"
//             defaultValue={eventData.category}
//           />
//           <TextField
//             label="Lokalizacja"
//             name="location"
//             fullWidth
//             margin="normal"
//             defaultValue={eventData.location}
//           />
//           <TextField
//             label="Opis"
//             name="description"
//             fullWidth
//             multiline
//             rows={3}
//             margin="normal"
//             defaultValue={eventData.description}
//           />
//           <TextField
//             label="Link (np. strona wydarzenia)"
//             name="link"
//             type="url"
//             fullWidth
//             margin="normal"
//             defaultValue={eventData.link}
//           />

//           <Box sx={{ mt: 3 }}>
//             <Button type="submit" variant="contained" color="primary">
//               Zapisz zmiany
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default EventEdit;
