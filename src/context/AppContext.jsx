import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Create the context
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0); // Default to 0

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch credits");
    }
  };

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
  };

  useEffect(() => {
    if (token) loadCreditsData();
  }, [token]);

  return (
    <AppContext.Provider value={{ user, setUser, showLogin, setShowLogin, backendUrl, token, updateToken, credit, setCredit, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
