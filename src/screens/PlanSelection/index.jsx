import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const PlanSelection = ({ navigation }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <Animated.View style={[styles.container, { backgroundColor: colors.background, opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}> 
      <Text style={[styles.title, { color: colors.textPrimary }]}>What are you looking for right now?</Text>
      <Text style={styles.subtitle}>
        Daily? Weekly? Monthly?{"\n"}
        She’ll make it fresh either way.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KitchenMatching')}>
        <Text style={styles.buttonText}>Currently trying with One meal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>7-day plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Monthly subscription</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#888',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FFD54F',
    borderRadius: 20,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 25
  },
  buttonText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlanSelection;
