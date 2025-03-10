import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAxiosInterceptor from "../../GlobalVariables/useAxiousInterceptor";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const axiosInstance = useAxiosInterceptor();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["auth_token", "user_Id"]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigateRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(`/api/auth/login`, formData);
      if (response.data.token) {
        setCookie("auth_token", response.data.token, {
          path: "/",
          maxAge: 604800,
        });
        setCookie("user_Id", response.data.userId, {
          path: "/",
          maxAge: 604800,
        });
        setMessage(response.data.message || "Login successful!");
        navigate("/");
      }
      setFormData({ email: "", password: "" });
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message || "An error occurred during login"
        );
      } else if (error.request) {
        setMessage("Network error. Please check your connection.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email"
              aria-describedby="email-description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
                aria-describedby="password-description"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-4 bg-[#2A3674] text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-blue-300"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline"
            onClick={navigateRegister}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
