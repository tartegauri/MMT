import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fontSizes, fonts } from '../../styles/styles';

const { width } = Dimensions.get('window');

const MessScreen = () => {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('');
  const navigation = useNavigation();

  // Animation refs for thali cards
  const thaliAnim = [useRef(new Animated.Value(0)).current, useRef(new Animated.Value(0)).current];

  // Animation ref for whole page
  const pageAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(pageAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.stagger(120, [
        Animated.timing(thaliAnim[0], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(thaliAnim[1], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [pageAnim, thaliAnim]);

  const pageTranslateY = pageAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={{
          flex: 1,
          opacity: pageAnim,
          transform: [{ translateY: pageTranslateY }],
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Banner Image */}
          <Image source={require('../../assets/foodImg.png')} style={styles.headerImage} />

          {/* Mess Card */}
          <View style={styles.messCard}>
            <View style={styles.messCardContent}>
              <View style={styles.messTitleRow}>
                <Text style={[styles.messName, { fontFamily: fonts.semiBold, fontSize: fontSizes.subtitle, color: '#222' }]}>
                  Dehwar mess
                </Text>
                <Image source={require('../../assets/fssai.png')} style={styles.fssaiLogo} resizeMode="contain" />
              </View>
              <Text style={[styles.messDetails, { fontFamily: fonts.semiBold, fontSize: fontSizes.label, color: '#666' }]}>
                Home Chef | Pause Anytime
              </Text>
              <Text style={[styles.messDesc, { fontFamily: fonts.semiBold, fontSize: fontSizes.label, color: '#444' }]}>
                Every tiffin from Dehwar's Mess brings soft rotis, fresh dal, and a touch of home — light on oil, big on comfort.
              </Text>
            </View>
            <TouchableOpacity style={styles.knowMoreBtn} onPress={() => navigation.navigate('Home')}>
              <Text style={[styles.knowMoreText, { fontFamily: fonts.semiBold, fontSize: fontSizes.subtitle }]}>
                want to know more about the mess
              </Text>
            </TouchableOpacity>
          </View>

          {/* Thali Options */}
          <View style={styles.thaliHeaderRow}>
            <Text style={[styles.thaliHeaderText, { fontFamily: fonts.bold, fontSize: fontSizes.subtitle }]}>Thali Options</Text>
            <View style={styles.thaliHeaderLine} />
          </View>

          {/* Thali Card 1 */}
          <Animated.View
            style={{
              opacity: thaliAnim[0],
              transform: [{ translateY: thaliAnim[0].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity
              style={styles.thaliCard}
              onPress={() => navigation.navigate('NormalVegThali')}
              activeOpacity={0.9}
            >
              <View style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
                <Image source={require('../../assets/Vector.png')} style={styles.thaliImage} />
              </View>
              <View style={styles.thaliTextBelow}>
                <Text style={[styles.thaliTitle, { fontFamily: fonts.bold, fontSize: fontSizes.subtitle }]}>Normal Veg Thali</Text>
                <Text
                  style={[styles.thaliSubtitle, { fontFamily: fonts.semiBold, fontSize: 11 }] /* smaller font size inline here */}
                >
                  3 Chapatis, 1 Sabji Dal & Rice
                </Text>
              </View>
              <View style={styles.thaliArrowCircle}>
                <AntDesign name="arrowright" size={24} color="#FF6F3C" />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Thali Card 2 */}
          <Animated.View
            style={{
              opacity: thaliAnim[1],
              transform: [{ translateY: thaliAnim[1].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            }}
          >
            <TouchableOpacity
              style={styles.thaliCard}
              onPress={() => navigation.navigate('NormalVegThali')}
              activeOpacity={0.9}
            >
              <View style={{ position: 'relative', borderRadius: 20, overflow: 'hidden' }}>
                <Image source={require('../../assets/Vector.png')} style={styles.thaliImage} />
              </View>
              <View style={styles.thaliTextBelow}>
                <Text style={[styles.thaliTitle, { fontFamily: fonts.bold, fontSize: fontSizes.subtitle }]}>Special Veg Thali</Text>
                <Text
                  style={[styles.thaliSubtitle, { fontFamily: fonts.semiBold, fontSize: 11 }] /* smaller font size inline here */}
                >
                  4 Chapatis, 2 Sabjis, Dessert
                </Text>
              </View>
              <View style={styles.thaliArrowCircle}>
                <AntDesign name="arrowright" size={24} color="#FF6F3C" />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Available Plans */}
          <View style={styles.plansHeaderRow}>
            <Text style={[styles.plansHeaderText, { fontFamily: fonts.bold, fontSize: fontSizes.subtitle }]}>Available Plans</Text>
            <View style={styles.plansHeaderLine} />
          </View>
          {plans.map(plan => (
            <TouchableOpacity
              key={plan.key}
              style={[
                styles.planCard,
                selectedPlan === plan.key && styles.selectedCard,
              ]}
              onPress={() => setSelectedPlan(plan.key)}
              activeOpacity={0.85}
            >
              <View style={styles.planRow}>
                <View style={styles.planLeft}>
                  <Text style={[styles.planName, { fontFamily: fonts.bold, fontSize: 20 }]}>{plan.title}</Text>
                  <Text style={[styles.planPrice, { fontFamily: fonts.semiBold, fontSize: 16 }]}>{plan.price}</Text>
                </View>
                <View style={styles.planRight}>
                  {plan.details.map((line, idx) => (
                    <View key={idx} style={styles.planDetailRow}>
                      <Ionicons
                        name="checkmark-sharp"
                        size={16}
                        color={colors.primary}
                        style={styles.planTickIcon}
                      />
                      <Text style={[styles.planDetail, { fontFamily: fonts.semiBold, fontSize: 14 }]}>
                        {line}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={[styles.selectText, { fontFamily: fonts.semiBold, fontSize: 13 }]}>Select any one</Text>
          <Button
            text="Proceed"
            style={styles.proceedBtn}
            onPress={() => navigation.navigate('NormalVegThali')}
          />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const plans = [
  {
    key: 'Trial',
    title: 'Trial',
    price: '₹50 / meal',
    details: ['Try your first meal for just ₹50'],
  },
  {
    key: 'Daily',
    title: 'Daily Plan',
    price: '₹96 / meal',
    details: ['No commitment', 'Order anytime'],
  },
  {
    key: 'Weekly',
    title: 'Weekly Plan',
    price: '₹90 / meal × 14 meals',
    details: ['Valid for 10 days', 'Pause anytime*'],
  },
  {
    key: 'Monthly',
    title: 'Monthly Plan',
    price: '₹87 / meal × 60 meals',
    details: ['Valid for 40 days', 'Best for regulars', 'Pause anytime *'],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerImage: {
    width,
    height: 200,
    resizeMode: 'cover',
    marginLeft: -16,
  },
  messCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: -40,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    overflow: 'hidden',
  },
  messCardContent: {
    padding: 16,
  },
  messTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messName: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 6,
    color: '#222',
  },
  fssaiLogo: {
    width: 36,
    height: 16,
  },
  messDetails: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  messDesc: {
    fontSize: 13,
    color: '#444',
    marginBottom: 10,
  },
  knowMoreBtn: {
    backgroundColor: '#FFD600',
    paddingVertical: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  knowMoreText: {
    fontSize: 16,
    color: '#111',
    fontWeight: '700',
    textAlign: 'center',
  },
  thaliCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  thaliImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  thaliTextBelow: {
    paddingVertical: 2,
    paddingHorizontal: 14,
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: -58,
  },
  thaliTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 14,
  },
  thaliSubtitle: {
    fontSize: 15, // original size replaced inline where used
    color: '#555',
    marginTop: 2,
  },
  thaliArrowCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  plansHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  plansHeaderText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
    marginRight: 12,
  },
  plansHeaderLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#222',
    borderRadius: 2,
    marginTop: 2,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    borderColor: '#111',
    borderWidth: 1,
  },
  selectedCard: {
    backgroundColor: '#FFF3EC',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planLeft: {
    flex: 1.2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#222',
    marginBottom: 2,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6F3C',
    marginBottom: 0,
  },
  planRight: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  planDetail: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'right',
  },
  selectText: {
    fontSize: 13,
    fontWeight: '600',
    marginVertical: 14,
    color: '#222',
  },
  proceedBtn: {
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FF6F3C',
    marginBottom: 32,
  },
  planDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  planTickIcon: {
    marginRight: 5,
  },
  thaliHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  thaliHeaderLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#222',
    borderRadius: 2,
    marginLeft: 12,
  },
  thaliHeaderText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
  },
});

export default MessScreen;
