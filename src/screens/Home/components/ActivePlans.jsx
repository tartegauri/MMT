import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

// Custom ProgressBar component
const ProgressBar = ({ progress, total, color }) => {
  const progressPercentage = (progress / total) * 100;
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progressPercentage}%`, backgroundColor: color }]} />
    </View>
  );
};

const ActivePlans = ({ navigation }) => {
  const primaryColor = '#FF6F3C';
  const deliveredColor = '#4CAF50';
  const scheduledColor = '#FFC107';
  const skippedColor = '#EC4899'; 

  // Dummy data for progress bar
  const tiffinsDelivered = 22;
  const totalTiffins = 60;

  // Dummy data for the calendar
  const deliveredDates = ['2025-08-01', '2025-08-02', '2025-08-03', '2025-08-05', '2025-08-06', '2025-08-07', '2025-08-08', '2025-08-12', '2025-08-13', '2025-08-14', '2025-08-15', '2025-08-22'];
  const skippedDates = ['2025-08-04', '2025-08-17'];
  const scheduledDates = ['2025-08-09', '2025-08-10', '2025-08-11', '2025-08-16', '2025-08-18', '2025-08-19', '2025-08-20', '2025-08-21', '2025-08-23', '2025-08-24', '2025-08-25', '2025-08-26', '2025-08-27', '2025-08-28', '2025-08-29', '2025-08-30', '2025-08-31'];

  const customDatesStyles = [
    ...deliveredDates.map(date => ({
      dateNameStyle: { color: 'white', fontWeight: 'bold' },
      dateNumberStyle: { color: 'white' },
      dateContainerStyle: { backgroundColor: deliveredColor, borderRadius: 20 },
      highlightDateContainerStyle: { backgroundColor: deliveredColor, borderRadius: 20 },
    })),
    ...scheduledDates.map(date => ({
      dateNameStyle: { color: 'black' },
      dateNumberStyle: { color: 'black' },
      dateContainerStyle: { backgroundColor: scheduledColor, borderRadius: 20 },
      highlightDateContainerStyle: { backgroundColor: scheduledColor, borderRadius: 20 },
    })),
    ...skippedDates.map(date => ({
      dateNameStyle: { color: 'white', fontWeight: 'bold' },
      dateNumberStyle: { color: 'white' },
      dateContainerStyle: { backgroundColor: skippedColor, borderRadius: 20 },
      highlightDateContainerStyle: { backgroundColor: skippedColor, borderRadius: 20 },
    })),
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={primaryColor} />

      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Plans</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {/* Current Plan Card */}
        <View style={styles.planCard}>
          <Text style={styles.planCardHeader}>CURRENT PLAN</Text>
          <Text style={styles.planCardTitle}>Monthly - Special Veg Thali</Text>
        </View>

        {/* Tiffins Delivered Section with Progress Bar */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>TIFFINS DELIVERED</Text>
          <Text style={styles.tiffinCount}>{tiffinsDelivered}/{totalTiffins}</Text>
        </View>
        <ProgressBar 
          progress={tiffinsDelivered} 
          total={totalTiffins} 
          color={deliveredColor} 
        />

        {/* Hurry Up! Banner */}
        <View style={[styles.alertBanner, { backgroundColor: scheduledColor }]}>
          <Icon name="warning" size={20} color="#000" style={styles.alertIcon} />
          <Text style={styles.alertText}>
            <Text style={{ fontWeight: 'bold' }}>Hurry Up!</Text> Your Premium plan expires in 8 days.
          </Text>
        </View>

        {/* Tracker Calendar */}
        <View style={styles.trackerContainer}>
          <Text style={styles.sectionHeader}>TRACKER</Text>
          <View style={styles.calendar}>
            <CalendarStrip
              scrollable
              style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
              calendarColor={'white'}
              calendarHeaderStyle={{ color: '#888', fontWeight: 'bold' }}
              dateNumberStyle={{ color: '#000' }}
              dateNameStyle={{ color: '#888' }}
              highlightDateNumberStyle={{ color: 'white' }}
              highlightDateNameStyle={{ color: 'white' }}
              iconContainer={{ flex: 0.1 }}
              dateContainerStyle={{ borderRadius: 20 }}
              dayContainerStyle={{ marginHorizontal: 5 }}
              markedDates={customDatesStyles}
            />
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: deliveredColor }]} />
            <Text style={styles.legendText}>Delivered</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: scheduledColor }]} />
            <Text style={styles.legendText}>Scheduled</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: skippedColor }]} />
            <Text style={styles.legendText}>Skipped</Text>
          </View>
        </View>

        {/* Renew Button */}
        <TouchableOpacity style={[styles.renewButton, { backgroundColor: primaryColor }]}>
          <Text style={styles.renewButtonText}>Renew Your Plan</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home-outline" size={24} color="#888" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="share-social-outline" size={24} color="#888" />
          <Text style={styles.navText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="time-outline" size={24} color="#fff" />
          <Text style={[styles.navText, styles.activeNavText]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 120,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 0,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planCardHeader: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  tiffinCount: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  alertIcon: {
    marginRight: 10,
  },
  alertText: {
    flex: 1,
    fontSize: 12,
  },
  trackerContainer: {
    marginBottom: 20,
  },
  calendar: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  renewButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  renewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    backgroundColor: '#FF6F3C',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: -20,
  },
  navText: {
    fontSize: 10,
    color: '#888',
  },
  activeNavText: {
    color: '#fff',
  },
});

export default ActivePlans;
