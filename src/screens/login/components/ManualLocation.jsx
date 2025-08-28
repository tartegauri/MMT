// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import { useTheme } from '../../../context/ThemeContext';

// const ManualLocation = ({ navigation, route }) => {
//   const { colors } = useTheme();
//   const name = route?.params?.name || 'User';
//   const [address, setAddress] = useState('Shivaji nagar Pune');

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const translateYAnim = useRef(new Animated.Value(40)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.timing(translateYAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [fadeAnim, translateYAnim]);

//   return (
//     <Animated.View style={{ flex: 1, backgroundColor: colors.background, opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>  
//         <View style={styles.backWrapper}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={[styles.backText, { color: colors.textPrimary }]}>Back</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={[styles.greeting, { color: colors.textPrimary }]}>Hi, <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text></Text>
//         <Text style={[styles.subtitle, { color: colors.textPrimary }]}>where should we deliver your meals? <Text style={styles.pin}>📍</Text></Text>
//         <View style={styles.inputContainer}>
//           <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Address</Text>
//           <TextInput
//             style={[styles.input, { color: '#111' }]}
//             placeholder="Shivaji nagar Pune"
//             placeholderTextColor="#B0B0B0"
//             value={address}
//             onChangeText={setAddress}
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.buttonNext}
//           onPress={() => navigation.navigate('PlanSelection', { address })}
//         >
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//     </Animated.View>
//   );
// };

// const COMMON_HEIGHT = 56;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingTop: 90,
//     paddingHorizontal: 20,
//     backgroundColor: '#FCFCFC',
//   },
//   backWrapper: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 10,
//   },
//   backText: {
//     color: '#888',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111',
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//     marginTop: 90,
//     marginBottom: 0,
//   },
//   name: {
//     color: '#111',
//     fontWeight: '700',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#888',
//     fontWeight: '400',
//     marginBottom: 48,
    
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   pin: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 24,
//   },
//   inputLabel: {
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 8,
//     color: '#222',
//     textAlign: 'left',
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#EDEDED',
//     borderRadius: 28,
//     paddingHorizontal: 18,
//     fontSize: 17,
//     color: '#222',
//     height: COMMON_HEIGHT,
//     textAlign: 'left',
//     marginBottom: 0,
//   },
//   buttonNext: {
//     width: '100%',
//     borderRadius: 28,
//     height: COMMON_HEIGHT,
//     backgroundColor: '#FFA891',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 0,
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
// });

// export default ManualLocation
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import useAuth from '../../../services/useAuth';
import { useMutation } from '@tanstack/react-query';
import userStore from '../../../store/userStore';

const { height } = Dimensions.get('window');

const saveOptions = [
  { label: 'Home', icon: 'home-outline' },
  { label: 'Work', icon: 'briefcase-outline' },
  { label: 'Others', icon: 'ellipsis-horizontal-outline' },
];

const ManualLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';
  const hasLocationPermission = route?.params?.hasLocationPermission || false;
  
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [instructions, setInstructions] = useState('');
  const [saveAs, setSaveAs] = useState('Home');
  const [isGeocodingAddress, setIsGeocodingAddress] = useState(false);

  const isValid = house.trim() && apartment.trim();
  const { addAddress } = useAuth(); 
  
  const mutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      navigation.navigate('SelectPlan', { 
        house, 
        apartment, 
        instructions, 
        saveAs 
      });
    },
    onError: (err) => {
      console.error("Address save failed:", err);
      Alert.alert("Error", "Failed to save address. Please try again.");
    },
  });

  // Fade-in + slide-up animation for card content
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

  const geocodeAddress = async (address) => {
    try {
      const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // replace with actual key
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        console.warn('Geocoding failed:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // ✅ fixed: encapsulated submit logic here
  const submitAddress = (coordinates) => {
    const formData = {
      id: userStore.getState().userId,
      data: {
        line1: house,
        line2: apartment,
        instructions,
        tag: saveAs,
        ...(coordinates && { coordinates })
      }
    };

    mutation.mutate(formData);
    setIsGeocodingAddress(false);
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsGeocodingAddress(true);
    
    try {
      let coordinates = null;
      
      if (hasLocationPermission) {
        const fullAddress = `${house}, ${apartment}`;
        coordinates = await geocodeAddress(fullAddress);
        
        if (!coordinates) {
          Alert.alert(
            'Location Warning',
            'Could not find exact coordinates for this address. Continue without coordinates?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Continue', onPress: () => submitAddress(null) }
            ]
          );
          setIsGeocodingAddress(false);
          return;
        }
      }
      
      submitAddress(coordinates);
      
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      Alert.alert('Error', 'An error occurred while processing your address.');
      setIsGeocodingAddress(false);
    }
  };

  const handleShowOnMap = async () => {
    if (!hasLocationPermission) return;
    
    setIsGeocodingAddress(true);
    
    try {
      const fullAddress = `${house}, ${apartment}`;
      const coordinates = await geocodeAddress(fullAddress);
      
      if (coordinates) {
        navigation.navigate('MapLocation', {
          name,
          initialLocation: coordinates,
          addressData: { house, apartment, instructions, saveAs }
        });
      } else {
        Alert.alert(
          'Address Not Found',
          'Could not locate this address on the map. Please check the address and try again.'
        );
      }
    } catch (error) {
      console.error('Error in handleShowOnMap:', error);
      Alert.alert('Error', 'An error occurred while locating the address.');
    } finally {
      setIsGeocodingAddress(false);
    }
  };

  const isLoading = mutation.isLoading || isGeocodingAddress;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={colors.background === '#101010' ? 'light-content' : 'dark-content'} />
      
      {/* Top Image */}
      <View style={{ height: 260, width: '100%', position: 'relative' }}>
        <Image
          source={require('../../../assets/backgroundImg.png')}
          style={{ width: '100%', height: '100%' }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ 
            position: 'absolute', 
            top: 40, 
            left: 20, 
            zIndex: 10, 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            padding: 6, 
            borderRadius: 999 
          }}
        >
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={{
        flex: 1,
        backgroundColor: colors.secondary,
        marginTop: -40,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 24,
        paddingTop: 40,
      }}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 0 }}>
            Hi, {name}
          </Text>
          <Text style={{ fontSize: 16, color: colors.textPrimary, opacity: 0.7, fontWeight: '400', marginBottom: 32, marginTop: 0 }}>
            Please Enter Address <Text>📍</Text>
          </Text>

          {/* Location Permission Warning */}
          {!hasLocationPermission && (
            <View style={{
              backgroundColor: '#FFF3CD',
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
              borderLeftWidth: 4,
              borderLeftColor: '#FFC107'
            }}>
              <Text style={{ color: '#856404', fontSize: 14 }}>
                ⚠️ Location permission not granted. Address coordinates won't be fetched.
              </Text>
            </View>
          )}

          {/* House */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>
            House / Flat / Floor
          </Text>
          <Input
            style={{ 
              width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18,
              fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 
            }}
            placeholder="eg.Plot no 58/A"
            placeholderTextColor="#B0B0B0"
            value={house}
            onChangeText={setHouse}
            editable={!isLoading}
          />

          {/* Apartment */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>
            Apartment / Road / Area
          </Text>
          <Input
            style={{ 
              width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18,
              fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 
            }}
            placeholder="eg. Peace Residency , Jalan Nagar"
            placeholderTextColor="#B0B0B0"
            value={apartment}
            onChangeText={setApartment}
            editable={!isLoading}
          />

          {/* Instructions */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>
            Instructions to reach
          </Text>
          <Input
            style={{ 
              width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18,
              fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 
            }}
            placeholder="eg. Ring Doorbell"
            placeholderTextColor="#B0B0B0"
            value={instructions}
            onChangeText={setInstructions}
            editable={!isLoading}
          />

          {/* Save as chips */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>
            Save as
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 32 }}>
            {saveOptions.map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => !isLoading && setSaveAs(option.label)}
                disabled={isLoading}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: saveAs === option.label ? '#EDEDED' : 'transparent',
                  borderColor: '#EDEDED',
                  borderWidth: 1,
                  borderRadius: 18,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  marginRight: 10,
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                <Icon name={option.icon} size={18} color="#222" style={{ marginRight: 6 }} />
                <Text style={{ color: '#222', fontWeight: '600', fontSize: 15 }}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            text={isGeocodingAddress ? "Getting Coordinates..." : isLoading ? "Saving..." : "Continue"}
            onPress={handleSubmit}
            disabled={!isValid || isLoading}
            style={{ 
              marginBottom: 12, 
              height: 56, 
              borderRadius: 28,
              opacity: (!isValid || isLoading) ? 0.6 : 1,
            }}
          />
          
          {hasLocationPermission && isValid && (
            <Button
              text="Show on Map"
              onPress={handleShowOnMap}
              disabled={isLoading}
              style={{ 
                marginBottom: 16, 
                height: 56, 
                borderRadius: 28,
                backgroundColor: '#4A90E2',
                opacity: isLoading ? 0.6 : 1,
              }}
            />
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ManualLocation;
