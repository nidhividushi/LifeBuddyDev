import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: string;
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token && userData) {
        // TODO: Validate token with backend
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://example.com/avatar.jpg',
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store authentication data
      await AsyncStorage.setItem('authToken', mockToken);
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, simulate API call with dummy data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      };
      
      const mockToken = 'mock-jwt-token';
      
      // Store authentication data
      await AsyncStorage.setItem('authToken', mockToken);
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear authentication data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = {...user, ...userData};
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw new Error('Failed to update user');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 