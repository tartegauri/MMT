import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  const { theme, setAppTheme } = useTheme();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (navigation && navigation.replace) {
        navigation.replace('Login');
      }
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigation]);

  const toggleTheme = () => {
    setAppTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <LinearGradient
      colors={["#FFB07C", "#FF3C00"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Animated.View
        style={[
          styles.centerWrapper,
          {
            opacity: fadeAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.rowHorizontal}>
          <Image
            source={require('../../assets/MMTlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.momMade}>mom made</Text>
            <Text style={styles.tiffins}>tiffins</Text>
            <Text style={styles.tagline}>Ghar jaisa khana, jahan bhi ho.</Text>
          </View>
        </View>
      </Animated.View>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
  },
  rowHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.28,
    height: height * 0.16,
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  momMade: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  tiffins: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 38,
    marginBottom: 2,
  },
  tagline: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  themeButton: {
    marginBottom: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 2,
  },
  themeButtonText: {
    color: '#FF3C00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Onboarding;
