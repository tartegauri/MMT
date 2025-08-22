import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

// Custom Switch as before
const CustomSwitch = ({ value, onValueChange }) => {
  const trackColor = value ? '#FF9337' : '#edeefd';
  const thumbColor = '#fff';
  const borderColor = value ? '#FF9337' : '#edeefd';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.customSwitch,
        { backgroundColor: trackColor },
      ]}
      onPress={() => onValueChange(!value)}
    >
      <View
        style={[
          styles.switchThumb,
          value ? { left: 21 } : { left: 2 },
          { borderColor: borderColor, backgroundColor: thumbColor },
        ]}
      />
    </TouchableOpacity>
  );
};

const LANGUAGES = [
  { label: 'English (US)', value: 'en' },
  { label: 'हिंदी', value: 'hi' },
  { label: 'मराठी', value: 'mr' },
  { label: 'ಕನ್ನಡ', value: 'kn' },
];

const Settings = ({ navigation }) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

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
            <Text style={styles.headerText}>Settings</Text>
          </View>
        </LinearGradient>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROFILE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Push Notification</Text>
            <CustomSwitch
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Location</Text>
            <CustomSwitch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
            />
          </View>
          {/* Language */}
          <TouchableOpacity
            style={[styles.row, { paddingRight: 2 }]}
            activeOpacity={0.8}
            onPress={() => setLangModalVisible(true)}
          >
            <Text style={styles.label}>Language</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.languageText}>
                {LANGUAGES.find((l) => l.value === selectedLang).label}
              </Text>
              <Icon
                name="chevron-forward-outline"
                size={21}
                color="#B3B3B3"
                style={{ marginLeft: 3, marginTop: 1 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/* Language Bottom Drawer */}
        <BottomSheetLanguageModal
          visible={langModalVisible}
          onClose={() => setLangModalVisible(false)}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const BottomSheetLanguageModal = ({
  visible,
  onClose,
  selectedLang,
  setSelectedLang,
}) => {
  const [tempLang, setTempLang] = useState(selectedLang);
  React.useEffect(() => {
    if (visible) setTempLang(selectedLang);
  }, [visible, selectedLang]);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalBackdrop}
        onPress={onClose}
      />
      <View style={styles.bottomSheetWrapper}>
        <View style={styles.bottomSheetDragLine} />
        <Text style={styles.bottomSheetTitle}>Select Language</Text>
        <View style={{ marginTop: 16, marginHorizontal: 14 }}>
          {LANGUAGES.map((lang, idx) => {
            const isSelected = tempLang === lang.value;
            return (
              <TouchableOpacity
                key={lang.value}
                style={[
                  styles.languageOption,
                  isSelected && styles.languageOptionActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setTempLang(lang.value)}
              >
                <Text
                  style={[
                    styles.languageOptionLabel,
                    isSelected && { color: "#FF692E" }
                  ]}
                >
                  {lang.label}
                </Text>
                {isSelected && (
                  <Icon
                    name="checkmark-circle"
                    size={20}
                    color="#FF692E"
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.bottomSheetSelectBtn}
          onPress={() => {
            setSelectedLang(tempLang);
            onClose();
          }}
        >
          <LinearGradient
            colors={['#FF692E', '#FF5603']}
            style={styles.bottomSheetSelectBtnBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.bottomSheetSelectBtnText}>Select</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const SWITCH_WIDTH = 42;
const SWITCH_HEIGHT = 22;
const THUMB_SIZE = 18;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 110,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    justifyContent: 'flex-end',
    paddingBottom: 0,
    backgroundColor: '#FF692E',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    marginTop: 54,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: 14,
  },
  section: {
    marginHorizontal: 0,
    marginTop: 24,
    marginBottom: 0,
  },
  sectionLabel: {
    marginLeft: 22,
    marginBottom: 2,
    color: '#BDBDBD',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.22,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
    justifyContent: 'space-between',
    minHeight: 36,
  },
  label: {
    fontSize: 15.5,
    color: '#171717',
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  languageText: {
    color: '#1A1A1A',
    fontSize: 15.5,
    marginRight: 6,
    fontWeight: '500',
  },
  customSwitch: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: 'center',
    position: 'relative',
  },
  switchThumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#fff',
    top: 2,
    borderWidth: 1.25,
  },
  // Modal bottom drawer style
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#1119',
  },
  bottomSheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    minHeight: 410,
    elevation: 7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: -2 },
  },
  bottomSheetDragLine: {
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 14,
    width: 70,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#ececec',
  },
  bottomSheetTitle: {
    marginLeft: 22,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#181818',
  },
  languageOption: {
    backgroundColor: '#fff',
    borderRadius: 13,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageOptionActive: {
    borderColor: '#FF692E',
    backgroundColor: '#fff',
  },
  languageOptionLabel: {
    fontSize: 16,
    color: '#181818',
  },
  bottomSheetSelectBtn: {
    marginHorizontal: 18,
    marginTop: 16,
    marginBottom: 2,
  },
  bottomSheetSelectBtnBg: {
    borderRadius: 33,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetSelectBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.14,
  },
});

export default Settings;
