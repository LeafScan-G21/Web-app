import { Link, Outlet, useLocation } from "react-router-dom";
import { Plus, Home } from "lucide-react";
import { Button } from "../forum/Button.jsx";
import React from "react";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">
                LeafScan
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/"
                    ? "bg-green-600 text-green-600-foreground"
                    : "text-foreground hover:bg-accent"
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Recent Posts</span>
              </Link>
              <Link to="/new-post">
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>New Post</span>
                </Button>
              </Link>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/new-post">
                <Button size="sm" className="flex items-center space-x-1">
                  <Plus className="h-4 w-4" />
                  <span>Post</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-8 h-auto">{<Outlet />}</main>

      {/* Footer */}
      <footer className="bg-muted mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2025 LeafScan. Helping plants thrive together.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
