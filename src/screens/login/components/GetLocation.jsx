// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, TextInput, Platform, PermissionsAndroid, Alert, Animated } from 'react-native';
// import { useTheme } from '../../../context/ThemeContext';

// const GetLocation = ({ navigation, route }) => {
//   const { colors } = useTheme();
//   const name = route?.params?.name || 'User';
//   const [manual, setManual] = useState(false);
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

//   // Request location permission and get current location
//   const handleCurrentLocation = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'App needs access to your location to deliver your tiffin.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
//           return;
//         }
//       }
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           Alert.alert('Location', `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
//           // You can navigate or save the location here
//         },
//         (error) => {
//           Alert.alert('Error', error.message);
//         },
//         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//       );
//     } catch (err) {
//       Alert.alert('Error', err.message);
//     }
//   };

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
//         {manual ? (
//           <>
//             <View style={styles.inputContainer}>
//               <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Address</Text>
//               <TextInput
//                 style={[styles.input, { color: '#111' }]}
//                 placeholder="Shivaji nagar Pune"
//                 placeholderTextColor="#B0B0B0"
//                 value={address}
//                 onChangeText={setAddress}
//               />
//             </View>
//             <TouchableOpacity style={styles.buttonNext}>
//               <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <View style={{ width: '100%', marginTop: 300 }}>
//               <TouchableOpacity style={[styles.buttonPrimary, { backgroundColor: colors.primary }]} onPress={() => setManual(true)}>
//                 <Text style={styles.buttonText}>Use Current location</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.buttonPrimary, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('ManualLocation', { name })}>
//                 <Text style={styles.buttonText}>Enter Manually</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
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
//     marginTop: 0,
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   pin: {
//     fontSize: 16,
//   },
//   buttonPrimary: {
//     width: '100%',
//     borderRadius: 28,
//     height: COMMON_HEIGHT,
//     backgroundColor: '#F9541E',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 18,
  
//   },
//   buttonSecondary: {
//     width: '100%',
//     borderRadius: 28,
//     height: COMMON_HEIGHT,
//     backgroundColor: '#FFA891',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   input: {
//     width: '100%',
//     height: COMMON_HEIGHT,
//     borderRadius: 28,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     paddingHorizontal: 20,
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonNext: {
//     width: '100%',
//     borderRadius: 28,
//     height: COMMON_HEIGHT,
//     backgroundColor: '#F9541E',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
// });

// export default GetLocation;
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import LinearGradient from 'react-native-linear-gradient';
import { fontSizes, spacing } from '../../../styles/styles';

const { height } = Dimensions.get('window');

const GetLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={colors.background === '#101010' ? 'light-content' : 'dark-content'} />
      {/* Top Image */}
      <View style={{ height: 260, width: '100%', position: 'relative' }}>
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

      {/* Card */}
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
          <Text
            style={{
              fontSize: fontSizes.title + 2, // Slightly larger for greeting
              fontWeight: '700',
              color: colors.textPrimary,
              marginBottom: 0,
            }}
          >
            Hi, {name}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.subtitle,
              color: colors.textPrimary,
              opacity: 0.7,
              fontWeight: '400',
              marginBottom: spacing.large * 1.25,
              marginTop: 0,
            }}
          >
            where should we deliver your tiffin? <Text>📍</Text>
          </Text>

          <Button
            text="Use Current location"
            onPress={() => {}}
            style={{
              marginBottom: spacing.medium,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.primary,
            }}
          />

          <Button
            text="Enter Manually"
            onPress={() => navigation.navigate('ManualLocation', { name })}
            style={{
              marginBottom: spacing.medium,
              height: 56,
              borderRadius: 28,
              backgroundColor: '#FFA891',
            }}
          />
        </Animated.View>
      </View>

      {/* Strong Orange Gradient at Bottom */}
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
          zIndex: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default GetLocation;
