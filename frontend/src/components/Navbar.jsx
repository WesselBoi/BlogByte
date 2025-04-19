import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persist login state across page refreshes
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true"; // Get value from localStorage
    setIsLoggedIn(loggedInStatus);
  }, []);

  async function handleLogout() {
    await fetch("http://localhost:8000/user/logout", {
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
<header className="sticky top-0 z-10 backdrop-blur-sm bg-[#222831]/70 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD369] to-[#EEEEEE] leading-tight">
              BlogApp
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                isActive("/")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                isActive("/about")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              About
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                isActive("/profile")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              Profile
            </Link>

            <div className="flex space-x-3 pl-4 border-l border-[#393E46]">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      isActive("/login")
                        ? "bg-[#FFD369] text-[#222831] shadow-md"
                        : "text-[#FFD369] hover:bg-[#393E46] border border-[#393E46]"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      isActive("/signup")
                        ? "bg-[#FFD369] text-[#222831] shadow-md"
                        : "bg-[#FFD369] text-[#222831] hover:bg-[#FFD369]/90 shadow-sm hover:shadow"
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md font-medium transition-all cursor-pointer hover:bg-[#FFD369] hover:text-[#222831] text-[#FFD369]"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#FFD369] hover:text-[#EEEEEE] hover:bg-[#393E46] focus:outline-none"
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

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#222831] shadow-lg rounded-b-lg">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive("/")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive("/about")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              About
            </Link>
            <Link
              to="/profile"
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive("/profile")
                  ? "text-[#FFD369] bg-[#393E46]"
                  : "text-[#EEEEEE] hover:text-[#FFD369] hover:bg-[#393E46]"
              }`}
            >
              Profile
            </Link>
            <div className="pt-4 border-t border-[#393E46]">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 mb-2 text-center rounded-md font-medium text-[#FFD369] border border-[#393E46] hover:bg-[#393E46]"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full px-4 py-2 text-center rounded-md font-medium bg-[#FFD369] text-[#222831] hover:bg-[#FFD369]/90"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-center rounded-md font-medium text-[#FFD369] hover:bg-[#FFD369] hover:text-[#222831] transition-all"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
