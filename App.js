import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ animationEnabled: false, headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        animationEnabled: false,
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
};