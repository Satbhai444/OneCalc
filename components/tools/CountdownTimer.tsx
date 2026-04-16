import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function CountdownTimer() {
  const { colors: Colors } = useApp();
  const [target, setTarget] = useState(new Date(new Date().getTime() + 86400000));
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
         <Box val={timeLeft.d} label="DAYS" color="#FF6B35" />
         <Box val={timeLeft.h} label="HRS" color="#3B82F6" />
         <Box val={timeLeft.m} label="MIN" color="#10B981" />
         <Box val={timeLeft.s} label="SEC" color="#8B5CF6" />
      </View>

      <Text style={[styles.title, { color: Colors.text }]}>Target Event Date</Text>
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} 
        onPress={() => setShow(true)}
      >
         <Text style={{color: Colors.text, fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold'}}>{target.toDateString()}</Text>
         <Text>📅</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker value={target} mode="date" display="default" onChange={(e, d) => { setShow(false); if(d) setTarget(d); }} />
      )}
    </View>
  );
}

const Box = ({ val, label, color }: any) => (
  <View style={[styles.box, { backgroundColor: color }]}>
     <Text style={styles.boxVal}>{val}</Text>
     <Text style={styles.boxLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  grid: { flexDirection: 'row', gap: 10, marginBottom: 40 },
  box: { flex: 1, padding: 20, borderRadius: 20, alignItems: 'center' },
  boxVal: { color: '#FFF', fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold' },
  boxLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 9, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1, marginTop: 4 },
  title: { fontSize: 14, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 12, marginLeft: 4 },
  btn: { height: 70, borderRadius: 24, borderWidth: 1.5, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
