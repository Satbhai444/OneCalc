import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

const zones = [
  { name: 'London (GMT)', id: 'Europe/London' },
  { name: 'New York (EST)', id: 'America/New_York' },
  { name: 'Tokyo (JST)', id: 'Asia/Tokyo' },
  { name: 'Sydney (AEST)', id: 'Australia/Sydney' },
  { name: 'New Delhi (IST)', id: 'Asia/Kolkata' },
  { name: 'Dubai (GST)', id: 'Asia/Dubai' }
];

export default function TimeZoneConverter() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [sourceTime, setSourceTime] = useState(new Date());
  const [targetZone, setTargetZone] = useState('America/New_York');

  useEffect(() => {
    const timer = setInterval(() => setSourceTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.main, { backgroundColor: Colors.primary }]}>
         <Text style={styles.label}>YOUR TIME</Text>
         <Text style={styles.val}>{sourceTime.toLocaleTimeString()}</Text>
      </View>

      <Text style={[styles.title, { color: Colors.text }]}>Convert to Zone</Text>
      <View style={styles.list}>
         {zones.map(z => (
            <TouchableOpacity 
              key={z.id} 
              style={[styles.card, { backgroundColor: targetZone === z.id ? Colors.primary + '10' : Colors.cardBg, borderColor: targetZone === z.id ? Colors.primary : Colors.border }]}
              onPress={() => { triggerHaptic(); setTargetZone(z.id); }}
            >
               <View>
                  <Text style={[styles.zoneName, { color: Colors.text }]}>{z.name}</Text>
                  <Text style={[styles.converted, { color: Colors.primary }]}>
                    {sourceTime.toLocaleTimeString('en-US', { timeZone: z.id })}
                  </Text>
               </View>
               {targetZone === z.id && <Text style={{fontSize: 20}}>🎯</Text>}
            </TouchableOpacity>
         ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  main: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  label: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  val: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold' },
  title: { fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 15, marginLeft: 4 },
  list: { gap: 10, marginBottom: 40 },
  card: { padding: 20, borderRadius: 20, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  zoneName: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', color: '#666' },
  converted: { fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 4 }
});
