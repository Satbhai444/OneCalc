import os

screens = [
    {
        'slug': 'gst', 'title': 'GST Calculator', 'accent': '#FF6B00',
        'fields': ['Amount'],
        'calc_logic': """
  // GST Logic
  const calculate = () => {
    const amt = parseFloat(amount) || 0;
    const gstRate = parseFloat(slab);
    const gstAmt = (amt * gstRate) / 100;
    return {
      cgst: gstAmt / 2,
      sgst: gstAmt / 2,
      total: isAdd ? amt + gstAmt : amt - gstAmt
    };
  };
""",
        'state_hooks': "const [amount, setAmount] = useState('1000');\n  const [slab, setSlab] = useState('18');\n  const [isAdd, setIsAdd] = useState(true);",
        'picker_values': "['5', '12', '18', '28']",
        'summary_rows': [
          {'label': 'CGST', 'value': 'formatCurrency(results.cgst)'},
          {'label': 'SGST', 'value': 'formatCurrency(results.sgst)'},
          {'label': 'Total Amount', 'value': 'formatCurrency(results.total)'}
        ]
    },
    {
        'slug': 'interest', 'title': 'Interest Calculator', 'accent': '#FFB300',
        'fields': ['Principal', 'Rate (%)', 'Time (Years)'],
        'calc_logic': """
  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const R = parseFloat(rate) || 0;
    const T = parseFloat(time) || 0;
    const si = (P * R * T) / 100;
    const ci = P * (Math.pow((1 + R / 100), T)) - P;
    return { si, ci };
  };
""",
        'state_hooks': "const [principal, setPrincipal] = useState('10000');\n  const [rate, setRate] = useState('8');\n  const [time, setTime] = useState('2');",
        'summary_rows': [
          {'label': 'Simple Interest', 'value': 'formatCurrency(results.si)'},
          {'label': 'Compound Interest', 'value': 'formatCurrency(results.ci)'}
        ]
    },
    {
        'slug': 'split', 'title': 'Bill Splitter', 'accent': '#522B47',
        'fields': ['Total Bill', 'No of People', 'Tip (%)'],
        'calc_logic': """
  const calculate = () => {
    const bill = parseFloat(totalBill) || 0;
    const n = parseInt(noOfPeople) || 1;
    const t = parseFloat(tip) || 0;
    const tipAmt = (bill * t) / 100;
    const grandTotal = bill + tipAmt;
    return { tipAmt, grandTotal, perPerson: grandTotal / n };
  };
""",
        'state_hooks': "const [totalBill, setTotalBill] = useState('1200');\n  const [noOfPeople, setNoOfPeople] = useState('4');\n  const [tip, setTip] = useState('10');",
        'summary_rows': [
          {'label': 'Tip Amount', 'value': 'formatCurrency(results.tipAmt)'},
          {'label': 'Grand Total', 'value': 'formatCurrency(results.grandTotal)'},
          {'label': 'Per Person', 'value': 'formatCurrency(results.perPerson)'}
        ]
    },
    {
        'slug': 'discount', 'title': 'Discount Calculator', 'accent': '#FF1744',
        'fields': ['Original Price', 'Percent Off (%)'],
        'calc_logic': """
  const calculate = () => {
    const price = parseFloat(originalPrice) || 0;
    const off = parseFloat(percentOff) || 0;
    const savings = (price * off) / 100;
    return { savings, final: price - savings };
  };
""",
        'state_hooks': "const [originalPrice, setOriginalPrice] = useState('2000');\n  const [percentOff, setPercentOff] = useState('20');",
        'summary_rows': [
          {'label': 'You Save', 'value': 'formatCurrency(results.savings)'},
          {'label': 'Final Price', 'value': 'formatCurrency(results.final)'}
        ]
    }
]

# Generate simple consistent V4 form wrapper template
template = """import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Picker } from '@react-native-picker/picker';

export default function [CLASS_NAME]() {
  [STATE_HOOKS]

  [CALC_LOGIC]
  
  const results = calculate();

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'INR',
    });
  };

  return (
    <View style={styles.container}>
      <Header title="[TITLE]" accentColor="[ACCENT]" showBack={true} />
      <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        
        <View style={styles.displayCard}>
          <Text style={styles.displayLabel}>[MAIN_LABEL]</Text>
          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {[MAIN_VALUE]}
          </Text>
        </View>

        <View style={styles.card}>
          [INPUT_FIELDS]
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Summary</Text>
          [SUMMARY_ROWS]
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  contentContainer: { padding: 20, paddingBottom: 40 },
  displayCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 20,
    borderWidth: 1, borderColor: '#D8E4F0', shadowColor: '#000', elevation: 4
  },
  displayLabel: { fontFamily: 'DMSans_500Medium', color: '#7A9BB5', fontSize: 14, marginBottom: 8 },
  displayText: { fontFamily: 'DMSans_700Bold', color: '[ACCENT]', fontSize: 42 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#D8E4F0' },
  label: { fontFamily: 'DMSans_500Medium', color: '#0A1F44', fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', color: '#0A1F44', fontFamily: 'DMSans_700Bold', fontSize: 18, borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#D8E4F0' },
  pickerWrapper: { backgroundColor: '#F8FAFC', borderRadius: 16, borderWidth: 1, borderColor: '#D8E4F0', marginBottom: 16 },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#D8E4F0' },
  infoTitle: { fontFamily: 'DMSans_700Bold', color: '#0A1F44', fontSize: 16, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  infoLabel: { fontFamily: 'DMSans_400Regular', color: '#7A9BB5', fontSize: 14 },
  infoValue: { fontFamily: 'DMSans_500Medium', color: '#0A1F44', fontSize: 16 }
});
"""

for s in screens:
    # Build inputs
    inputs_code = ""
    # Check for GST special slab picker
    if s['slug'] == 'gst':
        inputs_code += """
          <Text style={styles.label}>Amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" selectionColor="[ACCENT]"/>
          <Text style={styles.label}>Tax Slab (%)</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={slab} onValueChange={setSlab}>
              {['5', '12', '18', '28'].map(p => <Picker.Item key={p} label={p + '%'} value={p}/>)}
            </Picker>
          </View>
          <View style={{flexDirection:'row', gap: 10}}>
            <TouchableOpacity onPress={()=>setIsAdd(true)} style={{flex:1, padding:14, backgroundColor:isAdd?'[ACCENT]':'#F1F5F9', borderRadius:12, alignItems:'center'}}><Text style={{color:isAdd?'#FFF':'#0A1F44'}}>Add GST</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsAdd(false)} style={{flex:1, padding:14, backgroundColor:!isAdd?'[ACCENT]':'#F1F5F9', borderRadius:12, alignItems:'center'}}><Text style={{color:!isAdd?'#FFF':'#0A1F44'}}>Remove GST</Text></TouchableOpacity>
          </View>
""".replace('[ACCENT]', s['accent'])
    else:
        for f in s['fields']:
            camel = f.split(' ')[0].lower() + f.replace(' ', '').replace('(%)', '')[len(f.split(' ')[0]):]
            inputs_code += f"""
          <Text style={styles.label}>{f}</Text>
          <TextInput style={styles.input} value={{{camel}}} onChangeText={{set{camel[0].upper()+camel[1:]}}} keyboardType="numeric" selectionColor="{s['accent']}"/>
"""

    summary_code = ""
    for r in s['summary_rows']:
        summary_code += f"""
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{r['label']}</Text>
            <Text style={styles.infoValue}>{{{r['value']}}}</Text>
          </View>
"""

    main_val = s['summary_rows'][-1]['value'] if s['slug'] != 'gst' else 'formatCurrency(results.total)'
    main_label = s['summary_rows'][-1]['label'] if s['slug'] != 'gst' else 'Total Amount'

    code = template.replace('[CLASS_NAME]', s['title'].replace(' ', ''))\
                   .replace('[TITLE]', s['title'])\
                   .replace('[ACCENT]', s['accent'])\
                   .replace('[STATE_HOOKS]', s['state_hooks'])\
                   .replace('[CALC_LOGIC]', s['calc_logic'])\
                   .replace('[INPUT_FIELDS]', inputs_code)\
                   .replace('[SUMMARY_ROWS]', summary_code)\
                   .replace('[MAIN_LABEL]', main_label)\
                   .replace('[MAIN_VALUE]', main_val)

    with open(f"app/calculators/{s['slug']}.tsx", 'w', encoding='utf-8') as f:
        f.write(code)

print("Bulk created 4 core calculators forms style.")
