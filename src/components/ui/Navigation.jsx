import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, LogOut } from 'lucide-react';
import logo from '../../assets/leafScan.png';
import { supabase } from '../../services/auth/supabaseClient';

export const Navigation = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Check current session
        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };
        
        checkUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLoginClick = async (e) => {
        e.preventDefault();
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsDropdownOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 py-3">
            <div className='container mx-auto px-10'>
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className='rounded-lg'>
                            <img src={logo} alt="LeafScan Logo" className="w-12 h-12" />
                        </div>
                        <span className="text-2xl font-bold text-green-800">
                            LeafScan
                        </span>
                    </Link>

                    {user ? (
                        // Authenticated user navigation
                        <div className='flex items-center space-x-6'>
                            <Link 
                                to="/dashboard" 
                                className="text-gray-700 hover:text-green-800 font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link 
                                to="/diagnosis" 
                                className="text-gray-700 hover:text-green-800 font-medium transition-colors"
                            >
                                Diagnosis
                            </Link>
                            <Link 
                                to="/forum" 
                                className="text-gray-700 hover:text-green-800 font-medium transition-colors"
                            >
                                Community
                            </Link>
                            
                            {/* Profile Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:bg-green-100 p-2 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                                        <Link
                                            to="/account"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors"
                                        >
                                            <User className="w-4 h-4" />
                                            <span>My Account</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors w-full text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Guest navigation
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
                    )}
                </div>
            </div>
        </nav>
    );
}