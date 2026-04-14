import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useApp } from '../../context/AppContext';

const icons = ['🔥', '💡', '💎', '🍀', '🍎', '⚽', '🎒', '🚀'];
const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);

export default function MemoryGame() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  
  const handlePress = (index: number) => {
    if (flipped.includes(index) || solved.includes(index) || flipped.length === 2) return;
    
    triggerHaptic();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (deck[newFlipped[0]] === deck[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.text }]}>Find the Pairs</Text>
      <View style={styles.grid}>
        {deck.map((icon, i) => (
          <TouchableOpacity 
            key={i} 
            style={[styles.tile, { backgroundColor: solved.includes(i) ? '#22C55E' : flipped.includes(i) ? Colors.primary : Colors.cardBg, borderColor: Colors.border }]}
            onPress={() => handlePress(i)}
          >
            <Text style={styles.tileText}>{(flipped.includes(i) || solved.includes(i)) ? icon : '?'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {solved.length === deck.length && (
         <Text style={[styles.win, { color: Colors.primary }]}>You Won! 🏆</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, marginBottom: 30 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  tile: { width: 75, height: 75, borderRadius: 16, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  tileText: { fontSize: 32 },
  win: { marginTop: 30, fontSize: 32, fontFamily: 'SpaceGrotesk_700Bold' }
});
