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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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