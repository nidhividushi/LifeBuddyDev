import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme Colors - Modern Glassmorphism
const lightTheme = {
  colors: {
    // Primary Colors
    primary: '#9333EA', // Purple
    primaryLight: '#A855F7',
    primaryDark: '#7C3AED',
    
    // Secondary Colors
    secondary: '#4F46E5', // Indigo
    secondaryLight: '#6366F1',
    secondaryDark: '#4338CA',
    
    // Accent Colors
    accent: '#F97316', // Orange
    accentLight: '#FB923C',
    accentDark: '#EA580C',
    
    // Background Colors
    background: '#0F0F23', // Dark blue-black
    surface: 'rgba(255, 255, 255, 0.1)',
    surfaceLight: 'rgba(255, 255, 255, 0.05)',
    surfaceDark: 'rgba(0, 0, 0, 0.3)',
    
    // Text Colors
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textTertiary: 'rgba(255, 255, 255, 0.5)',
    
    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Border Colors
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    
    // Gradient Colors
    gradientPrimary: ['#9333EA', '#4F46E5'],
    gradientSecondary: ['#F97316', '#EF4444'],
    gradientBackground: ['#0F0F23', '#1E1B4B'],
    gradientSurface: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
    
    // Glassmorphism Colors
    glass: 'rgba(255, 255, 255, 0.1)',
    glassLight: 'rgba(255, 255, 255, 0.05)',
    glassDark: 'rgba(0, 0, 0, 0.2)',
  },
  
  // Typography
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      light: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  // Border Radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
  
  // Animation
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
};

// Dark theme (same as light for now, but can be customized)
const darkTheme = {...lightTheme};

interface ThemeContextType {
  theme: typeof lightTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme

  useEffect(() => {
    // Load saved theme preference
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (theme: 'light' | 'dark') => {
    try {
      await AsyncStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    saveThemePreference(newTheme ? 'dark' : 'light');
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setIsDark(theme === 'dark');
    saveThemePreference(theme);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 