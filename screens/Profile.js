import { useState } from 'react';
import { Text } from 'react-native';
import axios from "axios";

export default ({ route }) => {
    const [profile, setProfile] = useState({})
    const [repos, setRepos] = useState([])
    const name = route.params.name;

    axios.get(`https://api.github.com/users/${name}`).then((res) => setProfile(res.data))
    axios.get(`https://api.github.com/users/${name}/repos`).then((res) => setRepos(res.data));

    return (
        <Text>Hello, {JSON.stringify(repos)}</Text>
    );
};

// debounce