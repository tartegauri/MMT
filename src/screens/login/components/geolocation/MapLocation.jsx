import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../../../context/ThemeContext';
import Button from '../../../../components/common/Button';
import Geolocation from 'react-native-geolocation-service';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../../../services/useAuth';
import userStore from '../../../../store/userStore';

const { width, height } = Dimensions.get('window');

// Error Boundary Component
class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <MaterialIcons name="error-outline" size={64} color="#FF6B6B" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, textAlign: 'center' }}>
            Map failed to load
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' }}>
            Please check your internet connection and Google Maps configuration
          </Text>
          <Button
            text="Go Back"
            onPress={this.props.onGoBack}
            style={{ marginTop: 20, paddingHorizontal: 32 }}
          />
        </View>
      );
    }

    return this.props.children;
  }
}

const MapLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';
  const initialLocation = route?.params?.initialLocation;

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation || {
      latitude: 19.8762,
      longitude: 75.3433,
    }
  );
  const [address, setAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null);

  const { addAddress } = useAuth();
  
  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigation.navigate('SelectPlan');
    },
    onError: (err) => {
      console.error("Address save failed:", err);
      Alert.alert("Error", "Failed to save address. Please try again.");
    },
  });

  // 🔒 Permission request
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "We need your location to let you pick it on the map.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        setHasLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn("Permission error:", err);
        setHasLocationPermission(false);
      }
    } else {
      setHasLocationPermission(true);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
      reverseGeocode(initialLocation.latitude, initialLocation.longitude);
    } else if (hasLocationPermission) {
      getCurrentLocation();
    } else {
      setAddress("Location permission not granted");
    }
  }, [hasLocationPermission]);

  const getCurrentLocation = () => {
    if (!hasLocationPermission) {
      Alert.alert("Permission Denied", "Location permission is not granted.");
      return;
    }

    setIsGettingCurrentLocation(true);
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        
        setSelectedLocation(newLocation);
        reverseGeocode(latitude, longitude);
        
        if (isMapReady && mapRef.current) {
          mapRef.current.animateToRegion({
            ...newLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }
        
        setIsGettingCurrentLocation(false);
      },
      (error) => {
        console.error('Location error:', error);
        setIsGettingCurrentLocation(false);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Please drag the pin to select your location manually.'
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  const reverseGeocode = async (latitude, longitude) => {
    setIsLoadingAddress(true);
    try {
      const API_KEY = 'YOUR_API_KEY'; // 🔑 replace with actual key
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const onMapReady = () => setIsMapReady(true);

  const onMapPress = (event) => {
    if (!isMapReady) return;
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    reverseGeocode(coordinate.latitude, coordinate.longitude);
  };

  const onMarkerDragEnd = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    reverseGeocode(coordinate.latitude, coordinate.longitude);
  };

  const handleConfirmLocation = () => {
    const formData = {
      id: userStore.getState().userId,
      data: {
        line1: address || 'Selected Location',
        line2: `Lat: ${selectedLocation.latitude.toFixed(6)}, Lng: ${selectedLocation.longitude.toFixed(6)}`,
        instructions: 'Pin Location',
        tag: 'Home',
        coordinates: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude
        }
      }
    };
    mutation.mutate(formData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingTop: StatusBar.currentHeight || 44,
        paddingHorizontal: 20,
        paddingBottom: 15,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 8,
              borderRadius: 20,
            }}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
          
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', flex: 1, textAlign: 'center', marginHorizontal: 10 }}>
            Select Location
          </Text>
          
          <TouchableOpacity
            onPress={getCurrentLocation}
            disabled={isGettingCurrentLocation}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: 8,
              borderRadius: 20,
            }}
          >
            {isGettingCurrentLocation ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <MaterialIcons name="my-location" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Map with Error Boundary */}
      <MapErrorBoundary onGoBack={() => navigation.goBack()}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1, opacity: isMapReady ? 1 : 0 }}
            initialRegion={{
              ...selectedLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={onMapPress}
            onMapReady={onMapReady}
            showsUserLocation={hasLocationPermission}  
            showsMyLocationButton={false}
            toolbarEnabled={false}
            loadingEnabled={false}
          >
            {isMapReady && (
              <Marker
                coordinate={selectedLocation}
                draggable
                onDragEnd={onMarkerDragEnd}
                title="Selected Location"
                description={address}
              >
                <View style={{
                  backgroundColor: colors.primary,
                  padding: 8,
                  borderRadius: 20,
                  borderWidth: 3,
                  borderColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                  <MaterialIcons name="location-on" size={24} color="#fff" />
                </View>
              </Marker>
            )}
          </MapView>

          {!isMapReady && (
            <View style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: colors.background,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={{ marginTop: 16, color: colors.textPrimary }}>Loading Map...</Text>
            </View>
          )}
        </View>
      </MapErrorBoundary>

      {/* Bottom sheet */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.secondary,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingVertical: 24,
        maxHeight: height * 0.4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
      }}>
        <View style={{
          width: 40,
          height: 4,
          backgroundColor: '#DDD',
          borderRadius: 2,
          alignSelf: 'center',
          marginBottom: 20,
        }} />

        <Text style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.textPrimary,
          marginBottom: 8,
        }}>
          Selected Location
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 }}>
          <MaterialIcons name="location-on" size={20} color={colors.primary} style={{ marginRight: 8, marginTop: 2 }} />
          {isLoadingAddress ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ fontSize: 14, color: colors.textSecondary, marginLeft: 8 }}>
                Getting address...
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 14, color: colors.textSecondary, flex: 1, lineHeight: 20 }}>
              {address || 'Drag pin to select precise location'}
            </Text>
          )}
        </View>

        <View style={{
          backgroundColor: '#E8F4FD',
          padding: 12,
          borderRadius: 12,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary,
        }}>
          <Text style={{ color: '#0066CC', fontSize: 13, fontWeight: '500' }}>
            💡 Tip: Tap anywhere on the map or drag the pin for precise location selection
          </Text>
        </View>

        <Button
          text={mutation.isLoading ? "Confirming Location..." : "Confirm Location"}
          onPress={handleConfirmLocation}
          disabled={mutation.isLoading || isLoadingAddress || !isMapReady}
          style={{
            height: 52,
            borderRadius: 26,
            opacity: (mutation.isLoading || isLoadingAddress || !isMapReady) ? 0.6 : 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MapLocation;
