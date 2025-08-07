// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import { useTheme } from '../../../context/ThemeContext';

// const LoginName = ({ navigation, route }) => {
//   const { colors } = useTheme();
//   const [name, setName] = useState('Tabish Khan');

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

//   const isNameFilled = name.trim().length > 0;

//   return (
//     <Animated.View style={{ flex: 1, backgroundColor: colors.background, opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>  
//         <View style={styles.backWrapper}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={[styles.backText, { color: colors.textPrimary }]}>Back</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={[styles.title, { color: colors.textPrimary }]}>Every tiffin has a name on it…</Text>
//         <Text style={[styles.subtitle, { color: colors.textPrimary }]}>What should she write on yours?</Text>
//         <View style={styles.inputContainer}>
//           <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Name</Text>
//           <TextInput
//             style={[styles.input, { color: '#111' }]}
//             placeholder="Tabish Khan"
//             placeholderTextColor="#B0B0B0"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: isNameFilled ? colors.primary : '#FFA891' }]}
//           onPress={() => isNameFilled && navigation.navigate('GetLocation', { name })}
//           disabled={!isNameFilled}
//         >
//           <Text style={[styles.buttonText, { color: isNameFilled ? '#fff' : 'rgba(255,255,255,0.7)' }]}>Continue</Text>
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
//     top: 40,   // or 40 for iOS, adjust for your status bar
//     left: 20,
//     zIndex: 10,
//   },
//   backText: {
//     color: '#222',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#111',
//     marginBottom: 8,
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//     width: '100%',
//     marginTop: 90
//   },
//   subtitle: {
//     fontSize: 15,
//     color: '#888',
//     fontWeight: '400',
//     marginBottom: 28,
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//     width: '100%',
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
//   button: {
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
// });

// export default LoginName;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, Animated, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

const LoginName = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('Tabish Khan');
  const isNameFilled = name.trim().length > 0;

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
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 999 }}
          onPress={() => navigation.goBack()}
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
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 }}>
            Every tiffin has a name on it…
          </Text>
          <Text style={{ fontSize: 15, color: colors.textPrimary, opacity: 0.7, fontWeight: '400', marginBottom: 28 }}>
            What should she write on yours?
          </Text>
          <View style={{ width: '100%', marginBottom: 24 }}>
            <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 8, color: colors.textPrimary, textAlign: 'left' }}>Name</Text>
            <Input
              style={{ width: '100%', backgroundColor: '#EDEDED', borderRadius: 28, paddingHorizontal: 18, fontSize: 17, color: '#222', height: 56, textAlign: 'left', marginBottom: 0 }}
              placeholder="Tabish Khan"
              placeholderTextColor="#B0B0B0"
              value={name}
              onChangeText={setName}
            />
          </View>
          <Button
            text="Continue"
            onPress={() => isNameFilled && navigation.navigate('GetLocation', { name })}
            disabled={!isNameFilled}
            style={{ marginBottom: 16, height: 56, borderRadius: 28 }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoginName;
