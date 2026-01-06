import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff, AlertCircle, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import Auth from "./Auth.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", formData);
      if (response.status === 201) {
        navigate("/login");
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
    <div className="min-h-screen bg-midnight text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 animate-move-grid" />
      <div className="absolute inset-0 grid-dots opacity-40 animate-move-grid [animation-duration:10s]" />

      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      {/* Close button */}
      <Link
        to="/"
        className="absolute top-8 left-8 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-20"
      >
        <X size={16} />
      </Link>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">voltspot</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Create account</h1>
          <p className="text-[13px] text-slate-400 font-medium">Join the future of EV charging today.</p>
        </div>

        <div className="glass-panel p-8 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-fade-in">
                <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-red-200 leading-relaxed font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-primary transition-colors font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-[11px] font-bold uppercase tracking-widest !rounded-xl mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">or</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <Auth />

          <p className="mt-6 text-center text-[11px] text-slate-500 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-bold hover:text-brand-primary transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
