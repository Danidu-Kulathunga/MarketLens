import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { MOCK_USERS } from '@/data/mock/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'marketlens_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default to Alex Silva (Market Analyst) for immediate exploration
    return MOCK_USERS[0];
  });

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = (email?: string, _password?: string, targetRole?: UserRole): boolean => {
    let matchedUser: User | undefined;
    if (targetRole) {
      matchedUser = MOCK_USERS.find(u => u.role === targetRole);
    } else if (email) {
      matchedUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!matchedUser) {
      matchedUser = MOCK_USERS[0]; // fallback
    }

    setUser(matchedUser);
    setSessionExpired(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchRole = (role: UserRole) => {
    const target = MOCK_USERS.find(u => u.role === role);
    if (target) {
      setUser(target);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && !sessionExpired,
        login,
        logout,
        switchRole,
        sessionExpired,
        setSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
