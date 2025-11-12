import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    await logout();
    navigation.replace('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name}</Text>
      <Text style={styles.subtitle}>{user?.email}</Text>
      <Text style={styles.subtitle}>
        {'Type: ' + (user?.isAdmin ? 'Admin' : 'User')}
      </Text>
      <Text style={styles.subtitle}>
        {user?.isAdmin ? 'You can manage users' : 'You can not manage users'}
      </Text>
      <View style={styles.buttonContainer}>
        {user?.isAdmin ? (
          <Button
            title="All Users"
            onPress={() => navigation.navigate('AllUsers')}
            variant="primary"
            style={styles.button}
          />
        ) : null}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 50, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  button: { marginTop: 8, borderRadius: 10 },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
