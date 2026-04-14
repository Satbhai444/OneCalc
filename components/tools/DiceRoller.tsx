import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export default function DiceRoller() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [dice, setDice] = useState(1);
  const [rolling, setRolling] = useState(false);
  const spinValue = React.useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    setRolling(true);
    triggerHaptic();
    
    // Animation
    Animated.sequence([
      Animated.timing(spinValue, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(spinValue, { toValue: 0, duration: 150, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 300);
  };

  const getIcon = () => {
    switch(dice) {
      case 1: return 'dice-1';
      case 2: return 'dice-2';
      case 3: return 'dice-3';
      case 4: return 'dice-4';
      case 5: return 'dice-5';
      case 6: return 'dice-6';
      default: return 'dice-1';
    }
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <View style={[styles.diceBox, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
        <Animated.View style={{ transform: [{ rotate: spin }, { scale: rolling ? 0.8 : 1 }] }}>
           <MaterialCommunityIcons name={getIcon() as any} size={150} color={Colors.primary} />
        </Animated.View>
        <Text style={[styles.resultText, { color: Colors.text }]}>You rolled a {dice}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.rollBtn, { backgroundColor: Colors.primary }]} 
        onPress={rollDice}
        disabled={rolling}
      >
        <Text style={styles.rollBtnText}>{rolling ? 'Rolling...' : 'ROLL DICE'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 },
  diceBox: { width: 280, height: 280, borderRadius: 40, justifyContent: 'center', alignItems: 'center', borderWidth: 1, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
  resultText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 24, marginTop: 20 },
  rollBtn: { marginTop: 40, paddingHorizontal: 40, paddingVertical: 18, borderRadius: 20, elevation: 2 },
  rollBtnText: { fontFamily: 'SpaceGrotesk_700Bold', color: '#FFF', fontSize: 18, letterSpacing: 1 },
});
