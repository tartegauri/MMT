import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import { fontSizes, spacing } from '../../styles/styles';

const { height } = Dimensions.get('window');

const CustomizePlan = ({ navigation }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const [lunchChecked, setLunchChecked] = useState(true);
  const [dinnerChecked, setDinnerChecked] = useState(true);
  const userName = 'Tabish';

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
      {/* Background Image fills the top half, cropped from top */}
      <View style={{ height: height * 0.45, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <Image
          source={require('../../assets/backgroundImg.png')}
          style={{ width: '100%', height: '120%', position: 'absolute', top: -height * 0.08 }}
          resizeMode="cover"
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
      {/* White card overlays bottom half */}
      <View
        style={{
          position: 'absolute',
          top: height * 0.35,
          left: 0,
          width: '100%',
          height: height * 0.65,
          backgroundColor: colors.secondary,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 24,
          paddingTop: 32,
          zIndex: 2,
        }}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
          <Text
            style={{
              fontSize: fontSizes.title,
              fontWeight: '700',
              color: colors.textPrimary,
              marginBottom: spacing.small / 2,
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.label,
              color: colors.textPrimary,
              opacity: 0.8,
              fontWeight: '400',
              marginBottom: spacing.medium,
            }}
          >
            Please Select your meal times
          </Text>
          {/* Note badge */}
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#F9C7B8',
              borderRadius: 16,
              paddingHorizontal: 14,
              paddingVertical: 4,
              marginBottom: spacing.medium,
            }}
          >
            <Text style={{ color: '#B85B3B', fontSize: 13, fontWeight: '500' }}>
              Note: You Can Change Your Preferences Any Time
            </Text>
          </View>
          {/* Meal Cards */}
          <View style={{ gap: 16, marginBottom: spacing.medium }}>
            {/* Lunch Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setLunchChecked(!lunchChecked)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: lunchChecked ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: lunchChecked ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: lunchChecked ? '#FF6F3C' : '#000',
                shadowOpacity: lunchChecked ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: lunchChecked ? 2 : 1,
                minHeight: 64,
              }}
            >
              {/* Day Illustration */}
              <View style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Image
                  source={require('../../assets/backgroundImg.png')}
                  style={{ width: 64, height: 64, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                <Text style={{ fontSize: 26, fontWeight: '700', color: '#000', flex: 1 }}>Lunch</Text>
                <View style={{ marginRight: 16 }}>
                  {lunchChecked ? (
                    <AntDesign name="checksquare" size={26} color="#FF6F3C" />
                  ) : (
                    <AntDesign name="border" size={26} color="#B0B0B0" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {/* Dinner Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setDinnerChecked(!dinnerChecked)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: dinnerChecked ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: dinnerChecked ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: dinnerChecked ? '#FF6F3C' : '#000',
                shadowOpacity: dinnerChecked ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: dinnerChecked ? 2 : 1,
                minHeight: 64,
              }}
            >
              {/* Night Illustration */}
              <View style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Image
                  source={require('../../assets/backgroundImg.png')}
                  style={{ width: 64, height: 64, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 }}>
                <Text style={{ fontSize: 26, fontWeight: '700', color: '#000', flex: 1 }}>Dinner</Text>
                <View style={{ marginRight: 16 }}>
                  {dinnerChecked ? (
                    <AntDesign name="checksquare" size={26} color="#FF6F3C" />
                  ) : (
                    <AntDesign name="border" size={26} color="#B0B0B0" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Percentage text */}
          <Text
            style={{
              textAlign: 'center',
              color: colors.textPrimary,
              fontSize: fontSizes.subtitle,
              fontWeight: '400',
              marginBottom: spacing.large,
            }}
          >
            95.2% people select both!
          </Text>
          {/* Continue Button */}
          <Button
            text="Continue"
            onPress={() => navigation.navigate('SelectDuration')}
            style={{
              backgroundColor: '#FF6F3C',
              borderRadius: 30,
              height: 56,
              marginTop: spacing.xLarge || 65,
              marginBottom: 0,
            }}
            textStyle={{ color: '#fff', fontWeight: '600', fontSize: fontSizes.button }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default CustomizePlan;
