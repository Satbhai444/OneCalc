import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useApp } from '../../context/AppContext';

export default function AgeOnDate() {
  const { colors: Colors } = useApp();
  const [birth, setBirth] = useState(new Date(1995, 0, 1));
  const [target, setTarget] = useState(new Date());
  const [showB, setShowB] = useState(false);
  const [showT, setShowT] = useState(false);
  
  const [age, setAge] = useState({ y: 0, m: 0, d: 0 });

  useEffect(() => {
    let y = target.getFullYear() - birth.getFullYear();
    let m = target.getMonth() - birth.getMonth();
    let d = target.getDate() - birth.getDate();

    if (d < 0) {
      m--;
      const prev = new Date(target.getFullYear(), target.getMonth(), 0);
      d += prev.getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }
    setAge({ y, m, d });
  }, [birth, target]);

  return (
    <View style={styles.container}>
      <View style={[styles.resCard, { backgroundColor: '#8B5CF6' }]}>
         <Text style={styles.resLabel}>AGE ON TARGET DATE</Text>
         <Text style={styles.resVal}>{age.y} Years</Text>
         <Text style={styles.resSub}>{age.m} Months, {age.d} Days</Text>
      </View>

      <View style={styles.inputs}>
         <DateBtn label="Date of Birth" date={birth} onPress={() => setShowB(true)} colors={Colors} />
         <Box label="⟱" />
         <DateBtn label="Age at the Date of" date={target} onPress={() => setShowT(true)} colors={Colors} />
      </View>

      {showB && <DateTimePicker value={birth} mode="date" display="default" onChange={(e, d) => { setShowB(false); if(d) setBirth(d); }} />}
      {showT && <DateTimePicker value={target} mode="date" display="default" onChange={(e, d) => { setShowT(false); if(d) setTarget(d); }} />}
    </View>
  );
}

const Box = ({ label }: any) => <Text style={{textAlign: 'center', fontSize: 24, marginVertical: 10}}>↓</Text>;

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
  resCard: { padding: 30, borderRadius: 32, alignItems: 'center', marginBottom: 30 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  resVal: { color: '#FFF', fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold' },
  resSub: { color: '#FFF', fontSize: 18, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 5 },
  inputs: { gap: 10 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginLeft: 4 },
  inputBtn: { height: 60, borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
