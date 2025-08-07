import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import FontImage from '../../../assets/font.png';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GetCode = ({ navigation, route }) => {
  const { colors, theme } = useTheme();
  // Get phone number from route params or use a default for demo
  const phone = route?.params?.phone || '+91 7262805895';

  // Animation values
  const topBlockTranslateY = useRef(new Animated.Value(40)).current;
  const topBlockOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const isLightMode = theme === 'light';

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(topBlockTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(topBlockOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [topBlockTranslateY, topBlockOpacity, contentOpacity]);

  const handleGetCode = () => {
    navigation.navigate('FillCode', { phone });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Animated.View style={[styles.centerBlock, { opacity: topBlockOpacity, transform: [{ translateY: topBlockTranslateY }] }]}> 
        {isLightMode ? (
          <Image
            source={FontImage}
            style={{ width: 150, height: 60, marginRight: 16 }}
            resizeMode="contain"
          />
        ) : (
          <Text style={[styles.garamText, { color: colors.textPrimary }]}>Garam Tiffin,{"\n"}coming up.</Text>
        )}
        <Image
          source={require('../../../assets/Tiffin.png')}
          style={styles.tiffinImg}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View style={{ opacity: contentOpacity, width: '100%' }}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>She’s about to start cooking…</Text>
        <Text style={[styles.subtitle, { color: colors.textPrimary }]}>Just in case your tiffin needs directions</Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: colors.textPrimary }]}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGetCode}> 
          <Text style={styles.buttonText}>Get code</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const COMMON_HEIGHT = 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#FCFCFC',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  centerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  garamText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#111',
    textAlign: 'left',
    marginRight: 16,
    flexShrink: 1,
  },
  tiffinImg: {
    width: 110,
    height: 130,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    fontWeight: '400',
    marginBottom: 32,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 28,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#888',
    height: COMMON_HEIGHT,
    textAlign: 'left',
    height:60
  },
  button: {
    width: '100%',
    borderRadius: 28,
    height: COMMON_HEIGHT,
    backgroundColor: '#F9541E',
    justifyContent: 'center',
    marginTop: 0,
    alignItems: 'center',
    height:60
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GetCode;
