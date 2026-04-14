import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function AgeCalculator() {
  const { colors: Colors } = useApp();
  const [birthDate, setBirthDate] = useState(new Date(1995, 0, 1));
  const [showPicker, setShowPicker] = useState(false);
  
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [nextBirthday, setNextBirthday] = useState({ months: 0, days: 0 });

  useEffect(() => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // Next Birthday calculation
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = Math.abs(nextBday.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setNextBirthday({
      months: Math.floor(diffDays / 30.44),
      days: Math.floor(diffDays % 30.44)
    });
  }, [birthDate]);

  return (
    <View style={styles.container}>
      {/* Age Result */}
      <View style={[styles.resultCard, { backgroundColor: '#FF6B35' }]}>
        <Text style={styles.resultLabel}>Your Current Age</Text>
        <View style={styles.ageValueRow}>
           <Text style={styles.ageMainValue}>{age.years}</Text>
           <Text style={styles.ageMainLabel}>Years Old</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Months</Text>
            <Text style={styles.statValue}>{age.months}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Days</Text>
            <Text style={styles.statValue}>{age.days}</Text>
          </View>
        </View>
      </View>

      {/* Next Birthday Card */}
      <View style={[styles.infoCard, { borderColor: Colors.border, backgroundColor: Colors.cardBg }]}>
         <View style={styles.infoIconBox}>
            <Text style={{fontSize: 24}}>🎂</Text>
         </View>
         <View style={{flex: 1}}>
            <Text style={[styles.infoTitle, { color: Colors.text }]}>Next Birthday In</Text>
            <Text style={[styles.infoSubtitle, { color: Colors.textMuted }]}>
               {nextBirthday.months} Months & {nextBirthday.days} Days
            </Text>
         </View>
      </View>

      {/* Date Picker Trigger */}
      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: Colors.text }]}>Select Date of Birth</Text>
        <TouchableOpacity 
          style={[styles.dateInput, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}
          onPress={() => setShowPicker(true)}
        >
          <Text style={[styles.dateText, { color: Colors.text }]}>
            {birthDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Text>
          <Text style={{fontSize: 20}}>📅</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setBirthDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: {
    padding: 30,
    borderRadius: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  resultLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 12, letterSpacing: 1 },
  ageValueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  ageMainValue: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 64, lineHeight: 70 },
  ageMainLabel: { fontFamily: 'SpaceGrotesk_600SemiBold', color: '#FFF', fontSize: 18, marginBottom: 12 },
  
  statsRow: { flexDirection: 'row', marginTop: 30, width: '100%', gap: 10 },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontFamily: 'SpaceGrotesk_500Medium', color: 'rgba(255,255,255,0.7)', fontSize: 11, marginBottom: 4 },
  statValue: { fontFamily: 'SpaceGrotesk_600SemiBold', color: '#FFF', fontSize: 20 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: '100%' },

  infoCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 24, borderWidth: 1, marginTop: 24, gap: 16 },
  infoIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
  infoTitle: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoSubtitle: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 18, marginTop: 2 },

  inputGroup: { marginTop: 30 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14, marginBottom: 12, marginLeft: 4 },
  dateInput: { 
    height: 64, 
    borderRadius: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    borderWidth: 1.5,
  },
  dateText: { fontFamily: 'SpaceGrotesk_600SemiBold', fontSize: 18 },
});
