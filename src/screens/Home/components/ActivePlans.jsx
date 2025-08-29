import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontSizes, fonts } from '../../../styles/styles';

const days = [
  ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31, '', '', '', '']
];

const deliveredDays = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21
];
const scheduledDays = [23, 24, 25, 26, 27, 28, 29, 30, 31];
const skippedDays = [11];

const getStatus = (day) => {
  if (deliveredDays.includes(day)) return 'delivered';
  if (scheduledDays.includes(day)) return 'scheduled';
  if (skippedDays.includes(day)) return 'skipped';
  return null;
};

const ActivePlans = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerBackground}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Active Plans</Text>
        </View>
      </View>

      {/* Plan Details */}
      <View style={styles.planCard}>
        <Text style={styles.label}>CURRENT PLAN</Text>
        <Text style={styles.planName}>Monthly - Special Veg Thali</Text>
      </View>

      {/* Tiffins Delivered */}
      <View style={styles.deliveredContainer}>
        <Text style={styles.deliveredLabel}>TIFFINS DELIVERED</Text>
        <Text style={styles.deliveredCount}>22/60</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>

      {/* Notice */}
      <View style={styles.noticeBox}>
        <Ionicons name="alert-circle" size={24} color="#FFC107" style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.noticeTitle}>Hurry Up!</Text>
          <Text style={styles.noticeText}>Your Premium plan expires in 8 days.</Text>
        </View>
      </View>

      {/* Tracker */}
      <Text style={styles.trackerLabel}>TRACKER</Text>
      <View style={styles.calendarContainer}>
        {days.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((day, di) => {
              if (wi === 0) {
                return (
                  <Text key={di} style={styles.dayHeader}>{day}</Text>
                );
              } else if (day === '') {
                return <View key={di} style={styles.dayEmpty} />;
              }
              const status = getStatus(day);
              let styleCircle = styles.dayCircle;
              if (status === 'delivered') styleCircle = [styles.dayCircle, styles.deliveredCircle];
              if (status === 'scheduled') styleCircle = [styles.dayCircle, styles.scheduledCircle];
              if (status === 'skipped') styleCircle = [styles.dayCircle, styles.skippedCircle];
              return (
                <View key={di} style={styleCircle}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#38C173' }]} />
          <Text style={styles.legendLabel}>Delivered</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFD600' }]} />
          <Text style={styles.legendLabel}>Scheduled</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F56B80' }]} />
          <Text style={styles.legendLabel}>Skipped</Text>
        </View>
      </View>

      {/* Renew Button */}
      <TouchableOpacity style={styles.renewButton}>
        <Text style={styles.renewButtonText}>Renew Your Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBackground: {
    backgroundColor: '#FF511A',
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 10
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 16
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.title,
    fontFamily: fonts.bold,
    marginLeft: 14
  },
  planCard: {
    marginHorizontal: 22,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    shadowColor: '#F2F2F2',
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  label: {
    color: '#acacac',
    fontSize: fontSizes.label,
    fontWeight: 'bold',
    fontFamily: fonts.semiBold,
    letterSpacing: 1
  },
  planName: {
    fontWeight: 'bold',
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.bold,
    marginTop: 8
  },
  deliveredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 24,
    marginBottom: 2
  },
  deliveredLabel: {
    fontSize: fontSizes.input,
    color: '#888',
    flex: 1,
    letterSpacing: 1,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
  deliveredCount: {
    fontSize: fontSizes.input,
    color: '#222',
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 6,
    backgroundColor: '#ececec',
    marginHorizontal: 22,
    marginBottom: 18,
    marginTop: 3,
    width: '86%'
  },
  progressBarFill: {
    width: '36%',
    height: 8,
    borderRadius: 8,
    backgroundColor: '#38C173'
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 22,
    marginBottom: 18
  },
  noticeTitle: {
    fontWeight: 'bold',
    color: '#FFB300',
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.semiBold,
  },
  noticeText: {
    color: '#8D6E63',
    fontSize: fontSizes.input,
    fontFamily: fonts.regular,
  },
  trackerLabel: {
    color: '#888',
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 7,
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.semiBold,
    letterSpacing: 1,
    marginHorizontal: 22
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 8
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    color: '#888',
    fontWeight: 'bold',
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.semiBold,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
    marginVertical: 2
  },
  deliveredCircle: { backgroundColor: '#38C173' },
  scheduledCircle: { backgroundColor: '#FFD600' },
  skippedCircle: { backgroundColor: '#F56B80' },
  dayEmpty: { flex: 1, width: 32, height: 32, marginHorizontal: 1 },
  dayText: {
    color: '#111',
    fontWeight: 'bold',
    fontFamily: fonts.bold,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 14
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5
  },
  legendLabel: {
    color: '#8D8D8D',
    fontSize: fontSizes.input,
    fontFamily: fonts.regular,
  },
  renewButton: {
    backgroundColor: '#FF511A',
    padding: 17,
    borderRadius: 28,
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 22,
    marginBottom: 32,
    elevation: 2
  },
  renewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSizes.subtitle,
    fontFamily: fonts.semiBold,
  }
});

export default ActivePlans;
