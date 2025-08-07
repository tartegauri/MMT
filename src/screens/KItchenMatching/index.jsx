import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const KitchenMatching = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const tossAnim = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Looping toss animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(tossAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(tossAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar (JS driver only)
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && navigation) {
        navigation.replace('KitchenResult');
      }
    });
  }, [tossAnim, progress, navigation]);

  // Tiffin 1: toss up right, rotate, down left
  const tiffin1Style = {
    transform: [
      { perspective: 800 },
      { translateX: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 40, -40] }) },
      { translateY: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -60, 0] }) },
      { rotate: tossAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) },
      { scale: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.15, 1] }) },
    ],
  };
  // Tiffin 2: toss up left, rotate, down right
  const tiffin2Style = {
    transform: [
      { perspective: 800 },
      { translateX: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -40, 40] }) },
      { translateY: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, -60, 0] }) },
      { rotate: tossAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] }) },
      { scale: tossAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.15, 1] }) },
    ],
  };

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tiffinRow}>
        <Animated.Image
          source={require('../../assets/Tiffin.png')}
          style={[styles.tiffinImg, tiffin1Style]}
          resizeMode="contain"
        />
        <Animated.Image
          source={require('../../assets/Tiffin.png')}
          style={[styles.tiffinImg, tiffin2Style]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBorder}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Hang tight, Tabish !</Text>
      <Text style={[styles.subtitle, { color: theme === 'dark' ? colors.textPrimary : '#888' }]}>
        We're Finding kitchens made for you
      </Text>
    </View>
  );
};

const ORANGE = '#FF6F3C';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tiffinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 32,
    marginTop: -40,
  },
  tiffinImg: {
    width: 80,
    height: 90,
    marginHorizontal: 0,
    position: 'relative',
  },
  progressBarContainer: {
    width: 200,
    marginBottom: 32,
  },
  progressBarBorder: {
    width: '100%',
    height: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: ORANGE,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: ORANGE,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default KitchenMatching;
