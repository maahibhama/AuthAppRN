import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';

export default function LoginScreen({ navigation }: any) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigation.replace('Home');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSignup = async () => {
    navigation.replace('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.inputFlex}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.toggle}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} variant="primary" style={styles.button} />
      <Button title="Go to Signup" onPress={handleSignup} variant="secondary" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 10, borderRadius: 6, marginBottom: 12 },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 12,
  },
  inputFlex: { flex: 1, padding: 10 },
  toggle: { color: 'blue', paddingHorizontal: 8 },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
  button: { marginTop: 8, marginBottom: 12 },
  link: { color: 'blue', textAlign: 'center', marginTop: 10 },
});
