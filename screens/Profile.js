import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import axios from 'axios';

import images from '../assets/languageImages/images';

let langImgSrc = null

const Profile = ({ route }) => {
    const [profile, setProfile] = useState({});
    const [repos, setRepos] = useState([]);
    const name = route.params.name;

    useEffect(() => {
        axios.get(`https://api.github.com/users/${name}`)
            .then((res) => setProfile(res.data))
            .catch((error) => console.error('Profil getirilirken hata oluştu:', error));
        axios.get(`https://api.github.com/users/${name}/repos`)
            .then((res) => setRepos(res.data))
            .catch((error) => console.error('Repolar getirilirken hata oluştu:', error));
    }, [name]);

    const renderRepoItem = ({ item }) => {
        return (
            <View style={styles.repoContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={renderLanguageImage(item)} style={styles.languageIcon} />
                    <Text style={styles.repoName}>{item.name}</Text>
                </View>
                <Text style={styles.repoDescription}>{item.description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/star.png')} style={styles.starIcon} />
                <Text style={styles.repoStars}>{item.stargazers_count}</Text>
            </View>
        </View>
        );
    };

    const languageImages = {
        Python: require('../assets/languageImages/Python.png'),
        JavaScript: require('../assets/languageImages/Javascript.png'),
        Vue: require('../assets/languageImages/Vue.png'),
        Html: require('../assets/languageImages/Html.png'),
        Css: require('../assets/languageImages/Css.png'),
        default: require('../assets/github.png')
    };


    const renderLanguageImage = (item) => {
        const languages = ["Python", "JavaScript", "Vue", "Html", "Css"];
        switch (item.language) {
            case 'Python':
                langImgSrc = images.python.uri
                break
            case 'JavaScript':
                langImgSrc = images.javascript.uri
                break;
            case 'Vue':
                langImgSrc = images.vue.uri
                break;
            case 'HTML':
                langImgSrc = images.html.uri
                break;
            case 'CSS':
                langImgSrc = images.css.uri
                break;
            default:
                langImgSrc = require("../assets/github.png")
                break;
        }
        return langImgSrc
    };

    return (
        <View style={styles.container}>
            <View style={styles.blackBackground}>
                <Image source={require('../assets/github.png')} style={styles.githubLogo} />
            </View>
            <View style={styles.grayBackground}>
                <Text style={styles.repositoriesText}>Repositories</Text>
                <View style={styles.userInfoContainer}>
                    <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>@{profile.login}</Text>
                        <Text style={styles.fullName}>{profile.name}</Text>
                        <View style={styles.statsContainer}>
                            <Text style={styles.followersText}>Followers: {profile.followers}</Text>
                            <Text style={styles.followingText}>Following: {profile.following}</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={repos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRepoItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blackBackground: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
    },
    grayBackground: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        paddingTop: 20,
    },
    githubLogo: {
        width: '15%',
        height: '23%',
        bottom: '25%',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        zIndex: 1,
        bottom: 250,
    },
    userInfoContainer: {
        alignItems: 'center',
    },
    userInfo: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        marginTop: -280,
        width: 300,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fullName: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: '6%',
        marginLeft: '25%',
        fontSize: 20,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white',
        justifyContent: 'center',
        left: '145%',
        top: '15%',
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: '20%',
        right: '35%',
        justifyContent: 'space-between', 
        width: '60%', 
    },
    followersText: {
        color: 'white',
        fontWeight: 'bold',
    },
    followingText: {
        color: 'white',
        fontWeight: 'bold',
    },
    repositoriesText: {
        fontFamily: 'Inter',
        color: '#1D1D1D',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
        marginTop: '20%',
        zIndex: 2,
        marginBottom: 5,
    },
    repoContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'black',
        borderRadius: 20,
        marginBottom: 5,
        paddingVertical: 10, 
        paddingHorizontal: 20,  
    },
    repoName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginLeft: 5,
    },
    repoDescription: {
        fontStyle: 'italic',
        marginBottom: 5,
        color: 'white',
    },
    repoStars: {
        fontWeight: 'bold',
        color: 'white',

    },
    languageIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 5,
    },
    starIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});

export default Profile;
