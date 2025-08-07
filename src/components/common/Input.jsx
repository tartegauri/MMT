import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const BG_GRAY = '#F3F3F3';
const TEXT_DARK = '#FFFFF';

const Input = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={'#888'}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: BG_GRAY,
    color: TEXT_DARK,
    borderRadius: 30,
    height: 56,
    paddingHorizontal: 18,
    fontSize: 16,
  },
});

export default Input; 