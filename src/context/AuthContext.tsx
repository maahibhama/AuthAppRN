import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await AsyncStorage.getItem(email);
    if (user) {
      const userData = JSON.parse(user);
      if (userData.password === password) {
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string) => {
    try {   
    const existingUser = await AsyncStorage.getItem(email);
    console.log(existingUser);
    if (existingUser) {
      return false;
    }
    const newUser = { name, email, password, isAdmin: false };
    if (email.toLocaleLowerCase().includes('admin')) newUser.isAdmin = true;
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    await AsyncStorage.setItem(email, JSON.stringify(newUser));
    return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
