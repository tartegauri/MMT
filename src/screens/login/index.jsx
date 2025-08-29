// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   SafeAreaView,
//   StatusBar,
//   Animated,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useTheme } from '../../context/ThemeContext';
// import Button from '../../components/common/Button';
// import Input from '../../components/common/Input';

// const LoginScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const { colors } = useTheme();

//   // Fade-in + slide-up animation for card content
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

//   // Only allow digits, max 10
//   const handlePhoneChange = (text) => {
//     const digits = text.replace(/\D/g, '');
//     setPhone(digits.slice(0, 10));
//   };

//   const isValid = phone.length === 10;

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
//       <StatusBar barStyle={colors.background === '#101010' ? 'light-content' : 'dark-content'} />

//       {/* Top Image */}
//       <View style={styles.imageWrapper}>
//         <Image
//           source={require('../../assets/backgroundImg.png')}
//           style={styles.image}
//         />
//         <View style={styles.backButton}>
//           <Icon name="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} />
//         </View>
//       </View>

//       {/* White Card */}
//       <View style={[styles.card, { backgroundColor: colors.secondary }]}> 
//         <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
//           <Text style={[styles.title, { color: colors.textPrimary }]}>Let’s get started!</Text>
//           <Text style={[styles.subtitle, { color: colors.textPrimary, opacity: 0.7 }]}>Please, enter a phone number to log in.</Text>

//           <View style={styles.inputContainer}>
//             <Text style={[styles.label, { color: colors.textPrimary }]}>Phone number</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F3F3', borderRadius: 30 }}>
//               <Text style={{ marginLeft: 18, color: '#111', fontSize: 16, fontWeight: '600' }}>+91</Text>
//               <Input
//                 style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 6, paddingLeft: 0, color: colors.textPrimary }}
//                 placeholder="Enter 10 digit number"
//                 placeholderTextColor="#FFFFF"
//                 keyboardType="phone-pad"
//                 value={phone}
//                 onChangeText={handlePhoneChange}
//                 maxLength={10}
//                 returnKeyType="done"
//               />
//             </View>
//           </View>

//           <Button
//             text="Get Code"
//             onPress={() => navigation.navigate('FillCode', { phone: '+91' + phone })}
//             disabled={!isValid}
//             style={{ marginTop: 8 }}
//           />
//         </Animated.View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;

// const styles = {
//   container: {
//     flex: 1,
//   },
//   imageWrapper: {
//     height: 260,
//     width: '100%',
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 10,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     padding: 6,
//     borderRadius: 999,
//   },
//   card: {
//     flex: 1,
//     marginTop: -40,
//     borderTopLeftRadius: 32,
//     borderTopRightRadius: 32,
//     paddingHorizontal: 24,
//     paddingTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '400',
//     marginBottom: 24,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: '600',
//     marginBottom: 6,
//   },
// };



import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { fontSizes, fonts, spacing } from '../../styles/styles'; // Import fonts & sizes
import useAuth from '../../services/useAuth';
import userStore from '../../store/userStore';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { colors } = useTheme();
  const { createUser } = useAuth(); 
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: async (user) => {
      const responseData = {
        userId: user.data.data.userId,
        phone: user.data.data.phone,
        role: user.data.data.role,
        status: true,
      };
      
      await userStore.getState().updateUser(responseData);
          console.log('User Store State:', userStore.getState());
      navigation.navigate('FillCode', { phone: '+91' + phone , email:email})
    },
    onError: (err) => {
      console.error("Login failed:",err);
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      phone:phone,
      role : 'CUSTOMER',
      email:email,
    };
    console.log(formData)
    mutation.mutate(formData);
  };

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

  const handlePhoneChange = (text) => {
    const digits = text.replace(/\D/g, '');
    setPhone(digits.slice(0, 10));
  };

  const isValidEmail = (val) => /\S+@\S+\.\S+/.test(val);
  const isValid = phone.length === 10 || isValidEmail(email);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar barStyle={colors.background === '#101010' ? 'light-content' : 'dark-content'} />

      {/* Top Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/backgroundImg.png')}
          style={styles.image}
        />
        <View style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" onPress={() => navigation.goBack()} />
        </View>
      </View>

      {/* White Card */}
      <View style={[styles.card, { backgroundColor: colors.secondary }]}> 
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Let’s get started!</Text>
          <Text style={[styles.subtitle, { color: colors.textPrimary, opacity: 0.7 }]}>Please, enter a phone number to log in.</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Phone number</Text>
            <View style={styles.inputRow}>
              <Text style={styles.countryCode}>+91</Text>
              <Input
                style={styles.input}
                placeholder="Enter 10 digit number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={10}
                returnKeyType="done"
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              Email
            </Text>
            <Input
              style={{
                backgroundColor: '#F3F3F3',
                borderRadius: 30,
                paddingLeft: 16,
                color: colors.textPrimary,
              }}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              returnKeyType="done"
            />
          </View>

          <Button
            text="Get Code"
            onPress={handleSubmit}
            disabled={!isValid}
            style={{ marginTop: spacing.small }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

// --- Styles applied ---
const styles = {
  container: {
    flex: 1,
  },
  imageWrapper: {
    height: 260,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 6,
    borderRadius: 999,
  },
  card: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: fontSizes.title,
    fontFamily: fonts.bold,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.regular,
    fontWeight: '400',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: fontSizes.label,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 30,
  },
  countryCode: {
    marginLeft: 18,
    color: '#111',
    fontSize: fontSizes.input,
    fontFamily: fonts.semiBold,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 6,
    paddingLeft: 0,
    color: '#111',
    fontSize: fontSizes.input,
    fontFamily: fonts.regular,
  },
};
