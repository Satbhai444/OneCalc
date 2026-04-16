import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function QRGenerator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [text, setText] = useState('https://google.com');
  const [qrUrl, setQrUrl] = useState('');

  const generate = () => {
    if(!text) return;
    triggerHaptic();
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}`;
    setQrUrl(url);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.qrBox, { backgroundColor: '#FFF', borderColor: Colors.border }]}>
         {qrUrl ? (
            <View style={styles.placeholder}>
               <Image source={{ uri: qrUrl }} style={{ width: 220, height: 220 }} />
               <Text style={[styles.hint, { color: '#000', marginTop: 15 }]}>STABLE SCANNABLE QR</Text>
               <Text style={[styles.subHint, { color: '#666' }]} numberOfLines={1}>{text}</Text>
            </View>
         ) : (
            <Text style={[styles.msg, { color: Colors.textMuted }]}>Enter text below to generate QR</Text>
         )}
      </View>

      <Text style={[styles.label, { color: Colors.text }]}>Website URL or Text</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={text} 
        onChangeText={(t) => { setText(t); setQrUrl(''); }} 
        placeholder="https://..."
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={generate}>
         <Text style={styles.btnText}>GENERATE SCANNABLE QR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  qrBox: { height: 300, borderRadius: 32, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  placeholder: { alignItems: 'center', gap: 10 },
  hint: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 18 },
  subHint: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 12, opacity: 0.6 },
  msg: { fontFamily: 'SpaceGrotesk_500Medium', fontSize: 14 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 12, marginLeft: 4 },
  input: { height: 64, borderRadius: 20, paddingHorizontal: 20, fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', borderWidth: 1.5, marginBottom: 20 },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
