import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import type { RootStackParamList } from '../../App';
import { registerUser } from '../services/api';
import { saveUsername } from '../storage/usernameStorage';
import { colors } from '../theme/colors';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignUp = async () => {
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      Alert.alert('Please enter a GitHub username.');
      return;
    }

    setIsLoading(true);

    try {
      const githubResponse = await fetch(
        `https://api.github.com/users/${trimmedUsername}`,
      );

      if (githubResponse.status === 404) {
        Alert.alert('There is no such username on GitHub.');
        return;
      }

      if (!githubResponse.ok) {
        Alert.alert('Could not verify the username. Please try again.');
        return;
      }

      const githubProfile = await githubResponse.json();

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location required',
          'DevFinder needs your location to place you on the map.',
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({});

      await registerUser({
        username: trimmedUsername,
        name: githubProfile.name || trimmedUsername,
        bio: githubProfile.bio || '',
        avatarUrl: githubProfile.avatar_url,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });

      await saveUsername(trimmedUsername);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Map' }],
      });
    } catch (error) {
      Alert.alert(
        'Sign-up failed',
        'Could not complete sign-up. Please check your connection and try again.',
      );
      console.warn('Sign-up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.3349,
          longitude: -122.009,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      />

      <KeyboardAvoidingView
        style={styles.bottomWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.input}
            placeholder="Insert your GitHub username"
            placeholderTextColor={colors.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomContainer: {
    padding: 16,
    gap: 12,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});