// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance
import { Link } from 'react-router-dom'; // Assuming you use React Router

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login: Redirect user or show success message
      console.log('User logged in successfully!');
      // Example: history.push('/dashboard'); // If using react-router-dom v5 or useNavigate in v6
    } catch (error) {
      console.error('Error logging in:', error);
      // Display user-friendly error message
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Failed to login. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Add some padding/margin classes to position correctly
  // Use bg-dark-gradient if you added it to tailwind.config.js
  return (
    <div className="min-h-screen bg-black bg-dark-gradient flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 bg-opacity-70 p-10 rounded-lg shadow-lg">
        <div>
          {/* Title matching the UI style */}
          <h2 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-white font-display">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Login to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-purple-700 opacity-70 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'}`}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            {/* Use Link from react-router-dom */}
            <Link to="/signup" className="font-medium text-purple-400 hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;