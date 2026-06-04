import { useState } from 'react';
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

  const handleSignUp = () => {
    if (!username.trim()) {
      Alert.alert('Please enter a GitHub username.');
      return;
    }
    console.log('Signed up with username:', username);
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
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
});