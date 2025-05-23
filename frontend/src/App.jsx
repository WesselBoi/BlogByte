import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/ABout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
// import Admin from './pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

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
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}user/check`, {
            method: 'GET',
            credentials: 'include',
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

  if (loading) {
    return <div className="bg-[#222831] text-[#EEEEEE] min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#2a303a] to-[#393E46]">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-[#EEEEEE]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          {/* <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;