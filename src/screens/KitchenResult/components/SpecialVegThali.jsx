import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/common/Button';
import { fontSizes, fonts } from '../../../styles/styles';
import { useQuery } from '@tanstack/react-query';
import useTiffin from '../../../services/useTiffin';

const { width } = Dimensions.get('window');
const ITEM_IMAGE = 90;
const CARD_RADIUS = 16;
const CARD_HEIGHT = 88;

const SpecialVegThali = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { tiffinId } = route?.params;
  const { getTiffinById } = useTiffin();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tiffin", tiffinId],
    queryFn: () => getTiffinById(tiffinId),
  });
  const foodItems = data?.data?.items || [];

  // init animated values AFTER data is ready
  const animatedValues = useRef([]).current;
  // console.log({data?.data?.type.charAt(0).toUpperCase() + data?.data?.type.slice(1).toLowerCase()})
  useEffect(() => {
    if (foodItems.length > 0) {
      // reset animated values
      animatedValues.length = 0;
      foodItems.forEach(() => animatedValues.push(new Animated.Value(0)));

      const animations = animatedValues.map((anim, idx) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: idx * 150,
          useNativeDriver: true,
        })
      );
      Animated.stagger(100, animations).start();
    }
  }, [foodItems]);

  if (isLoading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#FF6F3C" />
        <Text style={{ marginTop: 12, fontFamily: fonts.semiBold }}>Loading your thali...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <Text style={{ color: 'red', fontFamily: fonts.semiBold }}>Error fetching data.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.backText, { fontFamily: fonts.semiBold, fontSize: fontSizes.button }]}>back</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, { fontFamily: fonts.bold, fontSize: fontSizes.title }]}>{data?.data?.type.charAt(0).toUpperCase() + data?.data?.type.slice(1).toLowerCase()} Veg Thali</Text>
      <Text style={[styles.subheading, { fontFamily: fonts.semiBold, fontSize: fontSizes.subtitle }]}>
        Every tiffin brings soft rotis, fresh dal, and a touch of home — light on oil, big on comfort.
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {foodItems.map((item, idx) => {
          const translateY = animatedValues[idx]?.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 0],
          }) || 0;

          return (
            <Animated.View
              key={item.name}
              style={[
                styles.card,
                {
                  opacity: animatedValues[idx] || 1,
                  transform: [{ translateY }],
                },
              ]}
            >
              <Image source={require('../../../assets/backgroundImg.png')} style={styles.foodImg} />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={[styles.foodName, { fontFamily: fonts.bold }]}>{item.name}</Text>
                  <Text style={[styles.foodDesc, { fontFamily: fonts.semiBold }]}>{item.desc}</Text>
                  <Text style={[styles.foodQty, { fontFamily: fonts.semiBold }]}>{item.qty}</Text>
                </View>
                <Text style={[styles.nutrition, { fontFamily: fonts.semiBold }]}>Fats : {item.fats}</Text>
                <Text style={[styles.nutrition, { fontFamily: fonts.semiBold }]}>Carbs : {item.carbs}</Text>
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
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 18 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 18, marginTop: 50 },
  heading: { fontSize: 28, marginBottom: 4, marginTop: 32 },
  subheading: { fontSize: 15, marginBottom: 24, lineHeight: 22 },
  scrollContent: { paddingBottom: 48 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: CARD_RADIUS,
    marginBottom: 18,
    elevation: 2,
    height: CARD_HEIGHT,
    overflow: 'hidden',
  },
  foodImg: {
    width: ITEM_IMAGE,
    height: '100%',
    borderTopLeftRadius: CARD_RADIUS,
    borderBottomLeftRadius: CARD_RADIUS,
    backgroundColor: '#eee',
    resizeMode: 'cover',
  },
  cardContent: { flex: 1, justifyContent: 'center', paddingLeft: 18, paddingRight: 16 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  foodName: { fontSize: 19, marginRight: 6 },
  foodDesc: { fontSize: 15, marginRight: 6 },
  foodQty: { fontSize: 15, marginLeft: 'auto' },
  nutrition: { fontSize: 15, marginBottom: 1 },
  orderBtn: { marginBottom: 34, backgroundColor: '#FF6F3C', borderRadius: 30, height: 54 },
});

export default SpecialVegThali;
