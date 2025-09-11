import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/leafScan.png';
import { supabase } from '../../services/auth/supabaseClient';

export const Navigation = () => {
    const navigate = useNavigate();

    const handleLoginClick = async (e) => {
        e.preventDefault();
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className='container mx-auto px-10'>
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3">
                    <div className='rounded-lg'>
                        <img src={logo} alt="LeafScan Logo" className="w-12 h-12 mt-5" />'
                    </div>
                    <span className="text-2xl font-bold text-green-800">
                        LeafScan
                    </span>
                </Link>

                <div className='flex items-center space-x-6'> 
                    <a
                        href="/login"
                        onClick={handleLoginClick}
                        className="text-gray-700 p-2 hover:bg-green-100 font-medium transition-colors rounded-lg"
                    >
                        Login
                    </a>
                    <Link to="/register">
                        <button className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  );
}