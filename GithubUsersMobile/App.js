import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    prepareApp();
  }, []);

  const prepareApp = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAppIsReady(true);
    } catch (error) {
      console.error('Uygulama hazırlanırken bir hata oluştu:', error);
    }
  };
let timeout = null
  const searchUser = async (text) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    try {
      timeout = setTimeout(async () => {
        const response = await axios.get(`https://api.github.com/search/users?q=${text}`);
      console.log('API Cevabı:', response.data); 
      setSearchResults(response.data.items);
      }, 1000);
      
    } catch (error) {
      console.error('Kullanıcı arama hatası:', error);
    }
  };
  

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <View style={[styles.grayBackground, { flex: 7 }]}>
          <Text>Uygulama Yükleniyor...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.blackBackground, { flex: 3 }]}>
        <Image source={require('./assets/github.png')} style={styles.githubLogo} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search any user..."
            placeholderTextColor="gray"
            onChangeText={searchUser}
          />
          <TouchableOpacity style={styles.searchIcon} >
            <Image source={require('./assets/search.png')} style={{ width: 20, height: 20, right: 45, }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.grayBackground, { flex: 7 }]}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem}>
              <Text>{item.login}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackBackground: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayBackground: {
    backgroundColor: '#D9D9D9',
  },
  githubLogo: {
    width: '15%',
    height: '23%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10, 
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  searchIcon: {
    width: 10,
    height: 10,
    marginRight: 5, 
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});
