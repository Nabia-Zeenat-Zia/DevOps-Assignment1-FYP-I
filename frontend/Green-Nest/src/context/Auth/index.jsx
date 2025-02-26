import React, { createContext, useContext, useState, useCallback } from "react";
import CreateAxiosInstance from "../../utils/AxiosInstance";
import { storeAuthToken, clearAuthToken } from "../../utils/TokenManager";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosInstance = CreateAxiosInstance();

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", userData);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error registering user:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", userData);

      const { token, user } = response.data;
      await storeAuthToken(token);
      setUser(user);

      return { success: true, data: { token, user } };
    } catch (error) {
      console.error("Error logging in:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/verify");

      const { user } = response.data;
      setUser(user);

      return { success: true, user };
    } catch (error) {
      console.error("Error verifying token:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      if (
        error.response?.status === 401 &&
        (errorMessage === "Invalid token" ||
          errorMessage === "Token has expired")
      ) {
        setUser(null);
        await clearAuthToken();
      }
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [axiosInstance]);

  const logout = async () => {
    setLoading(true);
    try {
      await clearAuthToken();
      setUser(null);

      return { success: true };
    } catch (error) {
      console.error("Error logging out:", error);
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (email) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/send", { email });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/verify-otp", data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error resetting password:", error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const ContextValues = {
    user,
    loading,
    register,
    login,
    verifyToken,
    logout,
    sendOTP,
    verifyOTP,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={ContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
