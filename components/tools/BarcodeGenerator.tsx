import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function BarcodeGenerator() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [data, setData] = useState('1234567890');
  const [barcodeUrl, setBarcodeUrl] = useState('');

  const generate = () => {
    if(!data) return;
    triggerHaptic();
    // Using TEC-IT Barcode API for high quality barcodes
    const url = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Code128&translate-esc=true`;
    setBarcodeUrl(url);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: '#FFF', borderColor: Colors.border }]}>
         {barcodeUrl ? (
            <View style={styles.res}>
               <Image source={{ uri: barcodeUrl }} style={{ width: 280, height: 120, resizeMode: 'contain' }} />
               <Text style={[styles.hint, { color: '#000', marginTop: 10 }]}>CODE 128 BARCODE</Text>
               <Text style={[styles.val, { color: '#666' }]}>{data}</Text>
            </View>
         ) : (
            <Text style={{color: '#999', fontFamily: 'SpaceGrotesk_500Medium'}}>Enter value to generate Barcode</Text>
         )}
      </View>

      <Text style={[styles.label, { color: Colors.text }]}>Value (Numbers/Text)</Text>
      <TextInput 
        style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
        value={data} 
        onChangeText={(t) => { setData(t); setBarcodeUrl(''); }} 
      />

      <TouchableOpacity style={[styles.btn, { backgroundColor: Colors.primary }]} onPress={generate}>
         <Text style={styles.btnText}>GENERATE BARCODE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  box: { height: 250, borderRadius: 24, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  res: { alignItems: 'center' },
  hint: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  val: { fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold', marginTop: 2 },
  label: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 12, marginLeft: 4 },
  input: { height: 60, borderRadius: 16, paddingHorizontal: 20, fontSize: 18, fontFamily: 'SpaceGrotesk_600SemiBold', borderWidth: 1.5, marginBottom: 24 },
  btn: { padding: 20, borderRadius: 20, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
