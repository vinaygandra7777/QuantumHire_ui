// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance
import { Link } from 'react-router-dom'; // Assuming you use React Router

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Clear previous success message
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Successful signup: Show success message or redirect
      setSuccess(true);
      setEmail(''); // Clear form
      setPassword('');
      setConfirmPassword('');
      console.log('User signed up successfully!');
      // Optional: Redirect after a short delay
      // setTimeout(() => history.push('/login'), 2000); // If using react-router-dom
    } catch (error) {
      console.error('Error signing up:', error);
      // Display user-friendly error message
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak (should be at least 6 characters).');
          break;
         case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Failed to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-black bg-dark-gradient flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-900 bg-opacity-70 p-10 rounded-lg shadow-lg">
        <div>
          {/* Title matching the UI style */}
          <h2 className="mt-6 text-center text-3xl md:text-4xl font-extrabold text-white font-display">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Join us and build your resume
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address-signup" className="sr-only">
                Email address
              </label>
              <input
                id="email-address-signup"
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
              <label htmlFor="password-signup" className="sr-only">
                Password
              </label>
              <input
                id="password-signup"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <div>
              <label htmlFor="confirm-password-signup" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password-signup"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm bg-gray-800"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

           {success && (
            <div className="text-green-500 text-sm text-center">
              Account created successfully! You can now{' '}
              {/* Use Link from react-router-dom */}
                <Link to="/login" className="font-medium text-green-400 hover:text-green-500">
                  Login
                </Link>.
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-purple-700 opacity-70 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
             {/* Use Link from react-router-dom */}
            <Link to="/login" className="font-medium text-purple-400 hover:text-purple-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;