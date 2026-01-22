import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import LoginScreen from "./features/login/presentation/screens/LoginScreen";
import HomeScreen from "./features/home/presentation/screens/HomeScreen";
import { UserDTO } from "./features/login/domain/dtos/UserDTO";

// NOTE: Define the types for routes
export type RootStackParamList = {
  Login: undefined;
  Home: {
    user: UserDTO;
  };
};

export type MyNavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
