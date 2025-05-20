// src/pages/Signup.jsx
import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; // Import the auth instance
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Icons for password visibility
import { motion } from 'framer-motion'; // For animations

// We'll reuse the floating shapes concept from ToolSelection for the background
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


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [validationErrors, setValidationErrors] = useState([]); // Array to hold validation errors
  const [generalError, setGeneralError] = useState(null); // For Firebase or other general errors
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // State for floating shapes
  const [shapes, setShapes] = useState([]);

  // Effect to generate shapes on mount
  useEffect(() => {
    setShapes(generateFloatingShapes(10)); // Generate 10 shapes for the background
  }, []);


  // Password Validation Logic
  useEffect(() => {
    const errors = [];
    if (password.length > 0) { // Only validate if password field is not empty
      if (password.length < 8) errors.push('Must be at least 8 characters');
      if (!/[A-Z]/.test(password)) errors.push('Must contain at least one uppercase letter');
      if (!/[a-z]/.test(password)) errors.push('Must contain at least one lowercase letter');
      if (!/[0-9]/.test(password)) errors.push('Must contain at least one number');
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) errors.push('Must contain at least one special character');
    }
    setValidationErrors(errors);
    // Also check password match here if confirmPassword is used
     if (confirmPassword.length > 0 && password !== confirmPassword) {
         setGeneralError('Passwords do not match.');
     } else if (confirmPassword.length > 0 && password === confirmPassword) {
          setGeneralError(null); // Clear match error if they now match
     } else if (confirmPassword.length === 0 && generalError === 'Passwords do not match.') {
         setGeneralError(null); // Clear match error if confirm is cleared
     }


  }, [password, confirmPassword, generalError]); // Re-run when password or confirmPassword changes

   // Simple check for password match on confirm password change
   useEffect(() => {
       if (confirmPassword.length > 0 && password !== confirmPassword) {
           setGeneralError('Passwords do not match.');
       } else {
            // Only clear if the current general error is the password match error
            if (generalError === 'Passwords do not match.') {
                 setGeneralError(null);
            }
       }
   }, [confirmPassword, password, generalError]);


  const isFormValid = email && password && confirmPassword && termsChecked && validationErrors.length === 0 && password === confirmPassword;


  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setGeneralError(null); // Clear previous errors
    setSuccess(false); // Clear previous success message

    // Re-validate on submit just in case
    if (!isFormValid) {
         if (!email) setGeneralError("Please enter your email.");
         else if (!password) setGeneralError("Please enter a password.");
         else if (!confirmPassword) setGeneralError("Please confirm your password.");
         else if (password !== confirmPassword) setGeneralError("Passwords do not match.");
         else if (validationErrors.length > 0) setGeneralError("Please fix password errors.");
         else if (!termsChecked) setGeneralError("You must agree to the terms.");
        return; // Stop if form is not valid
    }


    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Successful signup: Show success message or redirect
      setSuccess(true);
      console.log('User signed up successfully!');
      // Optional: Redirect after a short delay
       setTimeout(() => navigate('/login'), 2000); // Redirect to dashboard after success
    } catch (error) {
      console.error('Error signing up:', error);
      // Display user-friendly error message
      switch (error.code) {
        case 'auth/email-already-in-use':
          setGeneralError('This email address is already in use.');
          break;
        case 'auth/weak-password': // This should ideally be caught by client-side validation first
          setGeneralError('Password is too weak (should be at least 6 characters).');
          break;
         case 'auth/invalid-email':
          setGeneralError('Invalid email format.');
          break;
        default:
          setGeneralError('Failed to sign up. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

   const handleGoogleSignup = async () => {
       setGeneralError(null); // Clear previous errors
       setSuccess(false); // Clear previous success message
       setLoading(true); // Show loading state

       const provider = new GoogleAuthProvider();
       try {
           const result = await signInWithPopup(auth, provider);
           // The signed-in user info.
           const user = result.user;
           console.log("Google signup successful:", user);
           // Redirect to dashboard after success
           navigate('/dashboard');

       } catch (error) {
           console.error("Error during Google signup:", error);
           // Handle Errors here.
           const errorCode = error.code;
           const errorMessage = error.message;
           // The email of the user's account used.
           const email = error.customData?.email; // Optional chaining
           // The AuthCredential type that was used.
           const credential = GoogleAuthProvider.credentialFromError(error); // Optional

           // Display user-friendly error
           if (errorCode === 'auth/account-exists-with-different-credential') {
               setGeneralError(`An account with this email already exists using a different login method. Please try logging in with your other method.`);
           } else {
                setGeneralError(`Google signup failed: ${errorMessage}`);
           }
       } finally {
           setLoading(false); // Hide loading state
       }
   };


  return (
     // Outer container for the split layout
     <div className="flex flex-col md:flex-row min-h-screen bg-dark-gradient">

        {/* Left Side - Animation Background */}
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
                <div className="flex justify-between items-center w-full">
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

                {/* Marketing Text (Middle/Bottom area) */}
                {/* Removed placeholder image */}
                <div className="flex flex-col items-center text-center text-white"> {/* Added margin bottom */}
                     
                    <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-extrabold font-['Nura']"><h1>Smarter Resumes for Smarter Job Search.</h1></span>
                     
                </div>
                 {/* This empty div pushes the content to justify-between */}
                 <div></div>

            </div>
        </div>

        {/* Right Side - Signup Form */}
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
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-brand-gray font-['Exo']">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-brand-purple hover:text-brand-purple-light underline">
                            Log in
                        </Link>
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleEmailSignup} noValidate> {/* noValidate disables browser default validation */}
                    {/* Name Fields - Use a grid for two columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first-name" className="sr-only">First Name</label>
                            <input
                                id="first-name"
                                name="firstName"
                                type="text"
                                autoComplete="given-name"
                                required
                                className="block w-full rounded-md border border-brand-gray-dark placeholder-brand-gray text-gray-light px-3 py-2 bg-brand-black text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="last-name" className="sr-only">Last Name</label>
                             <input
                                id="last-name"
                                name="lastName"
                                type="text"
                                autoComplete="family-name"
                                required
                                className="block w-full rounded-md border border-brand-gray-dark placeholder-brand-gray text-gray-light px-3 py-2 bg-brand-black text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

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
                            autoComplete="new-password"
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

                     {/* Password Validation Feedback */}
                     {validationErrors.length > 0 && (
                         <ul className="text-red-400 text-xs space-y-1 pl-4 list-disc font-['Exo']">
                             {validationErrors.map((error, index) => (
                                 <li key={`pass-error-${index}`}>{error}</li>
                             ))}
                         </ul>
                     )}

                    {/* Confirm Password Field (Added as it's standard with password validation) */}
                     <div>
                        <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type={passwordVisible ? 'text' : 'password'} // Match visibility toggle
                            autoComplete="new-password"
                            required
                            className="block w-full rounded-md border border-brand-gray-dark placeholder-brand-gray text-gray-light px-3 py-2 bg-brand-black text-sm focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                     </div>


                    {/* Terms Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-brand-gray-dark rounded bg-brand-black"
                            checked={termsChecked}
                            onChange={(e) => setTermsChecked(e.target.checked)}
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-brand-gray font-['Exo']">
                           I agree to the{' '}
                            <a href="/terms" className="text-brand-purple hover:text-brand-purple-light underline">Terms & Conditions</a>
                        </label>
                    </div>

                    {/* General Error Display */}
                    {generalError && (
                        <div className="text-red-500 text-sm text-center font-['Exo']">
                            {generalError}
                        </div>
                    )}

                    {/* Success Message */}
                     {success && (
                        <div className="text-green-500 text-sm text-center font-['Exo']">
                            Account created successfully!
                        </div>
                    )}


                    {/* Create Account Button */}
                    <div>
                         {/* Use the purple gradient background */}
                        <button
                            type="submit"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white font-['Exo']
                                bg-gradient-to-r from-brand-purple-dark to-brand-purple
                                hover:from-brand-purple hover:to-brand-purple-light
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple
                                ${loading || !isFormValid ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={loading || !isFormValid} // Disable if loading or form invalid
                        >
                            {loading ? 'Creating Account...' : 'Create account'}
                        </button>
                    </div>
                </form>

                {/* Separator */}
                <div className="relative flex justify-center text-sm">
                     <span className="bg-opacity-90 px-2 text-brand-gray font-['Exo']">
                       Or register with
                     </span>
                     {/* Use absolute positioning for the line */}
                    <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-t border-brand-gray-dark z-[-1]"></div>
                </div>


                {/* Social Sign-in Buttons (Google Only) */}
                <div className="flex flex-col space-y-3"> {/* Use flex-col and space-y for vertical stacking */}
                    {/* Google Button */}
                     <button
                         type="button" // Important: Type button
                         onClick={handleGoogleSignup}
                         className="w-full flex items-center justify-center px-4 py-2 border border-brand-gray-dark rounded-md shadow-sm text-sm font-medium text-white bg-brand-black hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gray-dark font-['Exo']"
                         disabled={loading} // Disable social login while loading
                     >
                         {/* Google Icon (replace with SVG or icon component) */}
                         {/* You might need to get an actual Google SVG or use a library */}
                         {/* For now, a placeholder or simple G */}
                         {/* <img src="/path/to/google-icon.svg" alt="Google logo" className="h-5 w-5 mr-2" /> */}
                         <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M23.518 12.208c0-.814-.073-1.495-.18-2.178H12V14.3h6.43c-.296 1.731-1.383 3.317-3.004 4.331v3.362h4.355c2.543-2.348 4.003-5.892 4.003-10.783z"/><path fill="#34A853" d="M12 24c3.24 0 5.934-1.073 7.91-2.91l-4.355-3.362c-1.201.803-2.76 1.28-4.555 1.28-3.537 0-6.539-2.37-7.621-5.605H.887v3.459C2.95 21.983 7.126 24 12 24z"/><path fill="#FBBC05" d="M4.379 14.302c-.25-.729-.395-1.506-.395-2.302 0-.797.145-1.573.395-2.302V6.241H.887C-.045 8.076-.28 10.09.146 12c-.427 1.91-.202 3.923.741 5.759L4.38 14.302z"/><path fill="#EA4335" d="M12 4.766c1.776 0 3.584.603 4.931 1.826l3.843-3.842C17.935 1.533 15.242 0 12 0 7.126 0 2.95 2.017.887 6.24l3.492 2.759C5.46 7.135 8.463 4.766 12 4.766z"/></svg>
                         Sign up with Google
                     </button>
                </div>

            </div>
        </motion.div>

     </div>
  );
};

export default Signup;