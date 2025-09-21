<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import FloatingElements from "../components/animations/FloatingElements";
import MorphingShapes from "../components/animations/MorphingShapes";
import ParticleBackground from "../components/animations/ParticleBackground";
import PageTransition from "../components/animations/PageTransitions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);

    // --- Start of Mock API Call ---
    // In a real application, you would replace this with an actual API call.
    // Simulating network delay for demonstration
    setTimeout(() => {
      setIsLoading(false);
      // Mock login validation
      if (formData.email === 'user@example.com' && formData.password === 'password123') {
        navigate('/student-dashboard');
      } else {
        setError('Invalid email or password.');
      }
    }, 1500);
    // --- End of Mock API Call ---
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center px-4 py-8 font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue your innovation journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input 
                  type="checkbox" 
                  name="remember"
                  className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" 
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm transition-all duration-300 animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold transition-all shadow-lg ${
                isLoading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">or</span>
            </div>
          </div>

         

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Secure login with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
=======
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!form.email || !form.password) {
        setError("Please enter both email and password.");
      } else {
        // Here you would handle authentication
        setError("");
      }
    }, 1500);
  };

  return (
    <>
      <ParticleBackground particleCount={60} colorMode="modern" interactivity="attract" />
      <MorphingShapes shapeCount={4} colorMode="mixed" className="pointer-events-none" />
      <FloatingElements className="pointer-events-none" />
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center relative z-20">
          <Card
            variant="glass"
            padding="lg"
            shadow="glow"
            rounded="2xl"
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold text-center text-primary-600 mb-6">
              Welcome Back
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={handleChange}
                error={error && !form.email ? error : ""}
                size="md"
                variant="filled"
                autoFocus
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={handleChange}
                error={error && !form.password ? error : ""}
                size="md"
                variant="filled"
              />
              {error && form.email && form.password && (
                <div className="text-error-500 text-sm text-center">{error}</div>
              )}
              <Button
                type="submit"
                size="lg"
                variant="primary"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="sm" color="primary" /> : "Log In"}
              </Button>
            </form>
            <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
              <span>Don't have an account?</span>{" "}
              <Link
                to="/signup"
                className="text-primary-500 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </Card>
        </div>
      </PageTransition>
    </>
  );
};

export default Login;
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
