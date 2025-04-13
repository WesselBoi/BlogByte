import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/ABout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Check if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex-shrink-0 flex items-center">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 leading-tight">
                BlogApp
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('/about') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              <Link 
                to="/profile" 
                className={`px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive('/profile') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Profile
              </Link>
              <div className="flex space-x-3 pl-4 border-l border-gray-200">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    isActive('/login') 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-indigo-600 hover:bg-indigo-50 border border-indigo-200'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    isActive('/signup') 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                {!isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive('/') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive('/about') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                About
              </Link>
              <Link 
                to="/profile" 
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive('/profile') 
                    ? 'text-indigo-700 bg-indigo-50' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                Profile
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="block w-full px-4 py-2 mb-2 text-center rounded-md font-medium text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full px-4 py-2 text-center rounded-md font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;