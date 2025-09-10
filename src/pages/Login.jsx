import React, { useState} from "react";
import logo from "../assets/leafScan.png";
import { Mail } from "lucide-react";
import FormField from "../components/ui/FormField";
import PasswordField from "../components/ui/PasswordField";
import FullWidthButton from "../components/ui/FullWidthButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/auth/supabaseClient";
import googleLogo from "../assets/google.png";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let valid = true;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }

    setSession(data.session);
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) toast.error(error.message);
  };


  return (
    <div className="min-h-screen bg-[#f9fbf9] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="iniline-flex items-center justify-center w-full h-16 block px-[43%]">
            <img src={logo} alt="LeafScan Logo" className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-semibold text-green-700 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your LeafScan Account</p>
        </div>
        {/* Login Form */}
        <div className="space-y-6">
          <FormField
            htmlFor="email"
            label="Email Address"
            Icon={Mail}
            input_type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            error={emailError}
          />
          <PasswordField
            htmlFor="password"
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            error={passwordError}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                id="rememberme"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-green-600 hover:tect-green-700 font-medium"
            >
              Forgot Password?
            </a>
          </div>
          <FullWidthButton onClick={handleSubmit} body="Sign In" />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm text-gray-500">
              <span className="bg-white px-4">OR CONTINUE WITH</span>
            </div>
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full border border-gray-300 border-solid cursor-pointer font-semibold py-3 px-4 rounded-lg hover:bg-gray-50"
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5 inline-block mr-2" />
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-200"
          >
            Continue as Guest
          </button>

          <div className="text-center pt-4">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
            </span>
            <a
              href="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Sign Up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
