import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { useApp } from '../../context/AppContext';
import { saveHistory } from '../../utils/history';
import { scheduleToolNotification } from '../../utils/notifications';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('1000');
  const [discount, setDiscount] = useState('20');
  const [tax, setTax] = useState('5');
  const { colors: Colors, triggerHaptic } = useApp();
  const styles = getStyles(Colors);

  const calculate = () => {
    const P = parseFloat(price) || 0;
    const D = parseFloat(discount) || 0;
    const T = parseFloat(tax) || 0;
    
    const savings = (P * D) / 100;
    const discountedPrice = P - savings;
    const taxAmt = (discountedPrice * T) / 100;
    const finalPrice = discountedPrice + taxAmt;

    return { savings, finalPrice };
  };

  const { savings, finalPrice } = calculate();

  const triggerSave = () => {
    saveHistory('discount', `Price: ₹${price}, Disc: ${discount}%, Tax: ${tax}%`, `Final: ₹${finalPrice.toFixed(2)}`);
    scheduleToolNotification('discount');
  };

  return (
    <View style={styles.container}>
      <Header title="Discount Calculator" accentColor="#FF1744" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>Final Price</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>₹ {finalPrice.toFixed(2)}</Text>
          <View style={styles.divider} />
          <View style={{alignItems:'center'}}><Text style={styles.statLabel}>You Save</Text><Text style={styles.statValue}>₹ {savings.toFixed(2)}</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Original Price (₹)</Text>
          <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" selectionColor="#FF1744" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Discount (%)</Text>
          <TextInput style={styles.input} value={discount} onChangeText={setDiscount} keyboardType="numeric" selectionColor="#FF1744" onSubmitEditing={triggerSave}/>
          <Text style={styles.label}>Tax (% optional)</Text>
          <TextInput style={styles.input} value={tax} onChangeText={setTax} keyboardType="numeric" selectionColor="#FF1744" onSubmitEditing={triggerSave}/>
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
  displayText: { fontFamily: 'DMSans_700Bold', color: '#FF1744', fontSize: 36 },
  divider: { height: 1, backgroundColor: Colors.border, width: '100%', marginVertical: 16 },
  statLabel: { fontFamily: 'DMSans_400Regular', color: Colors.textMuted, fontSize: 12 },
  statValue: { fontFamily: 'DMSans_700Bold', color: Colors.text, fontSize: 20, marginTop: 4 },
  card: { backgroundColor: Colors.cardBg, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: Colors.border },
  label: { fontFamily: 'DMSans_500Medium', color: Colors.text, fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: Colors.background, color: Colors.text, fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.border }
});
