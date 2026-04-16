import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function DateAddSub() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [baseDate, setBaseDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('0');
  const [days, setDays] = useState('7');
  
  const [result, setResult] = useState(new Date());

  useEffect(() => {
    const res = new Date(baseDate);
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;
    
    res.setFullYear(res.getFullYear() + y);
    res.setMonth(res.getMonth() + m);
    res.setDate(res.getDate() + d);
    setResult(res);
  }, [baseDate, years, months, days]);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.resCard, { backgroundColor: '#10B981' }]}>
         <Text style={styles.resLabel}>CALCULATED DATE</Text>
         <Text style={styles.resVal}>{result.toDateString()}</Text>
      </View>

      <View style={styles.inputGroup}>
         <Text style={[styles.label, { color: Colors.text }]}>Base Date</Text>
         <TouchableOpacity 
           style={[styles.dateBtn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} 
           onPress={() => setShow(true)}
         >
            <Text style={{color: Colors.text, fontFamily: 'SpaceGrotesk_700Bold'}}>{baseDate.toDateString()}</Text>
            <Text>📅</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.grid}>
          <Field label="Years" val={years} set={setYears} colors={Colors} />
          <Field label="Months" val={months} set={setMonths} colors={Colors} />
          <Field label="Days" val={days} set={setDays} colors={Colors} />
      </View>

      {show && <DateTimePicker value={baseDate} mode="date" display="default" onChange={(e, d) => { setShow(false); if(d) setBaseDate(d); }} />}
    </ScrollView>
  );
}

const Field = ({ label, val, set, colors }: any) => (
  <View style={{flex: 1, gap: 8}}>
     <Text style={[styles.label, { color: colors.text, textAlign: 'center' }]}>{label}</Text>
     <TextInput 
        style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.cardBg }]} 
        value={val} 
        onChangeText={set} 
        keyboardType="numeric" 
     />
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  resCard: { padding: 40, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  resVal: { color: '#FFF', fontSize: 28, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 10, textAlign: 'center' },
  inputGroup: { marginBottom: 30 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 10 },
  dateBtn: { height: 60, borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grid: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  input: { height: 60, borderRadius: 16, borderWidth: 1.5, textAlign: 'center', fontSize: 20, fontFamily: 'SpaceGrotesk_700Bold' }
});
