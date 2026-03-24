import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { getHistory, clearHistory, HistoryItem } from '../utils/history';

interface HistoryModalProps {
  visible: boolean;
  toolId: string;
  onClose: () => void;
}

export default function HistoryModal({ visible, toolId, onClose }: HistoryModalProps) {
  const { colors: Colors } = useApp();
  const styles = getStyles(Colors);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (visible) {
      loadHistory();
    }
  }, [visible]);

  const loadHistory = async () => {
    const data = await getHistory(toolId);
    setHistory(data);
  };

  const handleClear = async () => {
    await clearHistory(toolId);
    setHistory([]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>History</Text>
            <View style={styles.rightActions}>
              {history.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.iconBtn}>
                  <MaterialIcons name="delete-outline" size={26} color="#FF1744" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
                <MaterialIcons name="close" size={26} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent calculations</Text>
            </View>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
              renderItem={({ item }) => (
                <View style={styles.historyCard}>
                  <Text style={styles.inputText}>{item.input}</Text>
                  <Text style={styles.resultText}>= {item.result}</Text>
                </View>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const getStyles = (Colors: any) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 22,
    color: Colors.primary,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: Colors.textMuted,
  },
  historyCard: {
    backgroundColor: Colors.cardBg,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  resultText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: Colors.primary,
  },
});
