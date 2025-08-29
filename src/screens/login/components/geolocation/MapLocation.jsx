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

const { height } = Dimensions.get('window');

const MapLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';
  const initialLocation = route?.params?.initialLocation;

  const [selectedLocation, setSelectedLocation] = useState(
    initialLocation || { latitude: 19.8762, longitude: 75.3433 }
  );
  const [address, setAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef(null);

  const { addAddress } = useAuth();
  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => navigation.navigate('SelectPlan'),
    onError: () => {
      Alert.alert("Error", "Failed to save address. Please try again.");
    },
  });

  useEffect(() => {
    if (initialLocation) {
      reverseGeocode(initialLocation.latitude, initialLocation.longitude);
    }
  }, []);

  const getCurrentLocation = () => {
    setIsGettingCurrentLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setSelectedLocation(newLocation);
        reverseGeocode(latitude, longitude);

        if (mapRef.current) {
          mapRef.current.animateToRegion(
            { ...newLocation, latitudeDelta: 0.01, longitudeDelta: 0.01 },
            1000
          );
        }
        setIsGettingCurrentLocation(false);
      },
      (error) => {
        console.error('Location error:', error);
        setIsGettingCurrentLocation(false);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Please drag the pin manually.'
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const reverseGeocode = async (latitude, longitude) => {
    setIsLoadingAddress(true);
    try {
      const API_KEY = 'AIzaSyBITKkVUJeuGElkxY9Ma9SVMx1yXLrJLUY'; 
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
      setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  const handleConfirmLocation = () => {
    const formData = {
      id: userStore.getState().phone,
      data: {
        line1: address || 'Selected Location',
        line2: `Lat: ${selectedLocation.latitude.toFixed(6)}, Lng: ${selectedLocation.longitude.toFixed(6)}`,
        instructions: 'Pin Location',
        tag: 'Home',
        coordinates: [selectedLocation.longitude, selectedLocation.latitude],
      },
    };
    mutation.mutate(formData);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingTop: StatusBar.currentHeight || 44,
        paddingHorizontal: 20, paddingBottom: 15,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20 }}
          >
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', flex: 1, textAlign: 'center' }}>
            Select Location
          </Text>

          <TouchableOpacity
            onPress={getCurrentLocation}
            disabled={isGettingCurrentLocation}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20 }}
          >
            {isGettingCurrentLocation
              ? <ActivityIndicator size="small" color="#fff" />
              : <MaterialIcons name="my-location" size={24} color="#fff" />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          ...selectedLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          const coord = e.nativeEvent.coordinate;
          setSelectedLocation(coord);
          reverseGeocode(coord.latitude, coord.longitude);
        }}
        onMapReady={() => setIsMapReady(true)}
      >
        {isMapReady && (
          <Marker
            coordinate={selectedLocation}
            draggable
            onDragEnd={(e) => {
              const coord = e.nativeEvent.coordinate;
              setSelectedLocation(coord);
              reverseGeocode(coord.latitude, coord.longitude);
            }}
          >
            <View style={{
              backgroundColor: colors.primary,
              padding: 8,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#fff',
            }}>
              <MaterialIcons name="location-on" size={24} color="#fff" />
            </View>
          </Marker>
        )}
      </MapView>

      {/* Bottom Sheet */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: colors.secondary,
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        padding: 24,
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8, color: colors.textPrimary }}>
          Selected Location
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 16 }}>
          {isLoadingAddress ? 'Loading address...' : address || 'Drag pin to select'}
        </Text>
        <Button
          text={mutation.isLoading ? 'Confirming...' : 'Confirm Location'}
          onPress={handleConfirmLocation}
          disabled={mutation.isLoading || isLoadingAddress}
          style={{ height: 52, borderRadius: 26 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MapLocation;
