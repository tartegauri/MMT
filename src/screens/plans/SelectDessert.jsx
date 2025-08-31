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
import userStore from '../../store/userStore';
const { height } = Dimensions.get('window');

const SelectDessert = ({ navigation,route }) => {
  const { colors } = useTheme();
  const {data} = route?.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(40)).current;
  const [selected, setSelected] = useState('yes');
  const userName = userStore.getState().name;

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
  const handleSubmit = () =>{
    let formdata = {}
    if(selected === 'yes'){
      formdata = {...data,tiffinType:'SPECIAL'};
    }else if (selected === 'no'){
      formdata = {...data,tiffinType:'NORMAL'};
    }
    navigation.navigate('KitchenMatching',{formdata});
  }
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
            Do you like dessert after every meal?
          </Text>
          {/* Option Cards */}
          <View style={{ gap: 16, marginBottom: spacing.large }}>
            {/* Yes Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected('yes')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected === 'yes' ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: selected === 'yes' ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: selected === 'yes' ? '#FF6F3C' : '#000',
                shadowOpacity: selected === 'yes' ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: selected === 'yes' ? 2 : 1,
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
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: selected === 'yes' ? '700' : '400',
                    color: selected === 'yes' ? '#FF6F3C' : '#555',
                    flex: 1,
                  }}
                >
                  Yess
                </Text>
              </View>
            </TouchableOpacity>
            {/* No Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected('no')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selected === 'no' ? '#FFD6C9' : '#fff',
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: selected === 'no' ? '#FF6F3C' : '#E0E0E0',
                overflow: 'hidden',
                shadowColor: selected === 'no' ? '#FF6F3C' : '#000',
                shadowOpacity: selected === 'no' ? 0.08 : 0.04,
                shadowRadius: 6,
                elevation: selected === 'no' ? 2 : 1,
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
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: selected === 'no' ? '700' : '400',
                    color: selected === 'no' ? '#FF6F3C' : '#555',
                    flex: 1,
                  }}
                >
                  No
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Percentage text */}
          <Text
            style={{
              textAlign: 'center',
              color: colors.textPrimary,
              fontSize: fontSizes.label,
              fontWeight: '400',
              marginBottom: spacing.large,
            }}
          >
            70% indians crave for dessert after every meal
          </Text>
          {/* Continue Button */}
          <Button
            text="Continue"
            onPress={handleSubmit}
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

export default SelectDessert;
