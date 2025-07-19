import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import carImage from "../assets/car.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rememberMe) {
      toast.error("Please check the remember me checkbox to continue");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      if (response.status === 200) {
        login(response.data);
        navigate("/home", { state: { message: "Login successful!" } });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Close button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </Link>

      {/* Left Section - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">VoltSpot</span>
              </div>
              <select className="text-sm text-gray-400 bg-transparent border-none outline-none">
                <option>English</option>
              </select>
            </div>
            
            <h1 className="text-2xl font-light text-white mb-2">Welcome!</h1>
            <p className="text-sm text-gray-400">Login to VoltSpot to continue to VoltSpot.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {error && (
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-300 font-light leading-snug">
                  {error}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-0 py-4 bg-transparent border-0 border-b-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base transition-colors"
                placeholder="Email"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-0 py-4 pr-12 bg-transparent border-0 border-b-2 border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-base transition-colors"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-0 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-gray-700 text-purple-500 focus:ring-purple-500 bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border-0 rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-12"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-12">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Visual */}
      <div className="flex-1 bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Car Image Background */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src={carImage} 
            alt="Electric Vehicle" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="text-center text-white relative z-10">
          <div className="text-4xl font-light mb-4">Welcome back</div>
          <div className="text-lg text-gray-400 mb-8 max-w-sm">Your simple EV charging solution</div>
          <div className="w-16 h-1 bg-purple-500 mx-auto mb-8"></div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
