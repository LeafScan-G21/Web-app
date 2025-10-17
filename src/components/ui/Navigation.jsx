/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User, LogOut, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/leafScan.png";
import { supabase } from "../../services/auth/supabaseClient";

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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 py-3 shadow-sm"
    >
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 p-1 ring-2 ring-green-200 group-hover:ring-green-300 transition-all duration-300"
            >
              <img src={logo} alt="LeafScan Logo" className="w-12 h-12" />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent"
            >
              LeafScan
            </motion.span>
          </Link>

          {user ? (
            // Authenticated user navigation
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
                >
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/diagnosis"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
                >
                  Diagnosis
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/forum"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group"
                >
                  Community
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:bg-green-50 p-2 rounded-xl transition-all duration-200 border border-transparent hover:border-green-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center ring-2 ring-green-100 shadow-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-green-100 py-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50 pointer-events-none"></div>
                      <Link
                        to="/account"
                        onClick={() => setIsDropdownOpen(false)}
                        className="relative flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-green-100 transition-colors group"
                      >
                        <User className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">My Account</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="relative flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 transition-colors w-full text-left group"
                      >
                        <LogOut className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // Guest navigation
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="/login"
                onClick={handleLoginClick}
                className="text-gray-700 px-4 py-2 hover:bg-green-50 font-medium transition-all duration-200 rounded-xl border border-transparent hover:border-green-200"
              >
                Login
              </motion.a>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
