import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/leafScan.png'
import { Mail, User} from 'lucide-react'
import FormField from '../components/ui/FormField'
import PasswordField from '../components/ui/PasswordField'
import FullWidthButton from '../components/ui/FullWidthButton'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAndConditions, setTermsAndConditions] = useState(false);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [tandcerror, setTandcError] = useState("");
    const navigate = useNavigate();
    
    const AUTH_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFirstNameError("");
        setLastNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setTandcError("");
        let valid = true;
        if (!first_name) {
            setFirstNameError("First name is required");
            valid = false;
        } 
        if (!last_name) {
            setLastNameError("Last name is required");
            valid = false;
        }
        if (!email) {
            setEmailError("Email is required");
            valid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email address");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            valid = false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            valid = false;
        }
        if (!termsAndConditions) {
            setTandcError("Please agree to the terms and conditions");
            valid = false;
        }
        if (!valid) return;

        const formData = {
            first_name,
            last_name,
            email,
            password,
        };
        try{
            const response = await axios.post(`${AUTH_URL}/users/register`, formData);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                if (error.response.data.detail === "Email already registered") {
                    setEmailError("Email is already registered");
                } else {
                    setTandcError("Network Error. Please try again.");
            }
        }
    }
}

    return (
    <div className='min-h-screen bg-[#f9fbf9] flex items-center justify-center px-4'>
        <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>
            <div className='text-center mb-8'>
                {/* Header Section */}
                <div className='iniline-flex items-center justify-center w-full h-16 block px-[43%]'>
                    <img src={logo} alt='LeafScan Logo' className='w-12 h-12 mx-auto' />
                </div>
                <h1 className='text-2xl font-semibold text-green-700 mb-2 text-center'>Create Your Account</h1>
                <p className='text-gray-600'>Join LeafScan to start diagnosing your plants</p>
            </div>
            {/* SignUp form */}
            <div className='space-y-6'>
                <FormField htmlFor="first_name" label="First Name" Icon={User} input_type="text" id="first_name" value={first_name} onChange={(e) => {setFirstName(e.target.value)}} placeholder="Enter your first name" error={firstNameError} />
                <FormField htmlFor="last_name" label="Last Name" Icon={User} input_type="text" id="last_name" value={last_name} onChange={(e) => {setLastName(e.target.value)}} placeholder="Enter your last name" error={lastNameError}/>
                <FormField htmlFor="email" label="Email" Icon={Mail} input_type="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email address" error={emailError}/>
                <PasswordField htmlFor="password" label="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" error={passwordError}/> 
                <PasswordField htmlFor = "confirm_password" label="Confirm Password" id="confirm_password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm Your Password" error={confirmPasswordError}/>
                <div className='flex items-center justify-between'>
                    <label className='flex items-center'>
                        <input 
                            type='checkbox' 
                            id="termsandconditions"
                            checked = {termsAndConditions}
                            onChange={(e) => setTermsAndConditions(e.target.checked)}
                            className='h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500'
                        />
                        <span className='ml-2 text-sm text-gray-600'>I agree to the <a className='text-green-700 font-semibold'>Terms of Service</a> and <a className='text-green-700 font-semibold'>Privacy Policy</a></span>
                    </label>
                </div>
                {tandcerror && (
                        <div className='block text-red-600 text-sm mt-1'>{tandcerror}</div>
                    )}
                <FullWidthButton onClick={handleSubmit} body="Create an Account" />
                <div className='relative my-4'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm text-gray-500'>
                        <span className='bg-white px-4'>ALREADY HAVE AN ACCOUNT?</span>
                    </div>
                    
                </div>
                    <a href='/login' className='block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-200'>Sign In Instead</a>
                </div>
            </div>
        </div>
  )
}

export default Register;