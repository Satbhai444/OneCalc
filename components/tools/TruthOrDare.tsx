import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useApp } from '../../context/AppContext';

const truths = [
  "What's your biggest deal-breaker?", "What's the most embarrassing things you've done?",
  "What is your biggest fear?", "Who is your secret crush?", "Tell a secret you've never told anyone."
];
const dares = [
  "Dance for 30 seconds", "Sing a song at the top of your lungs",
  "Eat a spoonful of hot sauce", "Do 10 pushups", "Call a random person and say hi"
];

export default function TruthOrDare() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [current, setCurrent] = useState('Truth or Dare?');
  const [type, setType] = useState<'Truth' | 'Dare' | null>(null);

  const getTruth = () => {
    triggerHaptic();
    setType('Truth');
    setCurrent(truths[Math.floor(Math.random() * truths.length)]);
  };

  const getDare = () => {
    triggerHaptic();
    setType('Dare');
    setCurrent(dares[Math.floor(Math.random() * dares.length)]);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: type === 'Truth' ? '#0EA5E9' : type === 'Dare' ? '#EF4444' : Colors.cardBg, borderColor: Colors.border }]}>
         <Text style={[styles.typeText, { color: type ? '#FFF' : Colors.textMuted }]}>{type || 'PICK ONE'}</Text>
         <Text style={[styles.content, { color: type ? '#FFF' : Colors.text }]}>{current}</Text>
      </View>

      <View style={styles.btnRow}>
         <TouchableOpacity style={[styles.btn, { backgroundColor: '#0EA5E9' }]} onPress={getTruth}>
            <Text style={styles.btnText}>TRUTH</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.btn, { backgroundColor: '#EF4444' }]} onPress={getDare}>
            <Text style={styles.btnText}>DARE</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  card: { width: '100%', height: 280, borderRadius: 32, padding: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  typeText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, letterSpacing: 2, marginBottom: 20 },
  content: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, textAlign: 'center', lineHeight: 32 },
  btnRow: { flexDirection: 'row', gap: 16, marginTop: 40 },
  btn: { flex: 1, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18, letterSpacing: 1 },
});
