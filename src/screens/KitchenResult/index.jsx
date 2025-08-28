import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import userStore from '../../store/userStore';
const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.72; // Bigger thali image

const KitchenResult = ({ navigation }) => {
  const { colors } = useTheme();
  const userName =userStore.getState().name;

  // Animation refs
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [cardAnim]);

  const translateY = cardAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>  
      {/* Location Row */}
      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={18} color={colors.textPrimary} style={styles.locationIcon} />
        <Text style={[styles.locationText, { color: colors.textPrimary }]}>Ominx mall, Office 212, Magarpatta.</Text>
      </View>

      {/* Greeting */}
      <Text style={[styles.heading, { color: colors.textPrimary }]}>Just for you, {userName}</Text>
      <Text style={styles.subheading}>We found a thali from kitchen that matches your taste and vibe.</Text>

      {/* Thali Image & Card */}
      <Animated.View
        style={[
          styles.centeredCardWrapper,
          {
            opacity: cardAnim,
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={require('../../assets/thali.png')}
          style={styles.thaliImage}
          resizeMode="cover"
        />
        <View style={styles.card}>
          <Text style={[styles.kitchenName, { color: colors.textPrimary }]}>Dehwar mess</Text>
          <View style={styles.row}>
            <Text style={styles.kitchenDetails}>Home Chef | Pause Anytime | </Text>
            <Image source={require('../../assets/fssai.png')} style={styles.fssaiLogo} resizeMode="contain" />
          </View>
          <Text style={styles.kitchenDesc}>
            Every tiffin from Dehwar's Mess brings soft rotis, fresh dal, and a touch of home — light on oil, big on comfort.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Special Veg Thali</Text>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <Button text="Select" style={styles.selectBtn} onPress={() => navigation.navigate('SpecialVegThali')} />
        <Button
          text="Explore other"
          style={styles.exploreBtn}
          textStyle={styles.exploreBtnText}
          onPress={() => {navigation.navigate('MessScreen')}}
        />
      </View>

      {/* Skip Link */}
      <TouchableOpacity style={styles.skipContainer}>
        <Text style={styles.skipText}>skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:70, // less space
  },
  locationIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  locationText: {
    fontSize: 15, // bigger
    fontWeight: '600',
  },
  heading: {
    fontSize: 24, // bigger
    fontWeight: '800',
    marginTop: 24, // less space
    marginBottom: 0,
  },
  subheading: {
    fontSize: 16, // bigger
    color: '#555',
    marginBottom: 8, // less space
    fontWeight: '500',
  },
  centeredCardWrapper: {
    alignItems: 'center',
    marginTop: 150, // much less space
    position: 'relative',
  },
  thaliImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    position: 'absolute',
    top: -IMAGE_SIZE / 2,
    zIndex: 2,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18, // more compact
    paddingTop: IMAGE_SIZE / 2 + 18,
    minHeight: 340, // shorter card
    width: width - 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    alignItems: 'flex-start',
  },
  kitchenName: {
    fontSize: 20, // bigger
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // less space
  },
  kitchenDetails: {
    fontSize: 15, // bigger
    color: '#666',
    textAlign: 'left',
    fontWeight: '600',
  },
  fssaiLogo: {
    width: 38,
    height: 18,
  },
  kitchenDesc: {
    fontSize: 15, // bigger
    color: '#444',
    textAlign: 'left',
    marginBottom: 10, // less space
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 4, // less space
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // bigger
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 70, // less space
  },
  selectBtn: {
    flex: 1,
    backgroundColor: '#FF6F3C',
    height: 50,
    borderRadius: 30,
  },
  exploreBtn: {
    flex: 1,
    borderColor: '#FF6F3C',
    borderWidth: 2,
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 30,
  },
  exploreBtnText: {
    color: '#FF6F3C',
    fontWeight: '700',
    fontSize: 17,
  },
  skipContainer: {
    alignItems: 'center',
    marginTop: 8, // less space
  },
  skipText: {
    fontSize: 15, // bigger
    color: '#777',
    fontWeight: '600',
  },
});

export default KitchenResult;
