import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

type Choice = 'rock' | 'paper' | 'scissors';
const choices: Choice[] = ['rock', 'paper', 'scissors'];
const icons = { rock: 'hand-back-left', paper: 'hand-front-left', scissors: 'hand-peace' };

export default function RockPaperScissors() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>('Pick your move!');

  const play = (choice: Choice) => {
    triggerHaptic();
    const comp = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(comp);

    if (choice === comp) setResult("It's a Tie! 🤝");
    else if (
      (choice === 'rock' && comp === 'scissors') ||
      (choice === 'paper' && comp === 'rock') ||
      (choice === 'scissors' && comp === 'paper')
    ) setResult("You Win! 🎉");
    else setResult("AI Wins! 🤖");
  };

  return (
    <View style={styles.container}>
      <View style={styles.battleground}>
        <View style={styles.side}>
           <Text style={[styles.label, { color: Colors.textMuted }]}>AI</Text>
           <View style={[styles.iconBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
              <MaterialCommunityIcons name={computerChoice ? icons[computerChoice] as any : 'robot'} size={60} color={Colors.primary} />
           </View>
        </View>

        <Text style={[styles.vs, { color: Colors.text }]}>VS</Text>

        <View style={styles.side}>
           <Text style={[styles.label, { color: Colors.textMuted }]}>YOU</Text>
           <View style={[styles.iconBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
              <MaterialCommunityIcons name={playerChoice ? icons[playerChoice] as any : 'account'} size={60} color={Colors.text} />
           </View>
        </View>
      </View>

      <Text style={[styles.resultMsg, { color: Colors.text }]}>{result}</Text>

      <View style={styles.choicesRow}>
        {choices.map(c => (
          <TouchableOpacity 
            key={c} 
            style={[styles.choiceBtn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} 
            onPress={() => play(c)}
          >
            <MaterialCommunityIcons name={icons[c] as any} size={32} color={Colors.primary} />
            <Text style={[styles.choiceText, { color: Colors.text }]}>{c.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 450 },
  battleground: { flexDirection: 'row', alignItems: 'center', gap: 30, marginBottom: 40 },
  side: { alignItems: 'center', gap: 10 },
  label: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13, letterSpacing: 1 },
  iconBox: { width: 100, height: 100, borderRadius: 24, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  vs: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, opacity: 0.3 },
  resultMsg: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 28, marginBottom: 50, textAlign: 'center' },
  choicesRow: { flexDirection: 'row', gap: 12 },
  choiceBtn: { flex: 1, paddingVertical: 20, borderRadius: 20, borderWidth: 1, alignItems: 'center', gap: 10 },
  choiceText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 10 },
});
