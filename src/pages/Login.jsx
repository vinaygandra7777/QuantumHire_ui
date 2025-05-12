// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Icons for password visibility
import { motion } from 'framer-motion'; // For animations

// Reuse the floating shapes concept from Signup/ToolSelection
const generateFloatingShapes = (count) => {
    const shapes = [];
    for (let i = 0; i < count; i++) {
        shapes.push({
            key: `shape-${i}`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() > 0.5 ? 'w-24 h-32' : 'w-32 h-40', // Vary size slightly
            animationDelay: `${Math.random() * 5}s`, // Vary delay for staggered effect
            duration: `${10 + Math.random() * 10}s`, // Vary duration
             isSquare: Math.random() > 0.5, // Sometimes render squares too
        });
    }
    return shapes;
};


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const [generalError, setGeneralError] = useState(null); // For Firebase or other general errors
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // For success message after login (less common, usually just redirect)

  const navigate = useNavigate();

  // State for floating shapes
  const [shapes, setShapes] = useState([]);

  // Effect to generate shapes on mount
  useEffect(() => {
    setShapes(generateFloatingShapes(10)); // Generate 10 shapes for the background
  }, []);


  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setGeneralError(null); // Clear previous errors
    setSuccess(false); // Clear previous success message

    // Simple client-side check before attempting Firebase login
    if (!email || !password) {
        setGeneralError("Please enter both email and password.");
        return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login: Redirect user to dashboard
      console.log('User logged in successfully!');
      // Optional: Show success message briefly before redirecting
      // setSuccess(true);
      // setTimeout(() => navigate('/dashboard'), 1000);
       navigate('/dashboard'); // Redirect immediately
    } catch (error) {
      console.error('Error logging in:', error);
      // Display user-friendly error message
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setGeneralError('Invalid email or password.'); // Combine for security
          break;
        case 'auth/invalid-email':
          setGeneralError('Invalid email format.');
          break;
        case 'auth/too-many-requests':
             setGeneralError('Too many login attempts. Please try again later.');
             break;
        default:
          setGeneralError('Failed to login. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

   const handleGoogleLogin = async () => {
       setGeneralError(null); // Clear previous errors
       setSuccess(false); // Clear previous success message
       setLoading(true); // Show loading state

       const provider = new GoogleAuthProvider();
       try {
           const result = await signInWithPopup(auth, provider);
           // The signed-in user info.
           const user = result.user;
           console.log("Google login successful:", user);
           // Redirect to dashboard after success
           navigate('/dashboard');

       } catch (error) {
           console.error("Error during Google login:", error);
           // Handle Errors here.
           const errorCode = error.code;
           const errorMessage = error.message;
           // Display user-friendly error
            if (errorCode === 'auth/account-exists-with-different-credential') {
               setGeneralError(`An account with this email already exists using a different login method. Please try logging in with your other method.`);
           } else if (errorCode === 'auth/popup-closed-by-user') {
               // Do nothing, user just closed the popup
               setGeneralError(null); // Clear error if it was set before
           }
           else {
                setGeneralError(`Google login failed: ${errorMessage}`);
           }
       } finally {
           setLoading(false); // Hide loading state
       }
   };


  return (
     
     <div className="flex flex-col md:flex-row min-h-screen bg-dark-gradient">

        <div className="relative w-full md:w-1/2 lg:w-1/2 bg-brand-dark flex items-center justify-center p-8 overflow-hidden background-image bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/src/assets/background1.png')" }}>
                     {/* Floating Shapes (Animation background) */}
                     <div className="absolute inset-0 z-0 pointer-events-none">
                         {shapes.map((shape) => (
                           <motion.div
                             key={shape.key}
                             className={`absolute border border-brand-purple rounded-xl animate-floating ${shape.isSquare ? 'w-32 h-32' : shape.size}`}
                             style={{
                               top: shape.top,
                               left: shape.left,
                               animationDelay: shape.animationDelay,
                               animationDuration: shape.duration,
                               opacity: 0.3, // Make them subtle
                             }}
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 0.3, scale: 1 }}
                             transition={{ duration: 1, delay: parseFloat(shape.animationDelay) }}
                           />
                         ))}
                     </div>
        
                    {/* Left Side Content (Logo, Back button, Marketing text) */}
                    <div className="relative z-10 text-white text-center flex flex-col items-center h-full w-full justify-between py-8"> {/* Added flex column, justify-between, height, width */}
                        {/* Logo and Back Button (Top) */}
                        <div className="flex justify-between items-center w-full ">
                             <div className="flex items-center">
                                {/* Using a generic placeholder for logo, replace with your actual logo */}
                                <img src="/src/assets/qhlogo.png" alt="QuantumHire AI Logo" className="h-8 w-8 mr- rounded-lg" />
                                
                                 {/* Removed "QuantumHire.AI" text based on image */}
                            </div>
                            {/* Back Button */}
                            <Link
                                to="/" // Link back to the landing page
                                className="flex items-center px-4 py-2 bg-brand-purple/20 rounded-full text-sm font-semibold hover:bg-brand-purple/30 transition-colors font-['Exo']"
                            >
                               Back to website <span className="ml-1 ">→</span> {/* Adjusted margin */}
                            </Link>
                        </div>
        

                {/* Placeholder for Resume ATS Score Animation */}
                 {/* Use a relevant image or animation placeholder */}
                 <div className="flex flex-col items-center text-center text-white"> {/* Added margin bottom */}
                     
                    <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-extrabold font-['Nura']"><h1>Optimize. Apply. Succeed.</h1></span>
                     
                </div>

            </div>
        </div>

        {/* Right Side - Login Form */}
        {/* Use motion.div for entry animation */}
        <motion.div
             className="w-full md:w-1/2 lg:w-3/5 bg-black bg-opacity-90 p-8 md:p-12 flex items-center justify-center"
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Form Container - Set max-width for desktop */}
            <div className="max-w-md w-full space-y-6">
                <div>
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white font-['Nura']">
                        Welcome Back!
                    </h2>
                    <p className="mt-2 text-sm text-brand-gray font-['Exo']">
                        New here?{' '}
                        {/* Link to Signup page */}
                        <Link to="/signup" className="font-medium text-brand-purple hover:text-brand-purple-light underline">
                            Create an account
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleEmailLogin} noValidate> {/* noValidate disables browser default validation */}
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border border-brand-gray-dark placeholder-brand-gray text-gray-light px-3 py-2 bg-brand-black text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Field with Visibility Toggle */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type={passwordVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border border-brand-gray-dark placeholder-brand-gray text-gray-light px-3 py-2 bg-brand-black text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple pr-10" // Add padding-right for the icon
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                         <button
                            type="button" // Important: Type button to prevent form submission
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-gray hover:text-white focus:outline-none"
                            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                             title={passwordVisible ? 'Hide password' : 'Show password'}
                         >
                             {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                         </button>
                    </div>

                    {/* --- ADD Forgot Password Link --- */}
                    <div className="text-right text-sm font-['Exo']">
                        <a href="#" className="font-medium text-brand-gray hover:text-white underline">
                           Forgot password?
                        </a>
                    </div>


                    {/* General Error Display */}
                    {generalError && (
                        <div className="text-red-500 text-sm text-center font-['Exo']">
                            {generalError}
                        </div>
                    )}

                    {/* Success Message (Optional for login, usually just redirects) */}
                     {/* {success && (
                        <div className="text-green-500 text-sm text-center font-['Exo']">
                            Login successful! Redirecting...
                        </div>
                    )} */}


                    {/* Login Button */}
                    <div>
                         {/* Use the purple gradient background */}
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white font-['Exo']
                                bg-gradient-to-r from-brand-purple-dark to-brand-purple
                                hover:from-brand-purple hover:to-brand-purple-light
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple
                                ${loading || !email || !password ? 'opacity-60 cursor-not-allowed' : ''}`} // Disable if loading or fields are empty
                            disabled={loading || !email || !password} // Disable if loading or fields are empty
                        >
                            {loading ? 'Logging In...' : 'Login'}
                        </button>
                    </div>
                </form>

                {/* Separator */}
                <div className="relative flex justify-center text-sm">
                     <span className=" bg-opacity-90 px-2 text-brand-gray font-['Exo']">
                       Or login with
                     </span>
                     {/* Use absolute positioning for the line */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-t border-brand-gray-dark z-[-1]"></div>
                </div>


                {/* Social Sign-in Buttons (Google Only) */}
                <div className="flex flex-col space-y-3"> {/* Use flex-col and space-y for vertical stacking */}
                    {/* Google Button */}
                     <button
                         type="button" // Important: Type button
                         onClick={handleGoogleLogin}
                         className="w-full flex items-center justify-center px-4 py-2 border border-brand-gray-dark rounded-md shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-gray-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gray-dark font-['Exo']"
                         disabled={loading} // Disable social login while loading
                     >
                         {/* Google Icon (replace with SVG or icon component) */}
                         <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M23.518 12.208c0-.814-.073-1.495-.18-2.178H12V14.3h6.43c-.296 1.731-1.383 3.317-3.004 4.331v3.362h4.355c2.543-2.348 4.003-5.892 4.003-10.783z"/><path fill="#34A853" d="M12 24c3.24 0 5.934-1.073 7.91-2.91l-4.355-3.362c-1.201.803-2.76 1.28-4.555 1.28-3.537 0-6.539-2.37-7.621-5.605H.887v3.459C2.95 21.983 7.126 24 12 24z"/><path fill="#FBBC05" d="M4.379 14.302c-.25-.729-.395-1.506-.395-2.302 0-.797.145-1.573.395-2.302V6.241H.887C-.045 8.076-.28 10.09.146 12c-.427 1.91-.202 3.923.741 5.759L4.38 14.302z"/><path fill="#EA4335" d="M12 4.766c1.776 0 3.584.603 4.931 1.826l3.843-3.842C17.935 1.533 15.242 0 12 0 7.126 0 2.95 2.017.887 6.24l3.492 2.759C5.46 7.135 8.463 4.766 12 4.766z"/></svg>
                         Sign in with Google
                     </button>
                </div>

            </div>
        </motion.div>

     </div>
  );
};

export default Login;