import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function GPACalculator() {
  const { colors: Colors } = useApp();
  const [courses, setCourses] = useState([{ id: 1, grade: '', credits: '' }]);
  
  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), grade: '', credits: '' }]);
  };

  const updateCourse = (id: number, field: string, val: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      const g = parseFloat(c.grade);
      const cr = parseFloat(c.credits);
      if (!isNaN(g) && !isNaN(cr)) {
        totalPoints += g * cr;
        totalCredits += cr;
      }
    });
    return totalCredits === 0 ? '0.00' : (totalPoints / totalCredits).toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.resultCard, { backgroundColor: '#8B5CF6' }]}>
         <Text style={styles.resLabel}>Current GPA</Text>
         <Text style={styles.resValue}>{calculate()}</Text>
      </View>

      <View style={styles.list}>
        {courses.map((c, idx) => (
          <View key={c.id} style={[styles.courseRow, { borderColor: Colors.border, backgroundColor: Colors.cardBg }]}>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.textMuted }]}>Grade (0-10)</Text>
                <TextInput style={[styles.input, { color: Colors.text }]} value={c.grade} onChangeText={(v) => updateCourse(c.id, 'grade', v)} keyboardType="numeric" placeholder="9.5" />
             </View>
             <View style={{flex: 1}}>
                <Text style={[styles.label, { color: Colors.textMuted }]}>Credits</Text>
                <TextInput style={[styles.input, { color: Colors.text }]} value={c.credits} onChangeText={(v) => updateCourse(c.id, 'credits', v)} keyboardType="numeric" placeholder="4" />
             </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.addBtn, { backgroundColor: Colors.primary }]} onPress={addCourse}>
         <Text style={styles.addText}>+ ADD COURSE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  resultCard: { padding: 30, borderRadius: 24, alignItems: 'center', marginBottom: 20 },
  resLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold' },
  resValue: { color: '#FFF', fontSize: 48, fontFamily: 'SpaceGrotesk_700Bold' },
  list: { gap: 12 },
  courseRow: { padding: 16, borderRadius: 16, borderWidth: 1, flexDirection: 'row', gap: 16 },
  label: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 4 },
  input: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  addBtn: { padding: 18, borderRadius: 18, alignItems: 'center', marginTop: 24, marginBottom: 40 },
  addText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
