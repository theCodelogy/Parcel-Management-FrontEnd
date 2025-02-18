import React, { useState } from "react";
import { FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

interface AuthState {
  isLogin: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  loading: boolean;
}

const AuthForm: React.FC = () => {
  const [state, setState] = useState<AuthState>({
    isLogin: true,
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    showPassword: false,
    showConfirmPassword: false,
    loading: false,
  });

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string): boolean => password.length >= 8;

  const validateConfirmPassword = (): boolean =>
    state.password === state.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setState({ ...state, loading: true });

    setTimeout(() => {
      setState({ ...state, loading: false });
      alert(state.isLogin ? "Logged in successfully!" : "Registered successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      {/* Left Form */}
      <div className="w-full lg:w-1/2 flex justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              {state.isLogin ? (
                <FaSignInAlt className="text-red-600 text-lg" />
              ) : (
                <FaUserPlus className="text-red-600 text-lg" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {state.isLogin ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-gray-600 mt-2">
              {state.isLogin
                ? "Please sign in to continue"
                : "Get started with your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!state.isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="you@example.com"
                />
                <FaEnvelope className="absolute right-2 top-2 w-5 h-5 text-gray-400" />
              </div>
              {state.email && !validateEmail(state.email) && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={state.showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setState({ ...state, showPassword: !state.showPassword })
                  }
                >
                  {state.showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {state.password && !validatePassword(state.password) && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {!state.isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={state.showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setState({ ...state, showConfirmPassword: !state.showConfirmPassword })
                    }
                  >
                    {state.showConfirmPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {state.confirmPassword && !validateConfirmPassword() && (
                  <p className="mt-1 text-sm text-red-600">
                    Passwords do not match
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#d63384] text-white py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
              disabled={state.loading}
            >
              {state.loading ? "Processing..." : state.isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              {state.isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="text-[#d63384] font-semibold ml-2"
                onClick={() => setState({ ...state, isLogin: !state.isLogin })}
              >
                {state.isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block lg:w-1/2">
        <img
          src="https://cte.fitspick.com/public/images/default/we-courier-process.png"
          alt="Process"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
