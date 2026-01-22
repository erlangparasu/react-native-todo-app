/* eslint-disable react-native/no-inline-styles */
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../../App";
import { AddTodoUsecase } from "../../domain/usecases/AddTodoUsecase";
import { TodoRepositoryImpl } from "../../data/repositories/TodoRepositoryImpl";
import { TodoLocalDatasource } from "../../data/data-sources/TodoLocalDatasource";
import { DeleteTodoUsecase } from "../../domain/usecases/DeleteTodoUsecase";
import { DoneTodoUsecase } from "../../domain/usecases/DoneTodoUsecase";
import { GetTodoListUsecase } from "../../domain/usecases/GetTodoListUsecase";
import { TodoDTO } from "../../domain/dtos/TodoDTO";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const { user: sessionUser } = route.params;

  const addTodoUsecase = useRef<AddTodoUsecase>(
    new AddTodoUsecase(
      new TodoRepositoryImpl(
        new TodoLocalDatasource(),
      ),
    ),
  );

  const deleteTodoUsecase = useRef<DeleteTodoUsecase>(
    new DeleteTodoUsecase(
      new TodoRepositoryImpl(
        new TodoLocalDatasource(),
      ),
    ),
  );

  const doneTodoUsecase = useRef<DoneTodoUsecase>(
    new DoneTodoUsecase(
      new TodoRepositoryImpl(
        new TodoLocalDatasource(),
      ),
    ),
  );

  const getTodoListUsecase = useRef<GetTodoListUsecase>(
    new GetTodoListUsecase(
      new TodoRepositoryImpl(
        new TodoLocalDatasource(),
      ),
    ),
  );

  const [todoRecords, setTodoRecords] = useState<TodoDTO[]>([]);

  const performReload = useCallback(() => {
    setTodoRecords([]);
    getTodoListUsecase.current.execute({
      userId: sessionUser.id,
    }).then((data) => {
      console.log("ok:", { data });
      setTodoRecords(data);
    }).catch((error) => {
      console.log("catch:", { error });
      setTodoRecords([]);
    });
  }, [sessionUser]);

  useEffect(() => {
    performReload();
  }, [performReload, sessionUser]);

  const renderItem = ({ item }: { item: TodoDTO }) => (
    <TodoOneCard
      id={item.id}
      status={(() => {
        if (item.status === "open") {
          return "open";
        }
        if (item.status === "done") {
          return "done";
        }
        if (item.status === "deleted") {
          return "overdue";
        }
        return "open";
      })()}
      title={item.content}
      dueDate={item.dueDate}
      onDeletePress={(_) => {
        deleteTodoUsecase.current.execute({
          forceDelete: true,
          todoId: item.id,
          userId: sessionUser.id,
        }).then((data) => {
          console.log("ok:", { data });
          performReload();
        }).catch((error) => {
          console.log("catch:", { error });
        });
      }}
      onDonePress={(_) => {
        doneTodoUsecase.current.execute({
          userId: sessionUser.id,
          todoId: item.id,
        }).then((data) => {
          console.log("ok:", { data });
          performReload();
        }).catch((error) => {
          console.log("catch:", { error });
        });
      }}
    />
  );

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
                {sessionUser.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "rgb(55, 57, 64)",
              borderWidth: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              flex: 1,
            }}
          >
            <FlatList
              data={todoRecords}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text>No Item found.</Text>}
              renderItem={renderItem}
              // contentContainerStyle={}
            />
          </View>

          {/* Add Button */}
          <View
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
            }}
          >
            <AddButton
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>

          {/* Add Modal */}
          <AddTodoModal
            visible={modalVisible}
            onCancelPress={() => {
              setModalVisible(false);
            }}
            onSavePress={(params) => {
              console.log({ params });
              setModalVisible(false);

              addTodoUsecase.current.execute({
                content: params.title,
                dueDate: params.dueData,
                userId: sessionUser.id,
              }).then((data) => {
                console.log("ok:", { data });
                performReload();
              }).catch((error) => {
                console.log("catch:", { error });
              });
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const TodoOneCard = (props: {
  id: number;
  status: "open" | "done" | "overdue";
  title: string;
  dueDate: string;
  onDeletePress: (id: number) => void;
  onDonePress: (id: number) => void;
}) => {
  return (
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
          {(() => {
            if (props.status === "open") {
              return <OpenBadge />;
            }
            if (props.status === "done") {
              return <DoneBadge />;
            }
            if (props.status === "overdue") {
              return <OverdueBadge />;
            }
            return <></>;
          })()}
        </View>

        <DeleteButton
          onPress={() => {
            props.onDeletePress(props.id);
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
        {props.title}
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
            {props.dueDate}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
          }}
        >
          <DoneButton
            onPress={() => {
              props.onDonePress(props.id);
            }}
          />
        </View>
      </View>
    </View>
  );
};

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

export function AddButton(props: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        flex: 0,
      }}
      onPress={props.onPress}
    >
      <View
        style={{
          backgroundColor: "rgb(57,195,108)",
          borderWidth: 0,
          borderRadius: 100,
          padding: 8,
          width: "auto",
        }}
      >
        <MaterialIcons
          name="add"
          color="#ffffff"
          size={16 * 3}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    padding: 32,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 0,
    borderRadius: 8,
  },
  textInput: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export function AddTodoModal(props: {
  visible: boolean;
  onSavePress: (params: {
    title: string;
    dueData: string;
  }) => void;
  onCancelPress: () => void;
}) {
  return (
    <Modal
      visible={props.visible}
      backdropColor={"#ffffff00"}
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              flex: 1,
              maxWidth: "80%",
              maxHeight: "70%",
              backgroundColor: "rgb(55,57,64)",
              borderWidth: 0,
              borderRadius: 8,
            },
          ]}
        >
          {/* Header */}
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "flex-start",
              marginBottom: 16 + 16,
            }}
          >
            {"New TODO"}
          </Text>

          {/* Title */}
          <View
            style={[
              {
                flexDirection: "row",
              },
            ]}
          >
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: "rgb(55,57,64)",
                  borderWidth: 0,
                  borderRadius: 8,
                },
              ]}
            >
              <Text
                style={styles.labelName}
              >
                {"Title"}
              </Text>
              <View
                style={styles.textInputWrapper}
              >
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>

          <View
            style={[
              {
                height: 16 + 8,
              },
            ]}
          />

          {/* Due Date */}
          <View
            style={[
              {
                flexDirection: "row",
              },
            ]}
          >
            <View
              style={[
                {
                  flex: 1,
                  backgroundColor: "rgb(55,57,64)",
                  borderWidth: 0,
                  borderRadius: 8,
                },
              ]}
            >
              <Text
                style={styles.labelName}
              >
                {"Due Date"}
              </Text>
              <View
                style={styles.textInputWrapper}
              >
                <TextInput
                  style={styles.textInput}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              height: 8,
              flexDirection: "row",
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          />

          <View
            style={{
              height: 8,
              flexDirection: "row",
            }}
          />

          {/* Save */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <SaveButton
              onPress={() => {
                props.onSavePress({
                  title: "DummyTitle",
                  dueData: "dummy-due",
                });
              }}
            />
          </View>

          <View
            style={{
              height: 8 + 4,
              flexDirection: "row",
            }}
          />

          {/* Cancel */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <CancelButton
              onPress={() => {
                props.onCancelPress();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function SaveButton(props: {
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: "bold",
            backgroundColor: "rgb(101, 74, 251)",
            borderWidth: 0,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
        >
          {"SAVE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function CancelButton(props: {
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: "bold",
            borderWidth: 0,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
          }}
        >
          {"CANCEL"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
