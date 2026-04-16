import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';

export default function InvoiceGenerator() {
  const { colors: Colors } = useApp();
  const [items, setItems] = useState([{ id: 1, name: '', price: '', qty: '1' }]);
  
  const addItem = () => setItems([...items, { id: Date.now(), name: '', price: '', qty: '1' }]);
  
  const updateItem = (id: number, field: string, val: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));
  };

  const total = items.reduce((acc, curr) => {
    const p = parseFloat(curr.price) || 0;
    const q = parseFloat(curr.qty) || 0;
    return acc + (p * q);
  }, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { borderBottomColor: Colors.border }]}>
         <Text style={[styles.title, { color: Colors.text }]}>INVOICE SUMMARY</Text>
         <Text style={[styles.total, { color: Colors.primary }]}>₹{total.toLocaleString()}</Text>
      </View>

      <View style={styles.list}>
        {items.map((item, idx) => (
          <View key={item.id} style={[styles.itemCard, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
             <TextInput 
                style={[styles.itemName, { color: Colors.text }]} 
                placeholder="Item Name" 
                value={item.name} 
                onChangeText={(v) => updateItem(item.id, 'name', v)} 
             />
             <View style={styles.row}>
                <View style={{flex: 1}}>
                   <Text style={[styles.smallLabel, { color: Colors.textMuted }]}>Price</Text>
                   <TextInput style={[styles.smallInput, { color: Colors.text }]} value={item.price} onChangeText={(v) => updateItem(item.id, 'price', v)} keyboardType="numeric" placeholder="0" />
                </View>
                <View style={{flex: 1}}>
                   <Text style={[styles.smallLabel, { color: Colors.textMuted }]}>Qty</Text>
                   <TextInput style={[styles.smallInput, { color: Colors.text }]} value={item.qty} onChangeText={(v) => updateItem(item.id, 'qty', v)} keyboardType="numeric" placeholder="1" />
                </View>
             </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.addBtn, { borderColor: Colors.primary }]} onPress={addItem}>
         <Text style={[styles.addText, { color: Colors.primary }]}>+ ADD ITEM</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.printBtn, { backgroundColor: Colors.primary }]}>
         <Text style={styles.printText}>SEND / SAVE INVOICE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { paddingVertical: 20, borderBottomWidth: 1, alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2 },
  total: { fontSize: 44, fontFamily: 'SpaceGrotesk_700Bold', marginTop: 5 },
  list: { gap: 12 },
  itemCard: { padding: 16, borderRadius: 20, borderWidth: 1 },
  itemName: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold', marginBottom: 10 },
  row: { flexDirection: 'row', gap: 16 },
  smallLabel: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold' },
  smallInput: { fontSize: 16, fontFamily: 'SpaceGrotesk_600SemiBold', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  addBtn: { padding: 16, borderRadius: 16, borderWidth: 1.5, borderStyle: 'dashed', alignItems: 'center', marginVertical: 20 },
  addText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 },
  printBtn: { padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 40 },
  printText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
