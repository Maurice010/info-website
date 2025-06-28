import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      navigate('/login');
    } else {
      setError(true);
      setMessage(data.message || 'Błąd rejestracji. Spróbuj ponownie.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h5" mb={3} textAlign="center">Rejestracja</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nazwa użytkownika"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
          />
          <TextField
            label="Hasło"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Zarejestruj
          </Button>
        </form>
        {message && (
          <Alert severity={error ? 'error' : 'success'} sx={{ mt: 3 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default Register;
