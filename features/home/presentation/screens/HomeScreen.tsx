/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgb(55,57,64)",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              //
            }}
          >
            <View
              style={{
                marginTop: 32,
                marginBottom: 16,
                marginLeft: 32,
                marginRight: 32,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 4 * 9,
                  fontWeight: "bold",
                }}
              >
                {"Hi, "}
                {"ChangeMe"}
              </Text>
            </View>
          </View>
          <ScrollView
            style={{
              backgroundColor: "red",
              borderWidth: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View
              style={{
                marginTop: 32,
                marginLeft: 32,
                marginRight: 32,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 4 * 9,
                  fontWeight: "bold",
                }}
              >
                {"Hi, "}
                {"fff"}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
