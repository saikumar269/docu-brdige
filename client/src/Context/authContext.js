import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const storedGuest = JSON.parse(localStorage.getItem("guest"));
    const storedCount = parseInt(localStorage.getItem("guestCount"), 10) || 0;

    if (storedUser && storedToken) {
      setUser(storedUser);
    } else if (storedGuest) {
      setIsGuest(true);
    }
    setGuestCount(storedCount);
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsGuest(false);
    setGuestCount(0);
    localStorage.removeItem("guest");
    localStorage.removeItem("guestCount");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    localStorage.removeItem("guestCount");
    setUser(null);
    setIsGuest(false);
    setGuestCount(0);
  };

  const startGuest = () => {
    localStorage.setItem("guest", "true");
    localStorage.setItem("guestCount", "0");
    setIsGuest(true);
    setGuestCount(0);
  };

  const incrementGuestCount = () => {
    const newCount = guestCount + 1;
    setGuestCount(newCount);
    localStorage.setItem("guestCount", newCount.toString());
    if (newCount >= 3) {
      setIsGuest(false);
      localStorage.setItem("guest", "false");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isGuest,
        startGuest,
        guestCount,
        incrementGuestCount,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
