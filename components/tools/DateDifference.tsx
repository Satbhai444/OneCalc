import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function DateDifference() {
  const { colors: Colors } = useApp();
  const [d1, setD1] = useState(new Date());
  const [d2, setD2] = useState(new Date(new Date().getTime() + 86400000 * 7));
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  
  const [diff, setDiff] = useState({ days: 0, weeks: 0, months: 0, years: 0 });

  useEffect(() => {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const weeks = (days / 7).toFixed(1);
    const months = (days / 30.44).toFixed(1);
    const years = (days / 365.25).toFixed(2);
    setDiff({ days, weeks: parseFloat(weeks), months: parseFloat(months), years: parseFloat(years) });
  }, [d1, d2]);

  return (
    <View style={styles.container}>
      <View style={[styles.resCard, { backgroundColor: Colors.primary }]}>
         <Text style={styles.resLabel}>TOTAL DIFFERENCE</Text>
         <Text style={styles.resVal}>{diff.days} Days</Text>
      </View>

      <View style={styles.grid}>
          <Box label="Weeks" val={diff.weeks} color="#3B82F6" />
          <Box label="Months" val={diff.months} color="#10B981" />
          <Box label="Years" val={diff.years} color="#F59E0B" />
          <Box label="Hours" val={diff.days * 24} color="#8B5CF6" />
      </View>

      <View style={styles.inputs}>
         <DateBtn label="Start Date" date={d1} onPress={() => setShow1(true)} colors={Colors} />
         <DateBtn label="End Date" date={d2} onPress={() => setShow2(true)} colors={Colors} />
      </View>

      {show1 && <DateTimePicker value={d1} mode="date" display="default" onChange={(e, d) => { setShow1(false); if(d) setD1(d); }} />}
      {show2 && <DateTimePicker value={d2} mode="date" display="default" onChange={(e, d) => { setShow2(false); if(d) setD2(d); }} />}
    </View>
  );
}

const Box = ({ label, val, color }: any) => (
    <View style={[styles.box, { backgroundColor: color }]}>
       <Text style={styles.boxLabel}>{label}</Text>
       <Text style={styles.boxVal}>{val}</Text>
    </View>
);

const DateBtn = ({ label, date, onPress, colors }: any) => (
    <View style={{gap: 8}}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity style={[styles.inputBtn, { backgroundColor: colors.cardBg, borderColor: colors.border }]} onPress={onPress}>
         <Text style={{color: colors.text, fontFamily: 'SpaceGrotesk_600SemiBold'}}>{date.toDateString()}</Text>
         <Text>📅</Text>
      </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  resCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 20 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  resVal: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
  box: { flex: 1, minWidth: '45%', padding: 20, borderRadius: 24, alignItems: 'center' },
  boxLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold' },
  boxVal: { color: '#FFF', fontSize: 24, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 4 },
  inputs: { gap: 16 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  inputBtn: { height: 60, borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
