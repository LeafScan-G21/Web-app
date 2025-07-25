import React, { useState } from 'react'
import logo from '../assets/leafScan.png'
import { Mail, User,Lock, Eye, EyeOff } from 'lucide-react'
import FormField from '../components/ui/FormField'
import PasswordField from '../components/ui/PasswordField'
import FullWidthButton from '../components/ui/FullWidthButton'

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAndConditions, setTermsAndConditions] = useState(false);

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
            <FormField htmlFor="first_name" label="First Name" Icon={User} input_type="text" id="first_name" value={first_name} onChange={(e) => {setFirstName(e.target.value)}} placeholder="Enter your first name" />
            <FormField htmlFor="last_name" label="Last Name" Icon={User} input_type="text" id="last_name" value={last_name} onChange={(e) => {setLastName(e.target.value)}} placeholder="Enter your last name" />
            <FormField htmlFor="email" label="Email" Icon={Mail} input_type="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email address" />
            <PasswordField htmlFor="password" label="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /> 
            <PasswordField htmlFor = "confirm_password" label="Confirm Password" id="confirm_password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} placeholder="Confirm Your Password" />
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
            <FullWidthButton onClick={(e) => {e.preventDefault()}} body="Create an Account" />
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

export default Register