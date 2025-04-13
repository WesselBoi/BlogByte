import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/ABout'
import Login from './pages/Login'
import Signup from './pages/Signup';


function App() {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-purple-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-6 text-indigo-700 font-semibold">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
