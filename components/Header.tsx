import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useState } from 'react';
import SettingsModal from './SettingsModal';

interface HeaderProps {
  title: string;
  accentColor: string;
  showBack?: boolean;
  onHistoryPress?: () => void;
}

export default function Header({ title, accentColor, showBack = true, onHistoryPress }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top, backgroundColor: accentColor, borderBottomColor: accentColor }]}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={28} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightActions}>
        {onHistoryPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onHistoryPress} activeOpacity={0.7}>
            <MaterialIcons name="history" size={26} color={Colors.white} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} onPress={() => setSettingsVisible(true)} activeOpacity={0.7}>
          <MaterialIcons name="settings" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 3,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backButtonPlaceholder: {
    width: 48,
    height: 48,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 48,
    height: 48,
  },
});
