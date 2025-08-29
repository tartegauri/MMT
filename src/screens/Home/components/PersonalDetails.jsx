import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSizes, fonts } from '../../../styles/styles';

const PROFILE_IMAGE = require('D:/Programming/Navsudh/MMT/MMT/src/assets/onboardingImg.jpg');

const PersonalDetails = ({ navigation }) => {
  const [fullName, setFullName] = useState('Khan Tabish');
  const [dob, setDob] = useState('19/06/1999');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('+1 325-433-7656');
  const [email, setEmail] = useState('khantabish@gmail.com');
  const [showGenders, setShowGenders] = useState(false);

  const genders = ['Male', 'Female', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF692E" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Orange Header */}
        <LinearGradient
          colors={['#FF692E', '#FF5603']}
          style={styles.header}
        >
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
              <Icon name="arrow-back-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Personal Details</Text>
          </View>
        </LinearGradient>

        {/* Profile Image with Camera Icon */}
        <View style={styles.avatarSection}>
          <View style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
            <Image source={PROFILE_IMAGE} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#BBB"
          />
          <Text style={styles.label}>Date of birth</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#BBB"
          />
          <Text style={styles.label}>Gender</Text>
          {/* Gender Dropdown */}
          <TouchableOpacity
            style={styles.input}
            activeOpacity={0.8}
            onPress={() => setShowGenders(!showGenders)}
          >
            <Text style={styles.genderText}>{gender}</Text>
            <Icon
              name="chevron-down-outline"
              size={20}
              color="#757575"
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
          {showGenders && (
            <View style={styles.dropdown}>
              {genders.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGender(g);
                    setShowGenders(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            placeholderTextColor="#BBB"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#BBB"
            autoCapitalize="none"
          />
        </View>

        {/* Save Button */}
        <View style={styles.saveWrapper}>
          <TouchableOpacity activeOpacity={0.85}>
            <LinearGradient
              colors={['#FF692E', '#FF5603']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AVATAR_SIZE = 98;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 110,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    justifyContent: 'flex-start',
    paddingBottom: 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    marginTop: 60,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.title,
    fontFamily: fonts.bold,
    letterSpacing: 0.15,
    marginLeft: 14,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33,
    marginBottom: 4,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 8,
    backgroundColor: '#FF692E',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    zIndex: 2,
  },
  formSection: {
    marginHorizontal: 18,
    marginBottom: 18,
    marginTop: 0,
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
    color: '#272727',
    fontWeight: '500',
    fontSize: fontSizes.label,
    fontFamily: fonts.semiBold,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E0E7',
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 16,
    fontSize: fontSizes.input,
    fontFamily: fonts.regular,
    color: '#171717',
    marginBottom: 3,
    backgroundColor: '#fff',
  },
  genderText: {
    color: '#171717',
    fontSize: fontSizes.input,
    fontFamily: fonts.regular,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 14,
    marginTop: 11,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 13,
    marginTop: 5,
    marginBottom: 8,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: fontSizes.input,
    color: '#171717',
    fontFamily: fonts.regular,
  },
  saveWrapper: {
    marginHorizontal: 18,
    marginBottom: 32,
    marginTop: 15,
  },
  saveButton: {
    borderRadius: 33,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.title - 4,
    fontFamily: fonts.semiBold,
    letterSpacing: 0.17,
  },
});

export default PersonalDetails;
