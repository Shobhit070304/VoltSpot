import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../services/api.js";
import carImage from "/car.png";
import Auth from "./Auth.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
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
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      if (response.status === 200) {
        login(response.data);
        navigate("/", { state: { message: "Login successful!" } });
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 text-gray-900 flex">
      {/* Close button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 p-2 rounded-lg text-orange-400 hover:text-orange-600 transition-colors"
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
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  VoltSpot
                </span>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome!
            </h1>
            <p className="text-xs text-orange-500">
              Login to VoltSpot to continue.
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {error && (
              <div className="bg-red-100 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-500 font-light leading-snug">
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
                className="block w-full px-0 py-3 bg-transparent border-0 border-b-2 border-orange-200 text-gray-900 placeholder-orange-300 focus:outline-none focus:border-orange-400 text-sm transition-colors"
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
                  className="block w-full px-0 py-3 pr-10 bg-transparent border-0 border-b-2 border-orange-200 text-gray-900 placeholder-orange-300 focus:outline-none focus:border-orange-400 text-sm transition-colors"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-0 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-orange-300 hover:text-orange-500 transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-orange-300 hover:text-orange-500 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border-0 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-8"
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
            <div className="text-center mt-8">
              <p className="text-xs text-orange-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-600 hover:text-orange-800 transition-colors font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>

          {/* OAuth Separator */}
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-orange-200"></div>
            <span className="px-3 text-xs text-orange-400">or continue with</span>
            <div className="flex-1 border-t border-orange-200"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-2">
            <Auth />
          </div>
        </div>
      </div>
      {/* Right Section - Visual */}
      <div className="flex-1 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center relative overflow-hidden">
        {/* Car Image Background */}
        <div className="absolute inset-0 opacity-30">
          <img
            src={carImage}
            alt="Electric Vehicle"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Content */}
        <div className="text-center text-orange-700 relative z-10">
          <div className="text-2xl font-semibold mb-3">Welcome back</div>
          <div className="text-sm text-orange-400 mb-6 max-w-sm">
            Your simple EV charging solution
          </div>
          <div className="w-12 h-1 bg-orange-400 mx-auto mb-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
