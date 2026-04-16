import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { useApp } from '../../context/AppContext';

export default function TTSTool() {
  const { colors: Colors, triggerHaptic } = useApp();
  const [activeTab, setActiveTab] = useState<'tts' | 'stt'>('tts');
  const [text, setText] = useState('Hello! I am your OneCalc assistant.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [showVoices, setShowVoices] = useState(false);
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  
  const webviewRef = useRef<WebView>(null);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    setVoices(availableVoices);
    setFilteredVoices(availableVoices);
    if(availableVoices.length > 0) setSelectedVoice(availableVoices[0].identifier);
  };

  useEffect(() => {
    if (genderFilter === 'all') {
      setFilteredVoices(voices);
    } else {
      setFilteredVoices(voices.filter(v => 
        v.name.toLowerCase().includes(genderFilter) || 
        (genderFilter === 'male' && v.name.includes('David')) ||
        (genderFilter === 'female' && (v.name.includes('Zira') || v.name.includes('Samantha')))
      ));
    }
  }, [genderFilter, voices]);

  const speak = () => {
    triggerHaptic();
    setIsSpeaking(true);
    Speech.speak(text, {
      voice: selectedVoice || undefined,
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false)
    });
  };

  const startSTT = () => {
    triggerHaptic();
    setIsListening(true);
    webviewRef.current?.injectJavaScript('startRecognition();');
  };

  const onWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'result') {
      setText(prev => (prev + ' ' + data.text).trim());
      setIsListening(false);
    } else if (data.type === 'error') {
      setIsListening(false);
      alert('Voice engine error. Please try again or use keyboard mic.');
    }
  };

  const sttHTML = `
    <html>
      <head>
        <script>
          const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
          recognition.continuous = false;
          recognition.interimResults = false;
          
          function startRecognition() {
            try {
              recognition.start();
            } catch(e) { window.ReactNativeWebView.postMessage(JSON.stringify({type: 'error', msg: e.message})); }
          }

          recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'result', text: text}));
          };

          recognition.onerror = (e) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'error', msg: e.error}));
          };
        </script>
      </head>
      <body></body>
    </html>
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.tabBar}>
         <TouchableOpacity 
           style={[styles.tab, activeTab === 'tts' && { borderBottomColor: Colors.primary }]} 
           onPress={() => { triggerHaptic(); setActiveTab('tts'); }}
         >
            <Text style={[styles.tabText, { color: activeTab === 'tts' ? Colors.primary : Colors.textMuted }]}>TEXT TO SPEECH</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={[styles.tab, activeTab === 'stt' && { borderBottomColor: Colors.primary }]} 
           onPress={() => { triggerHaptic(); setActiveTab('stt'); }}
         >
            <Text style={[styles.tabText, { color: activeTab === 'stt' ? Colors.primary : Colors.textMuted }]}>VOICE TYPING (STT)</Text>
         </TouchableOpacity>
      </View>

      <View style={{height: 0, width: 0, opacity: 0}}>
         <WebView 
           ref={webviewRef}
           source={{ html: sttHTML }}
           onMessage={onWebViewMessage}
           originWhitelist={['*']}
           allowsInlineMediaPlayback={true}
           mediaPlaybackRequiresUserAction={false}
           javaScriptEnabled={true}
         />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {activeTab === 'tts' ? (
           <View>
              <View style={[styles.visualizer, { backgroundColor: isSpeaking ? Colors.primary : Colors.cardBg, borderColor: Colors.border }]}>
                 <Text style={{fontSize: 50}}>{isSpeaking ? '📢' : '🎙️'}</Text>
                 <Text style={[styles.status, { color: isSpeaking ? '#FFF' : Colors.textMuted }]}>{isSpeaking ? 'SPEAKING' : 'IDLE'}</Text>
              </View>

              <TouchableOpacity style={[styles.pickerBtn, { backgroundColor: Colors.cardBg, borderColor: Colors.border }]} onPress={() => setShowVoices(true)}>
                 <View>
                    <Text style={styles.tinyLabel}>VOICE ENGINE</Text>
                    <Text style={{color: Colors.text, fontFamily: 'SpaceGrotesk_700Bold'}} numberOfLines={1}>
                       {voices.find(v => v.identifier === selectedVoice)?.name || 'Select Voice'}
                    </Text>
                 </View>
                 <Text style={{color: Colors.primary}}>CHANGE 🔄</Text>
              </TouchableOpacity>

              <TextInput 
                style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg }]} 
                value={text} onChangeText={setText} multiline
                placeholder="Type text for TTS..."
              />

              <TouchableOpacity style={[styles.mainBtn, { backgroundColor: Colors.primary }]} onPress={isSpeaking ? () => Speech.stop() : speak}>
                 <Text style={styles.mainBtnText}>{isSpeaking ? 'STOP AUDIO' : 'SPEAK TEXT'}</Text>
              </TouchableOpacity>
           </View>
        ) : (
           <View style={styles.sttBox}>
              <View style={[styles.micBox, { backgroundColor: isListening ? '#EF4444' : Colors.cardBg, borderColor: Colors.border }]}>
                 <TouchableOpacity style={[styles.mainMicBtn, { backgroundColor: isListening ? '#FFF' : Colors.primary }]} onPress={startSTT}>
                    <Text style={{fontSize: 40}}>{isListening ? '🛑' : '🎙️'}</Text>
                 </TouchableOpacity>
                 <Text style={[styles.sttTitle, { color: isListening ? '#FFF' : Colors.text, marginTop: 15 }]}>
                    {isListening ? 'LISTENING Real-time...' : 'TAP TO SPEAK'}
                 </Text>
              </View>

              <TextInput 
                style={[styles.input, { borderColor: Colors.border, color: Colors.text, backgroundColor: Colors.cardBg, height: 260 }]} 
                value={text} onChangeText={setText} multiline placeholder="Speak clearly into the mic..."
                onFocus={() => triggerHaptic()} 
              />

              <TouchableOpacity style={[styles.dictateBtn, { backgroundColor: Colors.primary }]} onPress={startSTT}>
                 <Text style={styles.dictateText}>START VOICE RECOGNITION</Text>
              </TouchableOpacity>
           </View>
        )}
      </ScrollView>

      <Modal visible={showVoices} animationType="slide">
         <View style={[styles.modal, { backgroundColor: Colors.bg }]}>
            <View style={styles.modalHeader}>
               <Text style={[styles.modalTitle, { color: Colors.text }]}>Voice Preferences</Text>
               <TouchableOpacity onPress={() => setShowVoices(false)} style={styles.doneBtn}>
                  <Text style={{color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold'}}>SAVE</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.filterRow}>
               {['all', 'male', 'female'].map(f => (
                  <TouchableOpacity key={f} style={[styles.filterChip, { backgroundColor: genderFilter === f ? Colors.primary : Colors.cardBg }]} onPress={() => setGenderFilter(f as any)}>
                     <Text style={{color: genderFilter === f ? '#FFF' : Colors.text, textTransform: 'uppercase', fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold'}}>{f}</Text>
                  </TouchableOpacity>
               ))}
            </View>

            <FlatList 
               data={filteredVoices}
               renderItem={({ item }) => (
                  <TouchableOpacity style={[styles.voiceItem, { borderBottomColor: Colors.border }]} onPress={() => { setSelectedVoice(item.identifier); setShowVoices(false); }}>
                     <View>
                        <Text style={[styles.vName, { color: Colors.text }]}>{item.name}</Text>
                        <Text style={[styles.vLang, { color: Colors.textMuted }]}>{item.language}</Text>
                     </View>
                     {selectedVoice === item.identifier && <Text style={{color: Colors.primary}}>✅</Text>}
                  </TouchableOpacity>
               )}
            />
         </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  tabText: { fontFamily: 'SpaceGrotesk_700Bold', fontSize: 12 },
  visualizer: { height: 140, borderRadius: 24, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  status: { fontSize: 10, fontFamily: 'SpaceGrotesk_700Bold', letterSpacing: 2, marginTop: 5 },
  pickerBtn: { height: 70, borderRadius: 20, borderWidth: 1.5, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  tinyLabel: { fontSize: 9, fontFamily: 'SpaceGrotesk_700Bold', color: '#666', marginBottom: 2 },
  input: { height: 140, borderRadius: 20, padding: 16, fontSize: 16, fontFamily: 'SpaceGrotesk_500Medium', borderWidth: 1.5, textAlignVertical: 'top', marginBottom: 20 },
  mainBtn: { padding: 22, borderRadius: 24, alignItems: 'center' },
  mainBtnText: { color: '#FFF', fontSize: 16, fontFamily: 'SpaceGrotesk_700Bold' },
  sttBox: { alignItems: 'center' },
  micBox: { padding: 30, borderRadius: 32, borderWidth: 1, alignItems: 'center', width: '100%', marginBottom: 24 },
  sttTitle: { fontSize: 18, fontFamily: 'SpaceGrotesk_700Bold' },
  modal: { flex: 1, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontFamily: 'SpaceGrotesk_700Bold' },
  doneBtn: { backgroundColor: '#000', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  filterRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  filterChip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 12 },
  voiceItem: { paddingVertical: 18, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vName: { fontSize: 15, fontFamily: 'SpaceGrotesk_700Bold' },
  vLang: { fontSize: 11, fontFamily: 'SpaceGrotesk_500Medium', marginTop: 2 },
  mainMicBtn: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  dictateBtn: { width: '100%', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  dictateText: { color: '#FFF', fontFamily: 'SpaceGrotesk_700Bold', fontSize: 14 }
});
