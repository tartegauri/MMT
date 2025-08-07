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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const { height } = Dimensions.get('window');

const saveOptions = [
  { label: 'Home', icon: 'home-outline' },
  { label: 'Work', icon: 'briefcase-outline' },
  { label: 'Others', icon: 'ellipsis-horizontal-outline' },
];

const ManualLocation = ({ navigation, route }) => {
  const { colors } = useTheme();
  const name = route?.params?.name || 'User';
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [instructions, setInstructions] = useState('');
  const [saveAs, setSaveAs] = useState('Home');

  const isValid = house.trim() && apartment.trim();

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
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 999 }}>
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
          {/* House / Flat / Floor */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>House / Flat / Floor</Text>
          <Input
            style={{ width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18, fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 }}
            placeholder="eg.Plot no 58/A"
            placeholderTextColor="#B0B0B0"
            value={house}
            onChangeText={setHouse}
          />
          {/* Apartment / Road / Area */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>Apartment / Road / Area</Text>
          <Input
            style={{ width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18, fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 }}
            placeholder="eg. Peace Residency , Jalan Nagar"
            placeholderTextColor="#B0B0B0"
            value={apartment}
            onChangeText={setApartment}
          />
          {/* Instructions to reach */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>Instructions to reach</Text>
          <Input
            style={{ width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18, fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 20 }}
            placeholder="eg. Ring Doorbell"
            placeholderTextColor="#B0B0B0"
            value={instructions}
            onChangeText={setInstructions}
          />
          {/* Save as chips */}
          <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>Save as</Text>
          <View style={{ flexDirection: 'row', marginBottom: 32 }}>
            {saveOptions.map(option => (
              <TouchableOpacity
                key={option.label}
                onPress={() => setSaveAs(option.label)}
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
                }}
              >
                <Icon name={option.icon} size={18} color="#222" style={{ marginRight: 6 }} />
                <Text style={{ color: '#222', fontWeight: '600', fontSize: 15 }}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button
            text="Continue"
            onPress={() => navigation.navigate('SelectPlan', { house, apartment, instructions, saveAs })}
            disabled={!isValid}
            style={{ marginBottom: 16, height: 56, borderRadius: 28 }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ManualLocation;
