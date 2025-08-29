// src/styles/styles.js

const fonts = {
  regular: 'Gilroy-Regular',
  semiBold: 'Gilroy-SemiBold',
  bold: 'Gilroy-Bold',
};

const fontSizes = {
  title: 22,      // For main headlines
  subtitle: 17,   // For subheadings (Material 'titleMedium': 16/17)
  label: 15,      // For input field labels (Material 'labelLarge': 14/15)
  input: 16,      // For text inside input boxes (Material 'bodyLarge': 16)
  button: 17,     // For button text (consistent with subtitle)
};

const lightColors = {
  primary: '#FF6F3C',
  secondary: '#FFFFFF',
  background: '#F5F5F5',
  textPrimary: '#111',
};

const darkColors = {
  primary: '#FF6F3C',
  secondary: '#181818',
  background: '#101010',
  textPrimary: '#FFFFFF',
};

const spacing = {
  small: 8,
  medium: 16,
  large: 32,
};

export { lightColors, darkColors, fontSizes, fonts, spacing };
