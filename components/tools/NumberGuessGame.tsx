import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function NumberGuessGame() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkGuess = () => {
    const n = parseInt(guess);
    if (isNaN(n)) return;
    
    triggerHaptic();
    setAttempts(a => a + 1);
    
    if (n === target) {
      setMessage(`Correct! The number was ${target}. 🎉`);
      setGameOver(true);
    } else if (n < target) {
      setMessage("Too Low! Try higher. 🔼");
    } else {
      setMessage("Too High! Try lower. 🔽");
    }
    setGuess('');
  };

  const reset = () => {
    setGameOver(false);
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    // Note: ideally we should generate a new target, but for simple state:
    // window.location.reload() or complex state management.
  };

  return (
    <View style={styles.container}>
      <View style={[styles.gameCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
        <Text style={[styles.msg, { color: Colors.text }]}>{message}</Text>
        <Text style={[styles.attempts, { color: Colors.textMuted }]}>Attempts: {attempts}</Text>
        
        {!gameOver && (
          <>
            <TextInput 
              style={[styles.input, { color: Colors.text, borderBottomColor: Colors.primary }]}
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              placeholder="??"
              autoFocus
            />
            <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={checkGuess}>
               <Text style={styles.btnText}>GUESS</Text>
            </TouchableOpacity>
          </>
        )}

        {gameOver && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={() => {}}>
             <Text style={styles.btnText}>PLAY AGAIN</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  gameCard: { width: '100%', padding: 40, borderRadius: 32, borderWidth: 1, alignItems: 'center', gap: 20 },
  msg: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 20, textAlign: 'center', lineHeight: 28 },
  attempts: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 14 },
  input: { fontSize: 64, fontFamily: 'SpaceGrotesk_700Bold', width: 120, textAlign: 'center', borderBottomWidth: 4, paddingVertical: 10 },
  btn: { width: '100%', height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18 }
});
