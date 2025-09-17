import React, { useState } from 'react';
import { Mail, RotateCcw, ArrowLeft, AlertCircle } from 'lucide-react';
import {supabase} from '../services/auth/supabaseClient'



export default function ForgotPassword() {
  const [step, setStep] = useState('form'); 
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, 
      });

      if (error) {
        setError(error.message);
      } else {
        setStep('confirmation');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    window.location.href = '/login';
  };

  const handleTryDifferentEmail = () => {
    setStep('form');
    setEmail('');
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && !isLoading) {
      handleSubmit();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = email && validateEmail(email);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === 'form' ? (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
              Reset Password
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Enter your email to receive a password reset link
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                  />
                </div>
                {email && !validateEmail(email) && (
                  <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading || !isEmailValid}
                className="w-full py-3 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>

            {/* Back to Login */}
            <button
              onClick={handleBackToLogin}
              className="w-full mt-6 flex items-center justify-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
              Check Your Email
            </h1>
            <p className="text-center text-gray-600 mb-2">
              We've sent a password reset link to{' '}
              <span className="font-medium text-gray-900">{email}</span>
            </p>
            <p className="text-center text-gray-500 text-sm mb-8">
              If you don't see the email in your inbox, please check your spam folder.
            </p>

            {/* Try Different Email */}
            <button
              onClick={handleTryDifferentEmail}
              className="w-full py-3 px-4 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-4"
            >
              Try a different email
            </button>

            {/* Back to Login */}
            <button
              onClick={handleBackToLogin}
              className="w-full flex items-center justify-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}