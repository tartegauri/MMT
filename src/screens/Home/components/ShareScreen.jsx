import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../context/ThemeContext';
import { fontSizes, spacing } from '../../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const ShareScreen = ({ navigation }) => {
  const { colors, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'light-content'}
        backgroundColor="#FF6F3C"
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
              '#FF6F3C' + 'E6',
            ]}
            style={styles.gradientOverlay}
          >
            {/* Stars decoration */}
            <Text style={styles.starLeft}>✦</Text>
            <Text style={styles.starRight}>✦</Text>
            
            {/* Main Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.referTitle}>REFER</Text>
              <Text style={styles.andText}>AND</Text>
              <Text style={styles.winTitle}>WIN</Text>
            </View>
          </LinearGradient>
        </View>

        {/* White Content Section */}
        <View style={[styles.whiteContent, { backgroundColor: colors.background }]}>
          {/* Referral Program Badge with decorative lines */}
          <View style={styles.badgeContainer}>
            <View style={styles.thaliHeaderContainer}>
              <View style={styles.decorativeLine} />
              <View style={styles.referralBadge}>
                <Text style={styles.badgeText}>REFERRAL PROGRAM</Text>
              </View>
              <View style={styles.decorativeLine} />
            </View>
          </View>

          {/* Description Text */}
          <Text style={[styles.descriptionText, { color: colors.textPrimary }]}>
            Share the love of home-style tiffins. For every friend who joins, you both get a reward!
          </Text>

          {/* Reward Points */}
          <View style={styles.rewardsContainer}>
            <View style={styles.rewardItem}>
              <View style={styles.greenDot} />
              <Text style={[styles.rewardText, { color: colors.textPrimary }]}>
                You Get: 25 MMT coins
              </Text>
            </View>
            <View style={styles.rewardItem}>
              <View style={styles.greenDot} />
              <Text style={[styles.rewardText, { color: colors.textPrimary }]}>
                They Get: 25 MMT coins
              </Text>
            </View>
          </View>

          {/* Referral Code Section */}
          <View style={styles.referralCodeContainer}>
            <View style={styles.codeBox}>
              <Text style={styles.referralCode}>TABISH 50</Text>
            </View>
          </View>

          {/* Invite Button */}
          <TouchableOpacity style={styles.inviteButton} activeOpacity={0.8}>
            <Text style={styles.inviteButtonText}>Invite Now</Text>
          </TouchableOpacity>

          {/* Extra spacing for bottom navigation */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItemActive}>
          <Icon name="share-social" size={20} color="white" />
          <Text style={styles.navActiveText}>Refer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="time-outline" size={24} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>
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
    height: 250,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  starLeft: {
    position: 'absolute',
    left: 40,
    top: 60,
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  starRight: {
    position: 'absolute',
    right: 40,
    top: 80,
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  titleContainer: {
    alignItems: 'center',
  },
  referTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  andText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginVertical: -5,
  },
  winTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  whiteContent: {
    flex: 1,
    paddingHorizontal: spacing.medium,
    paddingTop: spacing.large,
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: spacing.large,
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
  referralBadge: {
    backgroundColor: '#FF6F3C',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 140,
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.large,
    paddingHorizontal: spacing.small,
  },
  rewardsContainer: {
    marginBottom: spacing.xlarge,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.small,
    paddingHorizontal: spacing.small,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: spacing.small,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  referralCodeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xlarge * 1.5,
  },
  codeBox: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: '#FAFAFA',
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F3C',
    letterSpacing: 2,
  },
  inviteButton: {
    backgroundColor: '#FF6F3C',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width:240,
    marginTop : 12,
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navItemActive: {
    backgroundColor: '#FF6F3C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navActiveText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default ShareScreen;