import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import SearchResult from './SearchResult';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
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

  let timeout = null;
  const searchUser = async (text) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    try {
      timeout = setTimeout(async () => {
        const response = await axios.get(`https://api.github.com/search/users?q=${text}`);
        console.log('API Cevabı:', response.data);
        setSearchResults(response.data.items);
        setTotalResults(response.data.total_count);
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
        <Text style={styles.totalResultsText}>
          <Text>Total </Text>
          <Text style={styles.redText}>{totalResults}</Text>
          <Text> results found.</Text>
        </Text>
        <FlatList
          key={totalResults}
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userItem}>
              <View style={[styles.userItem, { marginBottom: 10 }]}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarBackground}></View>
                  <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.username}>@{item.login}</Text>
                </View>
              </View>

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
    width: '0%',
    height: '0%',
    marginRight: 3,
    justifyContent: 'center',
  },
  userItem: {
    padding: 10,
    width: '33%',
    aspectRatio: 1,
    alignItems: 'center',
  },
  userContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
    overflow: 'visible',
  },
  avatarBackground: {
    position: 'absolute',
    backgroundColor: '#1D1D1D',
    width: '100%',
    height: '100%',
    borderRadius: 10,

  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: [{ translateX: -40 }],
    borderWidth: 5,
    borderColor: '#1D1D1D',
  },
  userInfo: {
    position: 'absolute',
    top: '550%',
    width: 100,
    flex: 1,
    textAlign: 'center',
  },

  username: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#ffff',
    fontSize: 10,
    width: 100,
    textAlign: 'center',
  },

  totalResultsText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  redText: {
    color: 'red',
  },
});
