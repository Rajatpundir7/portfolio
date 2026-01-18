import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const CREDENTIALS = {
  username: 'rajat pundir',
  password: '8445'
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_auth');
    if (saved === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username, password) => {
    if (username.toLowerCase() === CREDENTIALS.username.toLowerCase() && 
        password === CREDENTIALS.password) {
      setIsLoggedIn(true);
      localStorage.setItem('portfolio_auth', 'true');
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('portfolio_auth');
  };

  const openLogin = () => setShowLoginModal(true);
  const closeLogin = () => setShowLoginModal(false);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      showLoginModal,
      login,
      logout,
      openLogin,
      closeLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
