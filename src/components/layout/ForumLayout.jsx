/* eslint-disable no-unused-vars */
import { Link, Outlet, useLocation } from "react-router-dom";
import { Plus, Home, MessageSquare, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../forum/Button.jsx";
import logo from "../../assets/leafScan.png";

import React from "react";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/95 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-100 to-emerald-100 p-1 rounded-lg ring-2 ring-green-200 group-hover:ring-green-300 transition-all duration-300"
              >
                <img
                  src={logo}
                  alt="LeafScan Logo"
                  className="h-10 w-10 rounded-lg"
                />
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              >
                LeafScan
              </motion.span>
            </Link>

            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:flex items-center space-x-6"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/forum"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 relative group ${
                    location.pathname === "/forum"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                      : "text-gray-700 hover:text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Recent Posts</span>
                  {location.pathname !== "/forum" && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
                  )}
                </Link>
              </motion.div>
              <Link to="/forum/add">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-5 py-2.5 font-medium">
                    <Plus className="h-4 w-4" />
                    <span>New Post</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.nav>

            {/* Mobile menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:hidden flex items-center space-x-2"
            >
              <Link to="/forum/add">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="sm"
                    className="flex items-center space-x-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg rounded-xl px-4 py-2 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Post</span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 pb-8 h-auto"
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 mt-16 border-t border-green-100"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo and Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-1.5 rounded-lg ring-2 ring-green-200">
                <img
                  src={logo}
                  alt="LeafScan Logo"
                  className="h-8 w-8 rounded-lg"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                LeafScan
              </span>
            </motion.div>

            {/* Footer Text */}
            <div className="text-center">
              <p className="text-gray-600 font-medium flex items-center justify-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                © 2025 LeafScan. Helping plants thrive together.
                <Leaf className="w-4 h-4 text-green-600" />
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Layout;
