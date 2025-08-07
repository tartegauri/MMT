import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors } from '../styles/styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(null); // 'light', 'dark', or null for system

  useEffect(() => {
    // Load theme from AsyncStorage
    AsyncStorage.getItem('theme').then(storedTheme => {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }
    });
  }, []);

  const setAppTheme = async newTheme => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const colorScheme = theme || systemColorScheme;
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme: colorScheme, setAppTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
