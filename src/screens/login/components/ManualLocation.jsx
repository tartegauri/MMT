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
import { fontSizes, spacing } from '../../../styles/styles';

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

  const isValid = house.trim() !== '' && apartment.trim() !== '';

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
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 6,
            borderRadius: 999,
          }}
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
              fontSize: fontSizes.title,
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
              marginBottom: spacing.large / 1.5,
              marginTop: 0,
            }}
          >
            Please Enter Address <Text>📍</Text>
          </Text>

          {/* House / Flat / Floor */}
          <Text
            style={{
              fontSize: fontSizes.label,
              fontWeight: '700',
              marginBottom: 8,
              color: colors.textPrimary,
              textAlign: 'left',
            }}
          >
            House / Flat / Floor
          </Text>
          <Input
            style={{
              width: '100%',
              backgroundColor: '#EDEDED',
              borderRadius: 28,
              paddingHorizontal: 18,
              fontSize: fontSizes.button,
              color: '#222',
              height: 56,
              textAlign: 'left',
              marginBottom: spacing.medium,
            }}
            placeholder="eg. Plot no 58/A"
            placeholderTextColor="#B0B0B0"
            value={house}
            onChangeText={setHouse}
          />

          {/* Apartment / Road / Area */}
          <Text
            style={{
              fontSize: fontSizes.label,
              fontWeight: '700',
              marginBottom: 8,
              color: colors.textPrimary,
              textAlign: 'left',
            }}
          >
            Apartment / Road / Area
          </Text>
          <Input
            style={{
              width: '100%',
              backgroundColor: '#EDEDED',
              borderRadius: 28,
              paddingHorizontal: 18,
              fontSize: fontSizes.button,
              color: '#222',
              height: 56,
              textAlign: 'left',
              marginBottom: spacing.medium,
            }}
            placeholder="eg. Peace Residency, Jalan Nagar"
            placeholderTextColor="#B0B0B0"
            value={apartment}
            onChangeText={setApartment}
          />

          {/* Instructions to reach */}
          <Text
            style={{
              fontSize: fontSizes.label,
              fontWeight: '700',
              marginBottom: 8,
              color: colors.textPrimary,
              textAlign: 'left',
            }}
          >
            Instructions to reach
          </Text>
          <Input
            style={{
              width: '100%',
              backgroundColor: '#EDEDED',
              borderRadius: 28,
              paddingHorizontal: 18,
              fontSize: fontSizes.button,
              color: '#222',
              height: 56,
              textAlign: 'left',
              marginBottom: spacing.medium,
            }}
            placeholder="eg. Ring Doorbell"
            placeholderTextColor="#B0B0B0"
            value={instructions}
            onChangeText={setInstructions}
          />

          {/* Save as chips */}
          <Text
            style={{
              fontSize: fontSizes.label,
              fontWeight: '700',
              marginBottom: 8,
              color: colors.textPrimary,
              textAlign: 'left',
            }}
          >
            Save as
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: spacing.large }}>
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
                <Text style={{ color: '#222', fontWeight: '600', fontSize: fontSizes.label }}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            text="Continue"
            onPress={() => navigation.navigate('SelectPlan', { house, apartment, instructions, saveAs })}
            disabled={!isValid}
            style={{ marginBottom: spacing.medium, height: 56, borderRadius: 28 }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ManualLocation;
