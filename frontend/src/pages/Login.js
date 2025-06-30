import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import axios from 'axios';


const Login = () => {
  const [form, setForm] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', form);
        localStorage.setItem('token', res.data.token);
        login(res.data.token);
        navigate('/');
    } catch (err) {
        setError(true);
        setMessage(err.response?.data?.message || 'Błąd logowania');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Typography variant="h5" mb={3}>Logowanie</Typography>
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
            Zaloguj
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

export default Login;
