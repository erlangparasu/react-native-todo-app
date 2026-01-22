import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./features/login/presentation/screens/LoginScreen";
import HomeScreen from "./features/home/presentation/screens/HomeScreen";

// NOTE: Define the types for routes
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
