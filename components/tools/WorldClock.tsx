import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function WorldClock() {
  const { colors: Colors } = useApp();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cities = [
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
    { name: 'Dubai', zone: 'Asia/Dubai' },
    { name: 'Sydney', zone: 'Australia/Sydney' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.mainTime, { backgroundColor: Colors.primary }]}>
         <Text style={styles.label}>LOCAL TIME</Text>
         <Text style={styles.val}>{time.toLocaleTimeString()}</Text>
      </View>

      <View style={styles.list}>
        {cities.map(c => (
           <View key={c.name} style={[styles.card, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
              <Text style={[styles.cityName, { color: Colors.text }]}>{c.name}</Text>
              <Text style={[styles.cityTime, { color: Colors.primary }]}>
                {time.toLocaleTimeString('en-US', { timeZone: c.zone })}
              </Text>
           </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  mainTime: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 24 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 5 },
  list: { gap: 12, marginBottom: 40 },
  card: { padding: 20, borderRadius: 20, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cityName: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  cityTime: { fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold' }
});
