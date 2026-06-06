import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockUsers } from '../data/users';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

 //Main screen showing all developers in the community on a map.

export default function MapScreen() {
    const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleLogout = () => {
    // TODO: clear stored username and return to SignUpScreen
    console.log('Logout tapped');
  };

  const handleUserPress = (username: string) => {
    navigation.navigate('Profile', { username });
    console.log('User tapped:', username);
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
        {mockUsers.map((user) => (
          <Marker
            key={user.username}
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
              <View style={styles.callout}>
                <Text style={styles.calloutName}>{user.name}</Text>
                <Text style={styles.calloutBio}>{user.bio}</Text>
              </View>
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