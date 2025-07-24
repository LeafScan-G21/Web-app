import React, { useState } from 'react'
import logo from '../assets/leafScan.png'; 
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import FormField from '../components/ui/FormField';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
  return (
    <div className='min-h-screen bg-[#f9fbf9] flex items-center justify-center px-4'>
        <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>
            {/* Header Section */}
            <div className='text-center mb-8'>
                <div className='iniline-flex items-center justify-center w-full h-16 block px-[43%]'>
                    <img src={logo} alt="LeafScan Logo" className="w-12 h-12" />
                </div>
                <h1 className='text-2xl font-semibold text-green-700 mb-2'>Welcome Back</h1>
                <p className='text-gray-600'>Sign in to your LeafScan Account</p>
            </div>
            {/* Login Form */}
            <div className='space-y-6'>
                <FormField htmlFor="email" label="Email Address" Icon={Mail} input_type="email" id="email" value={email} onChange = {(e) => setEmail(e.target.value)}  placeholder="Enter your email" />               
                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                    <div className='relative'>
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all'
                            placeholder='Enter your password'
                        />
                        <button 
                            type='button' 
                            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-gray-400 hover:text-gray-600'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className='h-5 w-5' />
                            ) : (
                                <Eye className='h-5 w-5' />
                            )}
                        </button>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <label className='flex items-center'>
                        <input 
                            type='checkbox' 
                            id='rememberme'
                            checked = {rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className='h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500'
                        />
                        <span className='ml-2 text-sm text-gray-600'>Remember me</span>
                    </label>
                    <a href="#" className='text-sm text-green-600 hover:tect-green-700 font-medium'>Forgot Password?</a>
                </div>
                <button onClick={(e) => {e.preventDefault();}} className='w-full bg-green-700 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                    Sign In
                </button>
                <div className='relative my-6'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm text-gray-500'>
                        <span className='bg-white px-4'>OR CONTINUE WITH</span>
                    </div>
                </div>

                {/* Continue as guest button */}
                <button type='button' className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-200'>
                    Continue as Guest
                </button>

                {/* Sign in Button */}
                <div className='text-center pt-4'>
                    <span className='text-sm text-gray-600'>Don't have an account? </span>
                    <a href="/register" className='text-green-600 hover:text-green-700 font-medium'>Sign Up here</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login