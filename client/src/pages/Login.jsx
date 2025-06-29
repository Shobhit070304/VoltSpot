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
  Github,
} from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";

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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden isolate">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[120px] opacity-40 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-900/15 rounded-full blur-[100px] opacity-30 animate-float-delay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 to-transparent"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Refined header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-800/60 to-gray-900/40 backdrop-blur-lg rounded-2xl mb-6 border border-gray-800/30 shadow-sm">
            <Zap className="h-5 w-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-medium text-gray-100 mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-gray-500 font-light tracking-wide">
            Sign in to your account
          </p>
        </div>

        {/* Elevated form container */}
        <div className="bg-gray-900/40 backdrop-blur-lg rounded-xl border border-gray-800/30 p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3 backdrop-blur-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-300 font-light leading-snug">
                  {error}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-800/50 rounded-lg text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-sm font-light transition-all duration-150"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-indigo-400 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2.5 bg-gray-900/50 border border-gray-800/50 rounded-lg text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-sm font-light transition-all duration-150"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500 hover:text-indigo-400 transition-colors" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500 hover:text-indigo-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-3.5 w-3.5 rounded border-gray-700 text-indigo-500 focus:ring-indigo-500 bg-gray-800"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-gray-400 font-light"
                >
                  Remember me
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gray-900/40 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center py-2 px-3 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 rounded-lg text-sm font-light text-gray-300 transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-2 px-3 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 rounded-lg text-sm font-light text-gray-300 transition-colors"
            >
              {/* <Google className="h-4 w-4 mr-2" /> */}
              Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 font-light">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
