import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EventCreation from './pages/EventCreation';
import EventEdit from './pages/EventEdit';
import EventDetails from './pages/EventDetails';
import EventList from './pages/EventList';
import MainCalendar from './pages/MainCalendar';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/event/edit/:id" element={<EventEdit />} />
        <Route path="/calendar" element={<MainCalendar title="Kalendarz wydarzeń" />} />
        <Route path="/my-calendar" element={<MainCalendar title="Mój kalendarz" />} />
        <Route path="/events" element={<EventList />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
