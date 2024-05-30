import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  ProgressBar,
  MD3Colors,
  Button,
  Chip,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  RadioButton,
} from "react-native-paper";
import COLORS from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BooksDetail = () => {
  const [status, setStatus] = useState("Read");
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 144,
                }}
                resizeMode="cover"
                source={require("../assets/cover.jpg")}
              />
              <View
                style={{
                  flex: 1,
                  borderColor: "#eee",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: fontSize,
                    }}
                  >
                    To Kill a Mockingbird Mockingbird
                  </Text>
                  <Text
                    style={{
                      color: "#666",
                      marginTop: 5,
                    }}
                  >
                    Harper Lee
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 15,
                      backgroundColor: "#eee",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize * 0.8,
                        color: "#666",
                      }}
                    >
                      Unread
                    </Text>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 15,
                      backgroundColor: COLORS.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize * 0.8,
                        color: "#fff",
                      }}
                    >
                      Read
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: "#eee",
              }}
            ></View>

            <View style={{
              backgroundColor: '#fff',
              padding: 20,
            }}>
              <Text style={{
                fontSize,
                color: '#666',
                lineHeight: 1.5 * fontSize
              }}>
                dsjkdsjdssddsss
              </Text>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: "#eee",
              }}
            ></View>

            <Text
              style={{
                fontSize: fontSize * 1.2,
                fontWeight: "bold",
                padding: 20,
              }}
            >
              Review
            </Text>

            <View
              style={{
                backgroundColor: "#eee",
                padding: 20,
                marginHorizontal: 20,
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                  }}
                  resizeMode="cover"
                  source={require("../assets/cover.jpg")}
                />
                <Text
                  style={{
                    fontSize: fontSize,
                    color: "#666",
                    marginHorizontal: 10,
                  }}
                >
                  tom
                </Text>
                <Text
                  style={{
                    fontSize: fontSize,
                    color: "#999",
                  }}
                >
                  3 days ago
                </Text>
              </View>
              <Text
                style={{
                  fontSize,
                  lineHeight: 2 * fontSize,
                }}
              >
                ahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjs4466
              </Text>
            </View>
          </ScrollView>
          <Dialog
            visible={visible}
            onDismiss={() => {
              setVisible(false);
            }}
          >
            <Dialog.Title>Mark Status</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                <RadioButton.Item label="Read" value="Read" />
                <RadioButton.Item label="Unread" value="Unread" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setVisible(false);
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopColor: "#ddd",
              borderTopWidth: 1,
              paddingVertical: 20,
            }}
          >
            <Button
              mode="contained-tonal"
              onPress={() => {
                setVisible(true);
              }}
            >
              Mark Status
            </Button>

            <Button mode="contained" onPress={() => console.log("Pressed")}>
              Write A Review
            </Button>
          </View>
        </View>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  headBox: {
    height: 250,
    position: "relative",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  floatingButton: {
    backgroundColor: "#9317ed",
    width: 50,
    height: 50,
    position: "absolute",
    right: 10,
    bottom: 30,
    borderRadius: 50,
    zIndex: 100,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // Android shadow
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BooksDetail;
