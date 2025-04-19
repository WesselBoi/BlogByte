import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup(e) {
    e.preventDefault();
    
    try {
      // Optional: Client-side validation
      if (!name || !email || !password) {
        setError('All fields are required');
        return;
      }
      
      const response = await fetch('http://localhost:8000/user/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",   
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.msg || 'Signup failed');
        return;
      }
      
      setError(''); // Clear any previous errors
      toast.success('Account Created Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Wait 2 seconds before navigating
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Signup error:', err);
    }
  }

  return (
    <div className="min-h-fit flex items-center justify-center bg-[#ffffff07] border border-[#FFD369] rounded-2xl  px-4 py-15">
      <ToastContainer />
      <div className="w-full max-w-md bg-[#292b2e] shadow-xl rounded-2xl p-8 border border-[#222831]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFD369] rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#222831]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#EEEEEE]">Create Account</h2>
          <p className="text-[#FFD369] mt-1">Join the BlogByte community today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#EEEEEE] mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#FFD369]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-[#222831] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] bg-[#222831] text-[#EEEEEE] focus:outline-none transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#EEEEEE] mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#FFD369]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-[#222831] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] bg-[#222831] text-[#EEEEEE] focus:outline-none transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#EEEEEE] mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#FFD369]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-[#222831] rounded-lg focus:ring-2 focus:ring-[#FFD369] focus:border-[#FFD369] bg-[#222831] text-[#EEEEEE] focus:outline-none transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="mt-1 text-xs text-[#EEEEEE]/70">Password must be at least 8 characters long</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#FFD369] focus:ring-[#FFD369] border-[#222831] rounded cursor-pointer"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-[#EEEEEE]">
                I agree to the <a href="#" className="text-[#FFD369] hover:text-[#FFD369]/80">Terms of Service</a> and <a href="#" className="text-[#FFD369] hover:text-[#FFD369]/80">Privacy Policy</a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-[#222831] bg-[#FFD369] hover:bg-[#FFD369]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD369] transition-colors cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#222831]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-[#EEEEEE]/70">Already have an account?</span>
            </div>
          </div>

          <div className="mt-6">
          <Link to="/login" className="w-full flex justify-center py-3 px-4 border border-[#222831] rounded-lg shadow-sm text-base font-medium text-[#FFD369] bg-[#222831] hover:bg-[#363e4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD369] transition-colors">
            Sign in
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;