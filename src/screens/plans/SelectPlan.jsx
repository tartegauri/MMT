import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';

const { width, height } = Dimensions.get('window');

const SelectPlan = ({ navigation }) => {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
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
      {/* Background Image fills the whole screen */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={require('../../assets/onboardingImg.jpg')}
          style={{ width: '100%', height: '150%', position: 'absolute', top: -height *0.9 }}
          resizeMode="cover"
        />
      </View>
      {/* Top half: for back button only, transparent overlay */}
      <View style={{ height: height * 0.5, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
        <TouchableOpacity style={{ position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 999 }} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Bottom half: White card overlays image, with rounded corners */}
      <View style={{
        position: 'absolute',
        top: height * 0.45,
        left: 0,
        width: '100%',
        height: height * 0.55,
        backgroundColor: colors.secondary,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingTop: 40,
        zIndex: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
      }}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: colors.textPrimary, marginBottom: 6 }}>
            Hi, {userName}
          </Text>
          <Text style={{ fontSize: 15, color: colors.textPrimary, opacity: 0.7, fontWeight: '400', marginBottom: 32 }}>
            You are almost there!
          </Text>

          {/* MUST TRY Button with badge and gradient */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CustomizedPlan')}
            style={{ marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#FFE29A", "#FF6F3C"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                borderRadius: 30,
                height: 56,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 24,
                position: 'relative',
              }}
            >
              <View style={{
                position: 'absolute',
                left: 18,
                top: -14,
                backgroundColor: '#FF6F3C',
                borderRadius: 12,
                paddingHorizontal: 10,
                paddingVertical: 2,
                zIndex: 2,
                elevation: 2,
              }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>⚡ MUST TRY</Text>
              </View>
              <Text style={{ color: '#222', fontSize: 17, fontWeight: '600', marginLeft: 0, flex: 1 }}>
                Want a customized Plan
              </Text>
              <AntDesign name="arrowright" size={22} color="#FF6F3C" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Skip Button */}
          <Button
            text={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Skip, just exploring</Text>
              <AntDesign name="arrowright" size={22} color="#fff" style={{ marginLeft: 8 }} />
            </View>}
            onPress={() => navigation.navigate('PlanSelection')}
            style={{
              backgroundColor: '#FF6F3C',
              borderRadius: 30,
              height: 56,
              marginTop: 0,
            }}
            textStyle={{ color: '#fff', fontWeight: '600', fontSize: 17 }}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SelectPlan;
