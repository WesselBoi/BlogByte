import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Persist login state across page refreshes
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    // Add scroll event listener for navbar effects
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsLoggedIn]);

  async function handleLogout() {
    await fetch(`${import.meta.env.VITE_BASE_URL}user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    navigate("/login");
  }

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`sticky top-0 z-10 transition-all duration-300 ${
        scrolled 
          ? "bg-[#1A1E25]/95 backdrop-blur-md shadow-lg" 
          : "bg-[#222831]/80 backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="text-xl font-bold relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFD369] to-[#EEEEEE] leading-tight">
                BlogByte
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD369] to-transparent group-hover:w-full transition-all duration-300"></span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md font-medium relative overflow-hidden transition-all duration-200 ${
                isActive("/")
                  ? "text-[#FFD369] font-semibold"
                  : "text-[#EEEEEE] hover:text-[#FFD369]"
              }`}
            >
              <span>Home</span>
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD369]"></span>
              )}
              {!isActive("/") && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD369] group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md font-medium relative overflow-hidden transition-all duration-200 ${
                isActive("/about")
                  ? "text-[#FFD369] font-semibold"
                  : "text-[#EEEEEE] hover:text-[#FFD369]"
              }`}
            >
              <span>About</span>
              {isActive("/about") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD369]"></span>
              )}
              {!isActive("/about") && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD369] group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md font-medium relative overflow-hidden transition-all duration-200 ${
                isActive("/profile")
                  ? "text-[#FFD369] font-semibold" 
                  : "text-[#EEEEEE] hover:text-[#FFD369]"
              }`}
            >
              <span>Profile</span>
              {isActive("/profile") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD369]"></span>
              )}
              {!isActive("/profile") && (
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD369] group-hover:w-full transition-all duration-300"></span>
              )}
            </Link>

            <div className="flex space-x-3 pl-4 border-l border-[#393E46]/70">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive("/login")
                        ? "bg-[#FFD369] text-[#222831] shadow-md"
                        : "text-[#FFD369] hover:bg-[#393E46] border border-[#393E46] hover:border-[#FFD369]"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive("/signup")
                        ? "bg-[#FFD369] text-[#222831] shadow-md"
                        : "bg-gradient-to-r from-[#FFD369] to-[#FFB740] text-[#222831] hover:shadow-md hover:from-[#FFB740] hover:to-[#FFD369]"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-[#393E46] hover:border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369]/10"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#FFD369] hover:text-white hover:bg-[#393E46] focus:outline-none transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-3 py-3 space-y-2 bg-[#1A1E25] shadow-lg rounded-b-lg border-t border-[#393E46]/30">
          <Link
            to="/"
            className={`block px-3 py-2.5 rounded-md font-medium transition-colors duration-200 ${
              isActive("/")
                ? "text-[#FFD369] bg-[#393E46]/50 border-l-2 border-[#FFD369]"
                : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]/30 hover:border-l-2 hover:border-[#FFD369]/50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2.5 rounded-md font-medium transition-colors duration-200 ${
              isActive("/about")
                ? "text-[#FFD369] bg-[#393E46]/50 border-l-2 border-[#FFD369]"
                : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]/30 hover:border-l-2 hover:border-[#FFD369]/50"
            }`}
          >
            About
          </Link>
          <Link
            to="/profile"
            className={`block px-3 py-2.5 rounded-md font-medium transition-colors duration-200 ${
              isActive("/profile")
                ? "text-[#FFD369] bg-[#393E46]/50 border-l-2 border-[#FFD369]"
                : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]/30 hover:border-l-2 hover:border-[#FFD369]/50"
            }`}
          >
            Profile
          </Link>
          <div className="pt-3 mt-2 border-t border-[#393E46]/50">
            {!isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2.5 text-center rounded-md font-medium text-[#FFD369] border border-[#393E46] hover:border-[#FFD369]/70 hover:bg-[#393E46]/30 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-2.5 text-center rounded-md font-medium bg-gradient-to-r from-[#FFD369] to-[#FFB740] text-[#222831] hover:from-[#FFB740] hover:to-[#FFD369] transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2.5 text-center rounded-md font-medium transition-all duration-200 text-[#FFD369] border border-[#393E46] hover:border-[#FFD369]/70 hover:bg-[#393E46]/30"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;