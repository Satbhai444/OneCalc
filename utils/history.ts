import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  result: string;
}

export const saveHistory = async (toolId: string, input: string, result: string) => {
  try {
    const key = `@history_${toolId}`;
    const existing = await AsyncStorage.getItem(key);
    let items: HistoryItem[] = existing ? JSON.parse(existing) : [];
    
    items.unshift({
      id: Date.now().toString(),
      timestamp: Date.now(),
      input,
      result
    });
    
    if (items.length > 10) {
      items = items.slice(0, 10);
    }
    
    await AsyncStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to save history", e);
  }
};

export const getHistory = async (toolId: string): Promise<HistoryItem[]> => {
  try {
    const key = `@history_${toolId}`;
    const existing = await AsyncStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
};

export const clearHistory = async (toolId: string) => {
  try {
    const key = `@history_${toolId}`;
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};
