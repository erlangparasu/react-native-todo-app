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
                            backgroundColor: "rgb(55, 57, 64)",
                            borderWidth: 0,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "rgb(63,68,76)",
                                flexDirection: "row",
                                padding: 16 + 4,
                                margin: 16,
                                borderWidth: 0,
                                borderRadius: 12,
                            }}
                        >
                            <OpenBadge />
                            <DoneBadge />
                            <OverdueBadge />
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
            }}
        >
            {"OVERDUE"}
        </Text>
    );
}
