/* eslint-disable react-native/no-inline-styles */
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
              backgroundColor: "rgb(55, 57, 64)",
              borderWidth: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <View
              style={{
                backgroundColor: "rgb(63,68,76)",
                padding: 16 + 4,
                margin: 16,
                borderWidth: 0,
                borderRadius: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <OpenBadge />
                  <DoneBadge />
                  <OverdueBadge />
                </View>

                <DeleteButton
                  onPress={() => {
                    //
                  }}
                />
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                  marginTop: 12,
                }}
              >
                {"TitleHere"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      marginTop: 16,
                    }}
                  >
                    {"Due Date:"}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {"DateHere"}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "flex-end",
                  }}
                >
                  <DoneButton
                    onPress={() => {
                      //
                    }}
                  />
                </View>
              </View>
            </View>

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
                {"Erlang Parasu"}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

export function OpenBadge() {
  return (
    <Text
      style={{
        color: "#1a1a1a",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgb(196,196,196)",
        borderWidth: 0,
        borderRadius: 64,
        paddingVertical: 4,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
      }}
    >
      {"OPEN"}
    </Text>
  );
}

export function DoneBadge() {
  return (
    <Text
      style={{
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgb(57,195,108)",
        borderWidth: 0,
        borderRadius: 64,
        paddingVertical: 4,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
      }}
    >
      {"DONE"}
    </Text>
  );
}

export function OverdueBadge() {
  return (
    <Text
      style={{
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold",
        backgroundColor: "rgb(195,57,57)",
        borderWidth: 0,
        borderRadius: 64,
        paddingVertical: 4,
        paddingHorizontal: 16,
        alignSelf: "flex-start",
      }}
    >
      {"OVERDUE"}
    </Text>
  );
}

export function DeleteButton(props: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View
        style={{
          backgroundColor: "rgb(55,57,63)",
          borderWidth: 0,
          borderRadius: 6,
          padding: 8,
        }}
      >
        <MaterialIcons
          name="delete"
          color="#ffffff"
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
}

export function DoneButton(props: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 14,
          fontWeight: "bold",
          backgroundColor: "rgb(101, 74, 251)",
          borderWidth: 0,
          borderRadius: 8,
          paddingVertical: 12,
          paddingHorizontal: 24,
          alignSelf: "flex-start",
        }}
      >
        {"DONE"}
      </Text>
    </TouchableOpacity>
  );
}
