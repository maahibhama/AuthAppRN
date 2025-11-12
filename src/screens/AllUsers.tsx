// TODO: Create a screen that displays all users in the database

import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

export default function AllUsers({ navigation }: any) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const users = await Promise.all(
        keys.map(async (key: string) => {
          const user = await AsyncStorage.getItem(key);
          const userData = user ? JSON.parse(user) : null;
          return userData;
        }),
      );

      console.log(users);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (email: string) => {
    console.log(email);
    await AsyncStorage.removeItem(email);
    const newUsers = users.filter(user => user.email !== email);
    setUsers(newUsers);
  };

  const renderUser = ({ item, index }: { item: any; index: number }) => {
    const backgroundColor = index % 2 === 0 ? '#F0F0F0' : 'lightgray';
    return (
      <View style={[styles.userContainer, { backgroundColor }]}>
        <View style={styles.userInfo}>
          <Text style={styles.usertitle}>
            <Text style={styles.subtitle}>Name: </Text>
            {item.name}
          </Text>
          <Text style={styles.subtitlebold}>
            <Text style={styles.subtitle}>Email: </Text>
            {item.email}
          </Text>
          <View style={styles.userTypeContainer}>
            <Text style={styles.subtitle}>Type:</Text>
            <Text
              style={[
                styles.userType,
                { backgroundColor: item.isAdmin ? 'yellow' : 'green' },
              ]}
            >
              {item.isAdmin ? 'Admin' : 'User'}
            </Text>
          </View>
        </View>
        {item.isAdmin ? null : (
          <Button
            title="Delete"
            onPress={() => handleDeleteUser(item.email)}
            variant="primary"
            style={styles.button}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
          variant="primary"
          style={styles.button}
        />
        <Text style={styles.title}>All Users</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderUser}
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 1,
    textAlign: 'center',
    marginRight: 100,
  },
  usertitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 8 },
  subtitlebold: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  userType: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  button: { marginTop: 8, width: 100, borderRadius: 10 },
  userInfo: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 20,
  },
  list: { flex: 1, width: '100%' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  userTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
});
