import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
  Platform,
  AppState,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const GetLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';

  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [fetchedCoords, setFetchedCoords] = useState(null); 

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

    initLocationOnMount();

  }, [fetchedCoords]);

  useFocusEffect(
    React.useCallback(() => {
      checkAndRequestPermissionIfNeeded();
    }, [])
  );

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        checkAndRequestPermissionIfNeeded();
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, []);

  const getLocationPermission = () => {
    return Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  };

  const checkAndRequestPermissionIfNeeded = async () => {
    try {
      const permission = getLocationPermission();
      const status = await check(permission);
      setPermissionStatus(status);

      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        return await requestLocationPermission();
      }
    } catch (error) {
      console.error('❌ Permission check error:', error);
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsRequestingPermission(true);
      const permission = getLocationPermission();
      const status = await request(permission);
      setPermissionStatus(status);

      if (status === RESULTS.GRANTED) {
        return true;
      } else if (status === RESULTS.BLOCKED) {
        Alert.alert(
          'Location Permission Blocked',
          'Please enable location access in settings to continue.',
          [
            { text: 'Open Settings', onPress: openSettings },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      }
      return false;
    } catch (error) {
      console.error('❌ Request permission error:', error);
      return false;
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error('❌ Location error:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const initLocationOnMount = async () => {
    const granted = await checkAndRequestPermissionIfNeeded();
    if (!granted) return;
    try {
      const coords = await getCurrentLocation();
      setFetchedCoords(coords);
    } catch (error) {
      console.warn('⚠️ Could not fetch initial location on mount:', error);
    }
  };

  const handleUseCurrentLocation = async () => {
    const granted = await checkAndRequestPermissionIfNeeded();
    if (!granted) return;

    try {
      const coords = await getCurrentLocation();
      navigation.navigate('MapLocation', {
        name,
        initialLocation: coords,
      });
    } catch (error) {
      Alert.alert(
        'Location Error',
        'Unable to fetch your location. Try again or enter manually.',
        [
          { text: 'Retry', onPress: handleUseCurrentLocation },
          { text: 'Enter Manually', onPress: () => navigation.navigate('ManualLocation', { name, coordinates: fetchedCoords }) },
        ]
      );
    }
  };

  const handleEnterManually = () => {
    
    navigation.navigate('ManualLocation', { name, coordinates: fetchedCoords });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={colors.background === '#101010' ? 'light-content' : 'dark-content'} />

      {/* Header image */}
      <View style={{ height: 260, width: '100%' }}>
        <Image
          source={require('../../../assets/backgroundImg.png')}
          style={{ width: '100%', height: '100%' }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 6,
            borderRadius: 999,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom card */}
      <View
        style={{
          flex: 1,
          backgroundColor: colors.secondary,
          marginTop: -40,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          paddingHorizontal: 24,
          paddingTop: 40,
        }}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary }}>
            Hi, {name}
          </Text>
          <Text style={{ fontSize: 16, color: colors.textPrimary, opacity: 0.7, marginBottom: 40 }}>
            where should we deliver your tiffin? 📍
          </Text>

          <Button
            text={isRequestingPermission ? 'Requesting Permission...' : 'Use Current Location'}
            onPress={handleUseCurrentLocation}
            disabled={isRequestingPermission}
            style={{
              marginBottom: 18,
              height: 56,
              borderRadius: 28,
              backgroundColor: isRequestingPermission ? '#cccccc' : colors.primary,
            }}
          />

          <Button
            text="Enter Manually"
            onPress={handleEnterManually}
            style={{
              marginBottom: 16,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#FFA891',
            }}
          />
        </Animated.View>
      </View>

      <LinearGradient
        colors={['transparent', '#FF6F3C']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: height * 0.45,
        }}
      />
    </SafeAreaView>
  );
};

export default GetLocation;
