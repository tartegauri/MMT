import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../context/ThemeContext';
import { fontSizes, spacing } from '../../../styles/styles';

import Icon from 'react-native-vector-icons/Ionicons';
const HomeScreen = ({ navigation }) => {
  const { colors, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'light-content'}
        backgroundColor={colors.primary}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { backgroundColor: colors.background }]}
      >
        {/* Orange Top Section with Background Image */}
        <View style={styles.topSection}>
          {/* Background Image */}
          <Image
            source={require('E:/tartegauri30/MMTApp/src/assets/onboardingImg.jpg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />

          {/* Gradient Overlay - Light to Dark */}
          <LinearGradient
            colors={[
              'rgba(255, 171, 102, 0.3)',
              'rgba(255, 140, 70, 0.7)',
              colors.primary + 'E6',
            ]}
            style={styles.gradientOverlay}
          >
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={[styles.greeting, { color: '#000' }]}>
                  Hi, Tabish
                </Text>
                <Text
                  style={[styles.location, { color: 'rgba(0, 0, 0, 0.7)' }]}
                >
                  Online meal, Office 228, Magarpatta...
                </Text>
              </View>
              <TouchableOpacity style={styles.profileButton}>
                <View style={styles.profileIcon}>
                  <Icon name="person-circle-outline" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Main Banner */}
            <View style={styles.bannerContainer}>
              {/* Replace text with image */}
              <Image
                source={require('E:/tartegauri30/MMTApp/src/assets/HomeImage.png')}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
        </View>

        {/* White Background Content */}
        <View
          style={[styles.whiteContent, { backgroundColor: colors.background }]}
        >
          {/* First Meal Offer */}
          <View style={styles.offerCard}>
            <LinearGradient
              colors={['#FFFFFF', '#FF8655']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.offerContent}
            >
              <Text style={[styles.offerTitle, { color: colors.textPrimary }]}>
                Try your first meal for
              </Text>
              <Text style={[styles.offerTitle, { color: colors.textPrimary }]}>
                just ₹50
              </Text>
              <TouchableOpacity
                style={[styles.orderButton, { backgroundColor: '#8B4513' }]}
              >
                <Text style={styles.orderButtonText}>ORDER NOW</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* MEALS ARE LIVE - Above the card */}
          <View style={styles.mealsLiveContainer}>
            <View style={styles.thaliHeaderContainer}>
              <View style={styles.decorativeLine} />
              <View
                style={[styles.thaliHeader, { backgroundColor: '#FF6F3C' }]}
              >
                <Text style={styles.mealsLiveText}>⚡ MEALS ARE LIVE</Text>
              </View>
              <View style={styles.decorativeLine} />
            </View>
          </View>

          {/* Special Veg Thali Card */}
          {/* Special Veg Thali Card */}
          <View style={styles.thaliSection}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SpecialVegThali')}
              activeOpacity={0.8}
            >
              <View style={[styles.thaliCard, { backgroundColor: 'white' }]}>
                <View style={styles.thaliContent}>
                  {/* Left side - Image */}
                  <Image
                    source={require('E:/tartegauri30/MMTApp/src/assets/thali.png')}
                    style={styles.thaliImage}
                    resizeMode="cover"
                  />

                  {/* Right side - Text content */}
                  <View style={styles.thaliInfo}>
                    <View style={styles.thaliTitleContainer}>
                      <Text style={[styles.thaliTitle, { color: '#000' }]}>
                        Special Veg Thali
                      </Text>
                      <View
                        style={[
                          styles.lunchButton,
                          { backgroundColor: '#FF6F3C' },
                        ]}
                      >
                        <Text style={styles.lunchButtonText}>LUNCH</Text>
                      </View>
                    </View>

                    <Text style={[styles.thaliSubtitle, { color: '#666' }]}>
                      Dhewar Mess
                    </Text>
                    <Text
                      style={[styles.thaliDescription, { color: '#8B5CF6' }]}
                    >
                      Menu : Mix veg , Paneer , G...
                    </Text>
                  </View>
                </View>

                {/* Full-width orange band */}
                <View style={styles.orangeBand}>
                  <Text style={styles.orderTrialText}>ORDER TRIAL TIFFIN</Text>
                  <Text style={styles.priceText}>Starting from ₹50</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Mess Options */}
          <View style={styles.messSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: spacing.small,
              }}
            >
              <Text style={[styles.messSectionTitle, { color: 'gray' }]}>
                MESS OPTIONS
              </Text>
              <LinearGradient
                colors={['#ccc', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  height: 1,
                  marginLeft: spacing.small,
                  marginTop: -24,
                }}
              />
            </View>

            <View style={styles.messCard}>
              {/* Background Image */}
              <View style={styles.messImageContainer}>
                <Image
                  source={require('E:/tartegauri30/MMTApp/src/assets/onboardingImg.jpg')}
                  style={styles.messImageCentered}
                  resizeMode="cover"
                />
              </View>

              {/* Overlay Content */}
              <View style={styles.messCardOverlay}>
                {/* Top Left - Price Tag */}
                <View style={styles.priceTag}>
                  <Text style={styles.priceTagText}>From ₹95 /tiffin</Text>
                </View>

                {/* Top Right - Arrow Button */}
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => navigation.navigate('MessScreen')}
                >
                  <Icon
                    name="arrow-forward"
                    size={spacing.medium}
                    color={colors.textPrimary}
                  />
                </TouchableOpacity>
                {/* Bottom Section with gradient background */}
                <View style={styles.messBottomOverlay}>
                  <Text style={styles.messDetailsText}>
                    2 Thali options • Pure veg
                  </Text>

                  <Text style={styles.messTitle}>Dehwar mess</Text>

                  <View style={styles.messMetaRow}>
                    <Text style={styles.messSubtitle}>Lunch & Dinner</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewSubscriptionsLink}>
                        view Subscriptions
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#E0E0E0',
                      marginVertical: spacing.small,
                    }}
                  />
                  {/* Subscription Buttons */}
                  <View style={styles.subscriptionButtonsRow}>
                    <TouchableOpacity style={styles.subButton}>
                      <Text style={styles.subButtonText}>Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subButton}>
                      <Text style={styles.subButtonText}>Weekly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subButton}>
                      <Text style={styles.subButtonText}>Monthly</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View
            style={[
              styles.bottomSection,
              { backgroundColor: colors.secondary },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: spacing.small,
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: -16,
                }}
              />
              <Text
                style={[
                  styles.bottomTitle,
                  { color: '#666', marginHorizontal: spacing.small },
                ]}
              >
                LET'S END YOUR FOOD STRUGGLE
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: -16,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: spacing.small,
              }}
            >
              <View style={styles.iconItem}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.iconText}>📱</Text>
                </View>
                <Text style={[styles.iconLabel, { color: colors.textPrimary }]}>
                  Flexible{'\n'}Plans
                </Text>
              </View>
              <View style={styles.iconItem}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.iconText}>▶️</Text>
                </View>
                <Text style={[styles.iconLabel, { color: colors.textPrimary }]}>
                  Pause{'\n'}Effortless.
                </Text>
              </View>
              <View style={styles.iconItem}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.iconText}>👨‍🍳</Text>
                </View>
                <Text style={[styles.iconLabel, { color: colors.textPrimary }]}>
                  Cooked By{'\n'}Chef
                </Text>
              </View>
              <View style={styles.iconItem}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text style={styles.iconText}>🏠</Text>
                </View>
                <Text style={[styles.iconLabel, { color: colors.textPrimary }]}>
                  Home-Style{'\n'}Meals
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.getStartedSection,
              { backgroundColor: colors.background },
            ]}
          >
            <Text
              style={[styles.getStartedTitle, { color: colors.textPrimary }]}
            >
              LET'S GET STARTED
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  topSection: {
    position: 'relative',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: 'hidden',
    height: 280,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  whiteContent: {
    flex: 1,
    paddingTop: spacing.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.medium,
    paddingBottom: spacing.small,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: fontSizes.subtitle + 5,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    flex: 1,
    justifyContent: 'center',
  },
  bannerImage: {
    width: 280,
    height: 120,
    marginBottom: spacing.medium,
  },
  letsGoButton: {
    paddingHorizontal: spacing.large,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: spacing.small,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  letsGoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerCard: {
    backgroundColor: '#fff',
    marginHorizontal: spacing.medium,
    borderRadius: 25,
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  offerContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 25,
    alignItems: 'flex-start',
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 2,
    color: '#8B4513',
  },
  orderButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 11,

    letterSpacing: 0.5,
  },
  mealsLiveContainer: {
    marginBottom: 10,
  },
  thaliSection: {
    marginHorizontal: spacing.medium,
    borderRadius: 19,
    overflow: 'hidden',
    marginBottom: spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },

    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  thaliHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  decorativeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 15,
  },
  thaliHeader: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 140,
  },
  mealsLiveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  thaliCard: {
    padding: 0,
    overflow: 'hidden',
  },
  thaliContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 15,
    height: 120,
  },
  thaliSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  orangeBand: {
    backgroundColor: '#FF6F3C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  orderTrialText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  priceText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  orderTrialButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  orderTrialButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  thaliImage: {
    width: 90,
    height: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: 15,
  },
  thaliInfo: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
  },
  thaliTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  thaliTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  lunchButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lunchButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  thaliDescription: {
    fontSize: 12,
    marginBottom: 10,
  },
  thaliFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customizeButton: {
    paddingHorizontal: 15,
    paddingVertical: spacing.small,
    borderRadius: 15,
  },
  customizeButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  startingFrom: {
    fontSize: 12,
  },
  messSection: {
    marginHorizontal: spacing.medium,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: spacing.medium,
  },
  messOptionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 15,
    paddingBottom: 10,
  },
  messCard: {
    position: 'relative',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  messImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  messArrow: {
    position: 'absolute',
    right: 15,
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: spacing.medium,
  },
  messFromText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: spacing.small,
    paddingVertical: 4,
    borderRadius: spacing.small,
  },
  messInfo: {
    padding: 15,
  },
  messTitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  messName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messType: {
    fontSize: 12,
    marginBottom: 10,
  },
  newSubscription: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  subscriptionOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  subscriptionButton: {
    paddingHorizontal: 15,
    paddingVertical: spacing.small,
    borderRadius: 15,
    borderWidth: 1,
  },
  activeSubscription: {
    // Dynamic colors will be applied via inline styles
  },
  subscriptionText: {
    fontSize: 12,
  },
  activeSubscriptionText: {
    color: 'white',
  },
  bottomSection: {
    marginHorizontal: spacing.medium,
    borderRadius: 15,
    padding: spacing.medium,
    marginBottom: spacing.medium,
  },
  bottomTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.small,
  },
  iconText: {
    fontSize: 20,
  },
  iconLabel: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },
  getStartedSection: {
    paddingVertical: spacing.medium,
    alignItems: 'center',
  },
  getStartedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Mess Options Styles
  messSection: {
    marginHorizontal: spacing.medium,
    marginBottom: spacing.medium,
  },
  messSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  messCard: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messImage: {
    width: '100%',
    height: 250,
  },
  messImageContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
  },
  messImageCentered: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 900,
  },
  messCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
  },
  priceTag: {
    backgroundColor: '#FF6F3C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  priceTagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  arrowButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    color: '#333',
  },
  messBottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  messDetailsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  messTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  messMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  viewSubscriptionsLink: {
    fontSize: 12,
    color: '#FF6F3C',
    fontWeight: '500',
  },
  subscriptionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  subButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  subButtonText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
});

export default HomeScreen;
