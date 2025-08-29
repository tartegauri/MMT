import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../context/ThemeContext';
import { fontSizes, fonts } from '../../../styles/styles';

const PROFILE_IMAGE = require('D:/Programming/Navsudh/MMT/MMT/src/assets/onboardingImg.jpg');

const Profile = ({ navigation }) => {
  const { colors, theme } = useTheme();
  const profileOptions = [
    { icon: 'person-outline', label: 'Personal Details', onPress: () => {navigation.navigate('PersonalDetails')} },
    { icon: 'clipboard-outline', label: 'My Orders', onPress: () => {} },
    { icon: 'settings-outline', label: 'Settings', onPress: () => {navigation.navigate('Settings')} },
  ];
  
  const supportOptions = [
    { icon: 'help-circle-outline', label: 'Help Center', onPress: () => {} },
    { icon: 'people-outline', label: 'Refer the app', onPress: () => {} },
    { icon: 'alert-circle-outline', label: 'Report an issue', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="#FF692E"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Orange Header */}
        <LinearGradient
          colors={['#FF692E', '#FF5603']}
          style={styles.profileHeader}
        >
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
              <Icon name="arrow-back-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile</Text>
          </View>
        </LinearGradient>
        {/* Profile Image and Badge */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageOuterRing}>
            <Image source={PROFILE_IMAGE} style={styles.profileImage} />
            <View style={styles.proContainer}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
                <Icon name="shield-checkmark" size={11} color="#fff" style={{ marginLeft: 4 }} />
              </View>
            </View>
          </View>
          <Text style={styles.nameText}>Tabish Khan</Text>
        </View>
        {/* Main Content */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionLabel}>Profile</Text>
          {profileOptions.map((opt) => (
            <SimpleOptionRow
              key={opt.label}
              icon={opt.icon}
              label={opt.label}
              onPress={opt.onPress}
            />
          ))}
          <Text style={styles.sectionLabel}>Support</Text>
          {supportOptions.map((opt) => (
            <SimpleOptionRow
              key={opt.label}
              icon={opt.icon}
              label={opt.label}
              onPress={opt.onPress}
            />
          ))}
        </View>
        {/* Sign Out Button */}
        <View style={styles.signOutWrapper}>
          <TouchableOpacity style={styles.signOutButton}>
            <Icon name="log-out-outline" size={19} color="#FF692E" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SimpleOptionRow = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.simpleOptionRow} onPress={onPress}>
    <Icon name={icon} size={23} color="#222" style={{ marginRight: 18 }} />
    <Text style={styles.simpleOptionLabel}>{label}</Text>
    <Icon name="chevron-forward-outline" size={19} color="#B3B3B3" style={{ marginLeft: 'auto' }} />
  </TouchableOpacity>
);

const CIRCLE_SIZE = 126;
const IMAGE_SIZE = 108;

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileHeader: {
    height: 110,
    justifyContent: 'center',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    position: 'relative',
    zIndex: 2,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
    paddingLeft: 22,
    zIndex: 3,
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.title,
    fontFamily: fonts.bold,
    letterSpacing: 0.18,
  },
  profileSection: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  profileImageOuterRing: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
    borderColor: '#FF692E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 10,
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: '#eaeaea',
  },
  proContainer: {
    position: 'absolute',
    bottom: -12,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 15,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF692E',
    borderRadius: 40, // more rounded!
    height: 22,
    paddingHorizontal: 14,
    borderWidth: 1.2,
    borderColor: '#E2E0E7', // Light gray border
  },
  proBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.label - 4,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.1,
    marginRight: 0,
  },
  nameText: {
    marginTop: 26,
    fontWeight: 'bold',
    fontSize: fontSizes.title + 1,
    fontFamily: fonts.bold,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 2,
  },
  contentSection: {
    marginHorizontal: 22,
    marginTop: 20,
    marginBottom: 0,
  },
  sectionLabel: {
    marginTop: 18,
    marginBottom: 9,
    color: '#9B9B9B',
    fontWeight: '500',
    fontSize: fontSizes.label,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.13,
  },
  simpleOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 1,
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  simpleOptionLabel: {
    fontSize: fontSizes.input,
    color: '#222',
    fontWeight: '500',
    fontFamily: fonts.semiBold,
    letterSpacing: 0.13,
  },
  signOutWrapper: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28, // more rounded
    borderWidth: 1.8,
    borderColor: '#E2E0E7',
    paddingVertical: 14,
    justifyContent: 'center',
  },
  signOutText: {
    color: '#FF692E',
    fontWeight: 'bold',
    fontSize: fontSizes.button - 2,
    fontFamily: fonts.semiBold,
    marginLeft: 8,
    letterSpacing: 0.23,
  },
});

export default Profile;
