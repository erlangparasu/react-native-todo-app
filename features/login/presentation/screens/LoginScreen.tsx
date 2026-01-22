import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>
              {"Login Screen"}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
