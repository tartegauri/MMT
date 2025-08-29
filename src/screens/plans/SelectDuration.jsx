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

const SelectDuration = ({ navigation }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const [selected, setSelected] = useState('monthly');
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
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 999 }}
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
            Please Select your subscription period
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
              Note: You Can Order Trial Box First Before Starting
            </Text>
          </View>
          {/* Subscription Cards */}
          <View style={{ gap: 16, marginBottom: spacing.medium }}>
            {/* Daily Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected('daily')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected === 'daily' ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: selected === 'daily' ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: selected === 'daily' ? '#FF6F3C' : '#000',
                shadowOpacity: selected === 'daily' ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: selected === 'daily' ? 2 : 1,
                minHeight: 64,
              }}
            >
              {/* Daily Illustration */}
              <View style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Image
                  source={require('../../assets/backgroundImg.png')}
                  style={{ width: 64, height: 64, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 26, fontWeight: '700', color: '#222', flex: 1 }}>Daily</Text>
                  <View style={{ marginRight: 16 }}>
                    {selected === 'daily' ? (
                      <AntDesign name="checksquare" size={26} color="#FF6F3C" />
                    ) : (
                      <AntDesign name="border" size={26} color="#B0B0B0" />
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 12, color: '#888', fontWeight: '500', marginTop: 2 }}>
                  You Can Order On Daily Basis, We Will Remind Daily
                </Text>
              </View>
            </TouchableOpacity>
            {/* Weekly Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected('weekly2')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected === 'weekly2' ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: selected === 'weekly2' ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: selected === 'weekly2' ? '#FF6F3C' : '#000',
                shadowOpacity: selected === 'weekly2' ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: selected === 'weekly2' ? 2 : 1,
                minHeight: 64,
              }}
            >
              {/* Weekly Illustration */}
              <View style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Image
                  source={require('../../assets/backgroundImg.png')}
                  style={{ width: 64, height: 64, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 26, fontWeight: '700', color: '#222', flex: 1 }}>Weekly</Text>
                  <View style={{ marginRight: 16 }}>
                    {selected === 'weekly2' ? (
                      <AntDesign name="checksquare" size={26} color="#FF6F3C" />
                    ) : (
                      <AntDesign name="border" size={26} color="#B0B0B0" />
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 13, color: '#888', fontWeight: '500', marginTop: 2 }}>
                  14 Meals, Can Be Redeemed In 10 Days
                </Text>
              </View>
            </TouchableOpacity>
            {/* Monthly Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected('monthly')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected === 'monthly' ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: selected === 'monthly' ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: selected === 'monthly' ? '#FF6F3C' : '#000',
                shadowOpacity: selected === 'monthly' ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: selected === 'monthly' ? 2 : 1,
                minHeight: 64,
              }}
            >
              {/* Monthly Illustration */}
              <View style={{ width: 64, height: 64, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <Image
                  source={require('../../assets/backgroundImg.png')}
                  style={{ width: 64, height: 64, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 26, fontWeight: '700', color: '#222', flex: 1 }}>Monthly</Text>
                  {/* SAVER badge */}
                  <View
                    style={{
                      backgroundColor: '#FF6F3C',
                      borderRadius: 10,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      marginRight: 8,
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>+ SAVER</Text>
                  </View>
                  <View style={{ marginRight: 8 }}>
                    {selected === 'monthly' ? (
                      <AntDesign name="checksquare" size={26} color="#FF6F3C" />
                    ) : (
                      <AntDesign name="border" size={26} color="#B0B0B0" />
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 13, color: '#888', fontWeight: '500', marginTop: 2 }}>
                  60 Meals, Can Be Redeemed In 40 Days
                </Text>
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
            96.3% people select monthly plan
          </Text>
          {/* Continue Button */}
          <Button
            text="Continue"
            onPress={() => navigation.navigate('SelectDessert')}
            style={{
              backgroundColor: '#FF6F3C',
              borderRadius: 30,
              height: 56,
              marginTop: 0,
              marginBottom: 0,
            }}
            textStyle={{ color: '#fff', fontWeight: '600', fontSize: fontSizes.button }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SelectDuration;
