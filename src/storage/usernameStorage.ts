import AsyncStorage from '@react-native-async-storage/async-storage';

const USERNAME_KEY = '@DevFinder:username';

export async function saveUsername(username: string): Promise<void> {
  await AsyncStorage.setItem(USERNAME_KEY, username);
}

export async function getUsername(): Promise<string | null> {
  return AsyncStorage.getItem(USERNAME_KEY);
}

export async function clearUsername(): Promise<void> {
  await AsyncStorage.removeItem(USERNAME_KEY);
}