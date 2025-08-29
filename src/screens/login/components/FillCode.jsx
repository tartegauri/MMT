import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, StatusBar, Animated, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import { fontSizes, fonts, spacing } from '../../../styles/styles';
import { useMutation } from '@tanstack/react-query';
import useAuth from "../../../services/useAuth";
import userStore from '../../../store/userStore';
const CODE_LENGTH = 6;

const FillCode = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const phone = route?.params?.phone || '';
  const email = route?.params?.email || '';
  const { verifyOtp } = useAuth(); 
  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async (responseData) => {
      await userStore.getState().updateUser(responseData);
      isCodeFilled && navigation.navigate('LoginName', { phone })
    },
    onError: (err) => {
      console.error("Login failed:",err);
      toast.error("Login failed. Please check your credentials.");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      phone:phone.replace('+91', ''),
      otp : code.join(''),
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

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text, idx) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);
      if (text && idx < CODE_LENGTH - 1) {
        inputRefs.current[idx + 1].focus();
      }
    }
  };

  const isCodeFilled = code.every(digit => digit.length === 1);

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
            borderRadius: 999
          }}
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
          <Text
            style={{
              fontSize: fontSizes.title,
              fontFamily: fonts.bold,
              fontWeight: '700',
              color: colors.textPrimary,
              marginBottom: 8
            }}
          >
            Confirm the phone number
          </Text>
          <Text
            style={{
              fontSize: fontSizes.subtitle,
              color: colors.textPrimary,
              opacity: 0.7,
              fontFamily: fonts.regular,
              fontWeight: '400',
              marginBottom: 28
            }}
          >
            The confirmation code was sent to the number {phone}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.label,
              fontFamily: fonts.bold,
              fontWeight: '700',
              color: colors.textPrimary,
              marginBottom: 10
            }}
          >
            Code
          </Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 32
          }}>
            {code.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={ref => (inputRefs.current[idx] = ref)}
                style={{
                  width: 70,
                  height: 57,
                  borderRadius: 27,
                  backgroundColor: '#EDEDED',
                  fontSize: 28,
                  color: '#222',
                  fontWeight: '600',
                  fontFamily: fonts.semiBold,
                  marginHorizontal: 4,
                  textAlign: 'center',
                }}
                value={digit}
                onChangeText={text => handleCodeChange(text, idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectionColor="#FF6F3C"
              />
            ))}
          </View>
          <Button
            text="Confirm the number"
            onPress={handleSubmit}
            disabled={!isCodeFilled}
            style={{
              marginBottom: spacing.small * 2,
              height: 60,
              borderRadius: 28
            }}
            textStyle={{
              fontSize: fontSizes.button,
              fontFamily: fonts.semiBold,
              fontWeight: '600'
            }}
          />
          <Text
            style={{
              color: '#C0C0C0',
              fontSize: fontSizes.label,
              fontWeight: '400',
              fontFamily: fonts.regular,
              textAlign: 'left',
              marginLeft: 4
            }}
          >
            send the code again after 00:{timer.toString().padStart(2, '0')} seconds
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default FillCode;
