import MaterialIcons from "@react-native-vector-icons/material-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.wrapper}
      >
        <View
          style={styles.container}
        >
          <View
            style={styles.box}
          >
            <Text
              style={styles.labelName}
            >
              {"Name"}
            </Text>

            <View
              style={styles.textInputWrapper}
            >
              <TextInput
                style={styles.textInput}
              />
            </View>

            <View
              style={styles.buttonContainer}
            >
              <NextButton
                onPress={() => {
                  //
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgb(55,	57,	64)",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  box: {
    flex: 1,
    maxWidth: 300,
    alignSelf: "center",
    // backgroundColor: "red",
  },
  labelName: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  textInputWrapper: {
    marginTop: 12,
    backgroundColor: "rgb(63,68,76)",
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 0,
    borderRadius: 8,
  },
  textInput: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  buttonWrapper: {
    marginTop: 12,
    backgroundColor: "rgb(57,195,108)",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderWidth: 0,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
    marginRight: 3,
  },
  buttonIcon: {
    alignSelf: "center",
  },
});

export function NextButton(props: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View
        style={styles.buttonWrapper}
      >
        <Text
          style={styles.buttonText}
        >
          {"Next"}
        </Text>
        <MaterialIcons
          name="chevron-right"
          color="#ffffff"
          size={24 + 8}
        />
      </View>
    </TouchableOpacity>
  );
}
