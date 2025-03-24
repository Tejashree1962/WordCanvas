import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create the context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0); // default credits to 0

  // Retrieve backend URL from environment or use default
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Function to load credits data from the backend
  const loadCreditsData = async () => {
    try {
      // === Debug Logging Start ===
      console.log("Loading credits...");
      console.log("Backend URL:", backendUrl);
      console.log("Token:", token);
      // === Debug Logging End ===

      // Send the GET request with the proper headers
      const response = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` }, // or use: headers: { token }
      });

      // === Debug Logging: Log API response ===
      console.log("API Response:", response.data);

      const data = response.data;
      if (data.success) {
        console.log("Credits fetched successfully:", data.credits);
        setCredit(data.credits);
        setUser(data.user);
      } else {
        console.error("API returned failure:", data);
        toast.error("Failed to load credits");
      }
    } catch (error) {
      console.error("Credits API Error:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Headers:", error.response.headers);
      }
      toast.error(error.response?.data?.message || "Failed to fetch credits");
    }
  };

  // Function to update token in state and localStorage
  const updateToken = (newToken) => {
    console.log("Updating token to:", newToken);
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Logout function clears token, user, and credits
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  // Whenever token changes, try to load the user's credits
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        updateToken,
        credit,
        setCredit,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
