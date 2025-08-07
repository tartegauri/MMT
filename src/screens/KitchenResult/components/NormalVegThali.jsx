import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';

const { width } = Dimensions.get('window');
const ITEM_IMAGE = 90;
const CARD_RADIUS = 16;
const CARD_HEIGHT = 88;
const foodItems = [
  {
    name: '3 Chapatis',
    desc: '(wheat)',
    qty: '100gms',
    fats: 'XXgm',
    carbs: 'XXgm',
  },
  {
    name: 'Sabji',
    desc: '(Aloo/Gobi/ etc)',
    qty: '100gms',
    fats: 'XXgm',
    carbs: 'XXgm',
  },
  {
    name: 'Dal',
    desc: '(Masur Dal with tadka)',
    qty: '100ml',
    fats: 'XXgm',
    carbs: 'XXgm',
  },
  {
    name: 'Rice',
    desc: '(Basmati Rice)',
    qty: '100gms',
    fats: 'XXgm',
    carbs: 'XXgm',
  },
];

const NormalVegThali = () => {
  const { colors } = useTheme();

  // Animation refs for each card
  const animatedValues = useRef(foodItems.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate each card with a staggered delay
    const animations = animatedValues.map((anim, idx) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: idx * 150,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, [animatedValues]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>  
      <Text style={styles.backText}>back</Text>
      <Text style={styles.heading}>Normal Veg Thali</Text>
      <Text style={styles.subheading}>
        Every tiffin from Dhewars Mess brings soft rotis, fresh dal, and a touch of home — light on oil, big on comfort.
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {foodItems.map((item, idx) => {
          const translateY = animatedValues[idx].interpolate({
            inputRange: [0, 1],
            outputRange: [40, 0],
          });
          return (
            <Animated.View
              key={item.name}
              style={[
                styles.card,
                {
                  opacity: animatedValues[idx],
                  transform: [{ translateY }],
                },
              ]}
            >
              <Image source={require('../../../assets/backgroundImg.png')} style={styles.foodImg} />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodDesc}>{item.desc}</Text>
                  <Text style={styles.foodQty}>{item.qty}</Text>
                </View>
                <Text style={styles.nutrition}>Fats : {item.fats}</Text>
                <Text style={styles.nutrition}>Carbs : {item.carbs}</Text>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
      <Button text="Order Trial" style={styles.orderBtn} onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    backgroundColor: '#fff',
  },
  backText: {
    fontSize: 18,
    color: '#222',
    fontWeight: '600',
    marginTop: 50,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
    color: '#111',
    marginTop: 32,
  },
  subheading: {
    fontSize: 15,
    color: '#444',
    marginBottom: 24,
    fontWeight: '500',
    lineHeight: 22,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    marginBottom: 18,
    padding: 0,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    height: CARD_HEIGHT,
    overflow: 'hidden',
  },
  foodImg: {
    width: ITEM_IMAGE,
    height: '100%',
    borderTopLeftRadius: CARD_RADIUS,
    borderBottomLeftRadius: CARD_RADIUS,
    marginRight: 0,
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 16,
    paddingVertical: 10,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  foodName: {
    fontSize: 19,
    fontWeight: '900',
    color: '#111',
    marginRight: 6,
  },
  foodDesc: {
    fontSize: 15,
    color: '#888',
    fontWeight: '500',
    marginRight: 6,
  },
  foodQty: {
    fontSize: 15,
    color: '#222',
    fontWeight: '700',
    marginLeft: 'auto',
  },
  nutrition: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
    marginBottom: 1,
  },
  orderBtn: {
    marginTop: 0,
    marginBottom: 34,
    backgroundColor: '#FF6F3C',
    borderRadius: 30,
    height: 54,
  },
});

export default NormalVegThali;
