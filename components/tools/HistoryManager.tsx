import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../../context/AppContext';

export default function HistoryManager() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [history, setHistory] = useState<any[]>([]);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('user_history');
      if (data) setHistory(JSON.parse(data));
    } catch (e) {
      console.log('Error loading history');
    }
  };

  const clearHistory = async () => {
    triggerHaptic();
    Alert.alert('Clear History', 'Are you sure you want to delete all records?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: async () => {
        await AsyncStorage.removeItem('user_history');
        setHistory([]);
      }, style: 'destructive' }
    ]);
  };

  useEffect(() => { loadHistory(); }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={[styles.title, { color: Colors.text }]}>RECENT CALCULATIONS</Text>
         <TouchableOpacity onPress={clearHistory}>
            <Text style={{color: '#EF4444', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 13}}>CLEAR ALL</Text>
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {history.length > 0 ? history.map((item, i) => (
           <View key={i} style={[styles.card, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]}>
              <View style={styles.row}>
                 <Text style={[styles.toolName, { color: Colors.primary }]}>{item.tool}</Text>
                 <Text style={[styles.date, { color: Colors.textMuted }]}>{new Date(item.time).toLocaleTimeString()}</Text>
              </View>
              <Text style={[styles.result, { color: Colors.text }]}>{item.result}</Text>
           </View>
        )) : (
          <View style={styles.empty}>
             <Text style={{fontSize: 50, marginBottom: 10}}>📜</Text>
             <Text style={[styles.emptyText, { color: Colors.textMuted }]}>No history records found.</Text>
             <Text style={[styles.emptySub, { color: Colors.textMuted }]}>Calculations you perform will appear here.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 13, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 1 },
  list: { gap: 12, paddingBottom: 40 },
  card: { padding: 20, borderRadius: 20, borderWidth: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  toolName: { fontSize: 11, fontFamily: 'SpaceGrotesk_700Bold', textTransform: 'uppercase' },
  date: { fontSize: 10, fontFamily: 'SpaceGrotesk_500Medium' },
  result: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  empty: { height: 400, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  emptySub: { fontSize: 13, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 5, textAlign: 'center' }
});
