import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // For loading state

  // ✅ Check login status on page load
  useEffect(() => {
    // Check localStorage first
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      async function checkLoginStatus() {
        try {
          const res = await fetch('http://localhost:8000/user/check', {
            method: 'GET',
            credentials: 'include', // ensures cookies are sent
          });
          const data = await res.json();
          setIsLoggedIn(data.loggedIn);
          if (data.loggedIn) {
            localStorage.setItem('isLoggedIn', 'true');
          } else {
            localStorage.removeItem('isLoggedIn');
          }
        } catch (err) {
          console.error('Login check failed', err);
          setIsLoggedIn(false);
          localStorage.removeItem('isLoggedIn');
        } finally {
          setLoading(false);
        }
      }
      checkLoginStatus();
    }
  }, []);

  // If still loading, show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
