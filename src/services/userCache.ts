import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/user';

 //Local cache for the community user list.

const CACHE_KEY = '@DevFinder:userCache';

export async function saveUsersToCache(users: User[]): Promise<void> {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(users));
}

export async function loadUsersFromCache(): Promise<User[] | null> {
  const raw = await AsyncStorage.getItem(CACHE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as User[];
  } catch {
    
    return null;
  }
}

export async function clearUsersCache(): Promise<void> {
  await AsyncStorage.removeItem(CACHE_KEY);
}