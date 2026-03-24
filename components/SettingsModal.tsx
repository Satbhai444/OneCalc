import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Switch, ScrollView, Alert, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { triggerTestNotification } from '../utils/notifications';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onOpenRating?: () => void;
}

export default function SettingsModal({ visible, onClose, onOpenRating }: SettingsModalProps) {
  const router = useRouter();
  const { themeMode, setThemeMode, isHapticEnabled, toggleHaptic, isSoundEnabled, toggleSound, isNotificationsEnabled, toggleNotifications, triggerHaptic } = useApp();

  const handleNavigation = (path: string) => {
    onClose();
    // Wrap navigation in timeout to let modal close first for smooth UX
    setTimeout(() => {
      router.push(path as any);
    }, 200);
  };

  const handleToggleTheme = () => {
    triggerHaptic();
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={24} color="#0A1F44" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Appearance Section */}
            <Text style={styles.sectionHeader}>APPEARANCE</Text>
            <View style={styles.sectionCard}>
              {['light', 'dark', 'system'].map((mode) => (
                <TouchableOpacity 
                  key={mode} 
                  style={styles.row} 
                  onPress={() => { triggerHaptic(); setThemeMode(mode as any); }}
                >
                  <View style={styles.rowLeft}>
                    <MaterialIcons 
                      name={mode === 'light' ? 'wb-sunny' : mode === 'dark' ? 'brightness-2' : 'brightness-auto'} 
                      size={22} 
                      color="#4A90D9" 
                    />
                    <Text style={styles.rowText}>
                      {mode === 'light' ? 'Light Mode ☀️' : mode === 'dark' ? 'Dark Mode 🌙' : 'System Default 📱'}
                    </Text>
                  </View>
                  <View style={[styles.radio, themeMode === mode && styles.radioSelected]} />
                </TouchableOpacity>
              ))}
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <MaterialIcons name="vibration" size={22} color="#4A90D9" />
                  <Text style={styles.rowText}>Haptic Feedback</Text>
                </View>
                <Switch 
                  value={isHapticEnabled} 
                  onValueChange={() => { triggerHaptic(); toggleHaptic(); }}
                  trackColor={{ false: '#D8E4F0', true: '#4A90D9' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <MaterialIcons name="audiotrack" size={22} color="#4A90D9" />
                  <Text style={styles.rowText}>Sound Feedback</Text>
                </View>
                <Switch 
                  value={isSoundEnabled} 
                  onValueChange={() => { triggerHaptic(); toggleSound(); }}
                  trackColor={{ false: '#D8E4F0', true: '#4A90D9' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <View style={[styles.row, { borderBottomWidth: 0 }]}>
                <View style={styles.rowLeft}>
                  <MaterialIcons name="notifications-active" size={22} color="#4A90D9" />
                  <Text style={styles.rowText}>Notifications</Text>
                </View>
                <Switch 
                  value={isNotificationsEnabled} 
                  onValueChange={toggleNotifications}
                  trackColor={{ false: '#D8E4F0', true: '#4A90D9' }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>

            {/* Legal Section */}
            <Text style={styles.sectionHeader}>LEGAL</Text>
            <View style={styles.sectionCard}>
              <TouchableOpacity style={styles.row} onPress={() => handleNavigation('/settings/privacy')}>
                <View style={styles.rowLeft}>
                  <MaterialIcons name="security" size={22} color="#0A1F44" />
                  <Text style={styles.rowText}>Privacy Policy</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]} onPress={() => handleNavigation('/settings/terms')}>
                <View style={styles.rowLeft}>
                  <MaterialIcons name="gavel" size={22} color="#0A1F44" />
                  <Text style={styles.rowText}>Terms of Use</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
              </TouchableOpacity>
            </View>

            {/* About Section */}
            <Text style={styles.sectionHeader}>ABOUT</Text>
            <View style={styles.sectionCard}>
              <View style={styles.row}>
                <Text style={styles.label}>App Name</Text>
                <Text style={styles.value}>OneCalc</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Version</Text>
                <Text style={styles.value}>1.0.0</Text>
              </View>
              <TouchableOpacity style={styles.row} onPress={() => handleNavigation('/about')}>
                <Text style={styles.label}>Developer</Text>
                <View style={[styles.rowLeft, { gap: 4 }]}>
                  <Text style={[styles.value, { color: '#4A90D9' }]}>Darshan Satbhai</Text>
                  <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => handleNavigation('/reviews')}>
                <View style={styles.rowLeft}>
                  <Text style={{fontSize: 20}}>⭐️</Text>
                  <Text style={styles.rowText}>Community Reviews</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                   <Text style={[styles.label, {color: '#FFD60A', fontFamily: 'DMSans_700Bold'}]}>4.8</Text>
                   <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => handleNavigation('/credits')}>
                <View style={styles.rowLeft}>
                  <Text style={{fontSize: 20}}>🏆</Text>
                  <Text style={styles.rowText}>Credits & Tech Stack</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]} onPress={onOpenRating}>
                <View style={styles.rowLeft}>
                  <Text style={{fontSize: 20}}>✍️</Text>
                  <Text style={[styles.rowText, { color: '#4A90D9' }]}>Rate OneCalc</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#7A9BB5" />
              </TouchableOpacity>
            </View>

            {/* Exit App Button */}
            <View style={styles.sectionCard}>
              <TouchableOpacity 
                style={[styles.row, { borderBottomWidth: 0 }]} 
                onPress={() => {
                  triggerHaptic();
                  Alert.alert(
                    'Exit OneCalc?',
                    'Are you sure you want to exit the app?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() }
                    ]
                  );
                }}
              >
                <View style={styles.rowLeft}>
                  <Text style={{fontSize: 20}}>🚪</Text>
                  <Text style={[styles.rowText, { color: '#FF3B30' }]}>Exit App</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>Made with ❤️ in India</Text>
          </ScrollView>

        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#F8FAFC', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    height: '60%', shadowColor: '#000', elevation: 20
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#D8E4F0', backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28, borderTopRightRadius: 28
  },
  title: { fontFamily: 'DMSans_700Bold', fontSize: 20, color: '#0A1F44' },
  closeBtn: { padding: 4 },
  scrollContent: { padding: 20 },
  sectionHeader: { fontFamily: 'DMSans_700Bold', fontSize: 13, color: '#7A9BB5', letterSpacing: 0.5, marginBottom: 10, marginTop: 10 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, marginBottom: 20, borderWidth: 1, borderColor: '#D8E4F0' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowText: { fontFamily: 'DMSans_500Medium', fontSize: 15, color: '#0A1F44' },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D8E4F0',
  },
  radioSelected: {
    borderColor: '#4A90D9',
    backgroundColor: '#4A90D9',
  },
  label: { fontFamily: 'DMSans_400Regular', fontSize: 15, color: '#7A9BB5' },
  value: { fontFamily: 'DMSans_500Medium', fontSize: 15, color: '#0A1F44' },
  footerText: { textAlign: 'center', fontFamily: 'DMSans_500Medium', fontSize: 13, color: '#7A9BB5', marginTop: 10, marginBottom: 30 }
});
