import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
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
import { colors } from '../theme/colors';

 //Welcome screen shown to first-time users.
export default function SignUpScreen() {
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSignUp = async () => {
    if (!username.trim()) {
      Alert.alert('Please enter a GitHub username.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username.trim()}`,
      );

      if (response.status === 404) {
        Alert.alert('There is no such username on GitHub.');
        return;
      }

      if (!response.ok) {
        Alert.alert('Could not verify the username. Please try again.');
        return;
      }

      // Username is valid — proceed
      console.log('Valid GitHub username:', username);
       navigation.navigate('Map');
    } catch (error) {
      Alert.alert('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      { /* Map background */ }
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
          />
          <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={isLoading}
          >
  <Text style={styles.buttonText}>
    {isLoading ? 'Checking...' : 'Sign Up'}
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