import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SearchResult = ({ user }) => {

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{user.login}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    backgroundColor: 'black', // Siyah arka plan
    borderRadius: 10, // Oval şeklinde yapmak için
    overflow: 'hidden', // Oval şekli sağlamak için
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // Kullanıcı adının rengi
  },
});

export default SearchResult;
