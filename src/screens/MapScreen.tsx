import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../App';
import { fetchUsers } from '../services/api';
import {
  clearUsersCache,
  loadUsersFromCache,
  saveUsersToCache,
} from '../services/userCache';
import { clearUsername } from '../storage/usernameStorage';
import { colors } from '../theme/colors';
import type { User } from '../types/user';

// Main screen showing all developers in the community on a map.

export default function MapScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      // 1. Show cached users immediately (if any)
      const cached = await loadUsersFromCache();
      if (cached && isMounted) {
        setUsers(cached);
      }

      // 2. Fetch fresh users from the backend
      try {
        const fresh = await fetchUsers();
        if (isMounted) {
          setUsers(fresh);
          await saveUsersToCache(fresh);
        }
      } catch (error) {
        // If the fetch fails (offline, server down), the cached
        // data we already rendered remains visible.
        console.warn('Failed to fetch users:', error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await clearUsername();
    await clearUsersCache();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignUp' }],
    });
  };

  const handleUserPress = (username: string) => {
    navigation.navigate('Profile', { username });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.8,
          longitudeDelta: 0.8,
        }}
      >
        {users.map((user) => (
          <Marker
            key={user.id}
            coordinate={user.location}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: user.avatarUrl }}
                style={styles.avatarImage}
              />
            </View>

            <Callout
              tooltip
              onPress={() => handleUserPress(user.username)}
            >
              <TouchableOpacity
                style={styles.callout}
                onPress={() => handleUserPress(user.username)}
                activeOpacity={0.7}
              >
                <Text style={styles.calloutName}>{user.name}</Text>
                <Text style={styles.calloutBio}>{user.bio}</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <SafeAreaView style={styles.topBar} edges={['top']}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: '600',
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.cardBackground,
    overflow: 'hidden',
    backgroundColor: colors.cardBackground,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  callout: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 160,
    borderWidth: 1,
    borderColor: colors.border,
  },
  calloutName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  calloutBio: {
    fontSize: 12,
    color: colors.textMuted,
  },
});