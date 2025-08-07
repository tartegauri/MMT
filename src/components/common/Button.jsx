import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

// Lighter orange for disabled state
const DISABLED_ORANGE = '#FFB07A';

const Button = ({ text, onPress, disabled, style, textStyle, ...props }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? DISABLED_ORANGE : colors.primary },
        style,
      ]}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default Button;
