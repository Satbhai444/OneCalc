import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

interface ToolShellProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
}

export default function ToolShell({ title, children, icon }: ToolShellProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors: Colors } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={[styles.backBtn, { borderColor: Colors.border }]} onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: Colors.text }]}>{title}</Text>
        </View>
        <TouchableOpacity style={[styles.backBtn, { borderColor: Colors.border }]} onPress={() => {}}>
           <MaterialCommunityIcons name="star-outline" size={24} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 10,
  },
  backBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  titleContainer: { flex: 1, alignItems: 'center' },
  title: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 18,
    letterSpacing: -0.5,
  },
});
