import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fontSizes, fonts } from '../../../styles/styles';

const Orders = ({navigation}) => {
  const primaryColor = '#FF6F3C';
  const deliveredColor = '#4CAF50';
  const noOrderColor = '#FFC107';

  const [activeTab, setActiveTab] = useState('history');

  const futureOrdersData = [
    {
      id: '1',
      title: 'Special Veg Thali',
      mess: 'Dhewar Mess',
      menu: 'Menu : Mix veg, Paneer, G...',
      mealTime: 'LUNCH',
      scheduledFor: 'Tomorrow',
      statusBandColor: noOrderColor,
    },
    {
      id: '2',
      title: 'Regular Thali',
      mess: 'Suresh Mess',
      menu: 'Menu : Roti, Dal, Rice...',
      mealTime: 'DINNER',
      scheduledFor: 'Day after Tomorrow',
      statusBandColor: deliveredColor,
    },
  ];

  const hasFutureOrders = futureOrdersData.length > 0;

  const renderOrderHistory = () => (
    <>
      <Text style={styles.dateHeader}>TODAY</Text>
      {/* Lunch Order Card */}
      <View style={styles.thaliCard}>
        <View style={styles.thaliContent}>
          <Image 
            source={require('D:/Programming/Navsudh/MMT/MMT/src/assets/thali.png')}
            style={styles.thaliImage} 
          />
          <View style={styles.thaliInfo}>
            <View style={styles.thaliTitleContainer}>
              <Text style={[styles.thaliTitle, { color: '#000', fontFamily: fonts.bold }]} >Special Veg Thali</Text>
              <View style={[styles.lunchButton, { backgroundColor: primaryColor }]}>
                <Text style={[styles.lunchButtonText, { fontFamily: fonts.semiBold }]}>LUNCH</Text>
              </View>
            </View>
            <Text style={[styles.thaliSubtitle, { color: '#666', fontFamily: fonts.regular }]}>Dhewar Mess</Text>
            <Text style={[styles.thaliDescription, { color: '#8B5CF6', fontFamily: fonts.regular }]}>
              Menu : Mix veg, Paneer, G...
            </Text>
          </View>
        </View>
        <View style={[styles.band, { backgroundColor: deliveredColor }]}>
          <TouchableOpacity onPress={() => navigation.navigate('ActivePlans')}>
            <Text style={[styles.bandText, { fontFamily: fonts.semiBold }]}>ORDER DELIVERED</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Dinner Order Card */}
      <View style={styles.thaliCard}>
        <View style={styles.thaliContent}>
          <Image 
            source={require('D:/Programming/Navsudh/MMT/MMT/src/assets/thali.png')}
            style={styles.thaliImage} 
          />
          <View style={styles.thaliInfo}>
            <View style={styles.thaliTitleContainer}>
              <Text style={[styles.thaliTitle, { color: '#000', fontFamily: fonts.bold }]}>Special Veg Thali</Text>
              <View style={[styles.lunchButton, { backgroundColor: '#C05330' }]}>
                <Text style={[styles.lunchButtonText, { fontFamily: fonts.semiBold }]}>DINNER</Text>
              </View>
            </View>
            <Text style={[styles.thaliSubtitle, { color: '#666', fontFamily: fonts.regular }]}>Dhewar Mess</Text>
            <Text style={[styles.thaliDescription, { color: '#8B5CF6', fontFamily: fonts.regular }]}>
              Menu : Mix veg, Paneer, G...
            </Text>
          </View>
        </View>
        <View style={[styles.band, { backgroundColor: deliveredColor }]}>
          <Text style={[styles.bandText, { fontFamily: fonts.semiBold }]}>ORDER DELIVERED</Text>
        </View>
      </View>
    </>
  );

  const renderFutureOrders = () => {
    if (!hasFutureOrders) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { fontFamily: fonts.regular }]}>No Future Orders Scheduled</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={[styles.exploreButtonText, { fontFamily: fonts.semiBold }]}>Explore Messes</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.content}>
        <Text style={[styles.dateHeader, { fontFamily: fonts.semiBold }]}>SCHEDULED</Text>
        {futureOrdersData.map((order) => (
          <View
            key={order.id}
            style={styles.thaliCard}
          >
            <View style={styles.thaliContent}>
              <Image 
                source={require('D:/Programming/Navsudh/MMT/MMT/src/assets/thali.png')}
                style={styles.thaliImage} 
              />
              <View style={styles.thaliInfo}>
                <View style={styles.thaliTitleContainer}>
                  <Text style={[styles.thaliTitle, { color: '#000', fontFamily: fonts.bold }]}>{order.title}</Text>
                  <View style={[styles.lunchButton, { backgroundColor: primaryColor }]}>
                    <Text style={[styles.lunchButtonText, { fontFamily: fonts.semiBold }]}>{order.mealTime}</Text>
                  </View>
                </View>
                <Text style={[styles.thaliSubtitle, { color: '#666', fontFamily: fonts.regular }]}>{order.mess}</Text>
                <Text style={[styles.thaliDescription, { color: '#8B5CF6', fontFamily: fonts.regular }]}>
                  {order.menu}
                </Text>
              </View>
            </View>
            <View style={[styles.band, { backgroundColor: order.statusBandColor }]}>
              <Text style={[styles.bandText, { fontFamily: fonts.semiBold }]}>SCHEDULED FOR {order.scheduledFor.toUpperCase()}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
      <View style={[styles.header, { backgroundColor: primaryColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="arrow-back-outline" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: fonts.bold }]}>Orders</Text>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'history' && styles.activeButton, { backgroundColor: activeTab === 'history' ? primaryColor : 'transparent' }]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.toggleButtonText, activeTab === 'history' && styles.activeButtonText, { fontFamily: fonts.semiBold }]}>ORDER HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, activeTab === 'future' && styles.activeButton, { backgroundColor: activeTab === 'future' ? primaryColor : 'transparent' }]}
          onPress={() => setActiveTab('future')}
        >
          <Text style={[styles.toggleButtonText, activeTab === 'future' && styles.activeButtonText, { fontFamily: fonts.semiBold }]}>FUTURE ORDERS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewContent}>
        {activeTab === 'history' ? renderOrderHistory() : renderFutureOrders()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 16,
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
    // justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: fontSizes.title,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFAB66', 
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 4,
    marginTop: 40,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.label,
  },
  activeButton: {
    backgroundColor: '#FF6F3C',
  },
  activeButtonText: {
    color: '#fff',
  },
  dateHeader: {
    fontSize: fontSizes.label,
    color: '#888',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  thaliCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  thaliContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingRight: 15,
    paddingTop: 0,
    paddingBottom: 0,
    height: 120,
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
    fontSize: fontSizes.subtitle,
    fontWeight: 'bold',
    flex: 1,
  },
  lunchButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lunchButtonText: {
    color: '#fff',
    fontSize: fontSizes.label - 4,
    fontWeight: 'bold',
  },
  thaliSubtitle: {
    fontSize: fontSizes.label,
    marginBottom: 4,
  },
  thaliDescription: {
    fontSize: fontSizes.input - 2,
  },
  band: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bandText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.label - 2,
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: fontSizes.input,
    color: '#888',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#FF6F3C',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.label,
  },
});

export default Orders;
