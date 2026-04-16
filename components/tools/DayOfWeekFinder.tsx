import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DayOfWeekFinder() {
  const { colors: Colors } = useApp();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [day, setDay] = useState('');

  useEffect(() => {
    setDay(days[date.getDay()]);
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: Colors.primary }]}>
         <Text style={styles.label}>THE DAY WAS / IS</Text>
         <Text style={styles.val}>{day.toUpperCase()}</Text>
      </View>

      <Text style={[styles.inLabel, { color: Colors.text }]}>Choose a Date</Text>
      <TouchableOpacity 
        style={[styles.inputBtn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} 
        onPress={() => setShow(true)}
      >
         <Text style={{color: Colors.text, fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold'}}>{date.toDateString()}</Text>
         <Text style={{fontSize: 20}}>📅</Text>
      </TouchableOpacity>

      {show && <DateTimePicker value={date} mode="date" display="default" onChange={(e, d) => { setShow(false); if(d) setDate(d); }} />}
      
      <View style={[styles.info, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.infoText, { color: Colors.textMuted }]}>
             Find out which day of the week a specific date falls on. Perfect for birthdays, historical events, or planning!
         </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { padding: 50, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10 },
  inLabel: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 12, marginLeft: 4 },
  inputBtn: { height: 70, borderRadius: 24, borderWidth: 1.5, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { marginTop: 40, padding: 24, borderRadius: 24, borderWidth: 1 },
  infoText: { fontSize: 14, fontFamily: 'SpaceGrotesk_500Medium', textAlign: 'center', lineHeight: 22 }
});
