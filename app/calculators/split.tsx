import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Share } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';
import { Ionicons } from '@expo/vector-icons';

export default function BillSplitter() {
  const [total, setTotal] = useState('1200');
  const [people, setPeople] = useState('4');
  const [tip, setTip] = useState('10');
  const [friendNames, setFriendNames] = useState<string[]>(['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4']);
  
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  useEffect(() => {
    const num = parseInt(people) || 1;
    if (num > 0 && num <= 20) {
      setFriendNames(prev => {
        const newNames = [...prev];
        if (newNames.length < num) {
          for (let i = newNames.length; i < num; i++) newNames.push(`Friend ${i + 1}`);
        } else {
          newNames.length = num;
        }
        return newNames;
      });
    }
  }, [people]);

  const calculateSplit = () => {
    const bill = parseFloat(total) || 0;
    const num = parseFloat(people) || 1;
    const tipPct = parseFloat(tip) || 0;
    const tipAmt = (bill * tipPct) / 100;
    const grandTotal = bill + tipAmt;
    return { perPerson: grandTotal / num, tipTotal: tipAmt, grandTotal };
  };

  const { perPerson, tipTotal, grandTotal } = calculateSplit();

  const shareReceipt = async () => {
    triggerHaptic();
    let splitList = friendNames.map(name => `- ${name}: ₹${perPerson.toFixed(2)}`).join('\n');
    const message = `🧾 OneCalc Bill Receipt\n--------------------------\nTotal Bill: ₹${total}\nTip (${tip}%): ₹${tipTotal.toFixed(2)}\nGrand Total: ₹${grandTotal.toFixed(2)}\n--------------------------\nSplits:\n${splitList}\n\nSplit Smarter with OneCalc`;
    try {
      await Share.share({ message });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFriendName = (index: number, name: string) => {
    const newNames = [...friendNames];
    newNames[index] = name;
    setFriendNames(newNames);
  };

  const triggerSave = () => {
    saveHistory('split', `Bill: ₹${total}, Ppl: ${people}`, `Per Person: ₹${perPerson.toFixed(2)}`);
    scheduleToolNotification('split');
  };

  return (
    <View style={styles.container}>
      <Header title="Bill Splitter" accentColor="#522B47" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Each Person Pays</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {perPerson.toFixed(2)}</Text>
          <View style={styles.divider} />
          <View style={styles.statsRow}>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Tip Total</Text><Text style={styles.statValue}>₹ {tipTotal.toFixed(2)}</Text></View>
            <View style={{alignItems:'center'}}><Text style={styles.statLabel}>Grand Total</Text><Text style={styles.statValue}>₹ {grandTotal.toFixed(2)}</Text></View>
          </View>
          <TouchableOpacity style={styles.receiptBtn} onPress={shareReceipt}>
             <Ionicons name="receipt-outline" size={18} color="#FFFFFF" />
             <Text style={styles.receiptBtnText}>Generate & Share Receipt</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Bill Settings</Text>
          <View style={styles.inputRow}>
            <View style={{flex:2}}>
              <Text style={styles.subLabel}>Total Bill (₹)</Text>
              <TextInput style={styles.smallInput} value={total} onChangeText={setTotal} keyboardType="numeric" selectionColor="#522B47" />
            </View>
            <View style={{flex:1}}>
              <Text style={styles.subLabel}>Tip (%)</Text>
              <TextInput style={styles.smallInput} value={tip} onChangeText={setTip} keyboardType="numeric" selectionColor="#522B47" />
            </View>
          </View>

          <Text style={[styles.label, {marginTop:12}]}>Number of People</Text>
          <TextInput style={styles.input} value={people} onChangeText={setPeople} keyboardType="numeric" maxLength={2} selectionColor="#522B47" />
          
          {friendNames.length > 0 && (
            <>
              <Text style={[styles.label, {marginTop:12}]}>Friend Names</Text>
              <View style={styles.friendList}>
                {friendNames.map((name, index) => (
                  <View key={index} style={styles.friendInputRow}>
                    <Text style={styles.friendIndex}>{index + 1}.</Text>
                    <TextInput 
                      style={styles.friendInput} 
                      value={name} 
                      onChangeText={(text) => updateFriendName(index, text)}
                      placeholder={`Friend ${index + 1}`}
                      placeholderTextColor="#A0A0A0"
                      selectionColor="#522B47"
                    />
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  contentContainer: { padding: 20 },
  displayCard: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: Colors.textMuted, fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '#522B47', fontSize: 42 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 16, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 16, marginBottom: 8 },
  subLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12, marginBottom: 4 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border },
  inputRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  smallInput: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 16, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: Colors.border },
  receiptBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#522B47', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 16, marginTop: 16 },
  receiptBtnText: { fontFamily: 'DMSans_700Bold', color: '#FFFFFF', fontSize: 14, marginLeft: 8 },
  friendList: { marginTop: 8 },
  friendInputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 12 },
  friendIndex: { fontFamily: 'DMSans_700Bold', color: Colors.textMuted, fontSize: 14, width: 25 },
  friendInput: { flex: 1, backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_500Medium', fontSize: 14, borderRadius: 12, padding: 10, borderWidth: 1, borderColor: Colors.border }
});
