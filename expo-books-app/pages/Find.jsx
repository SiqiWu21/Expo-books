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
  Searchbar,
} from "react-native-paper";
import COLORS from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Find = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("Read");
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          padding: 20,
        }}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 5].map((item, index) => {
          return (
            <TouchableOpacity key={index}>
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  marginHorizontal: 5,
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
                    fontSize: fontSize * 1.2,
                    fontWeight: "bold",
                    marginVertical: 5,
                  }}
                >
                  《Heelodsds》
                </Text>
                <Text
                  style={{
                    fontSize,
                    color: "#666",
                    lineHeight: 2 * fontSize,
                  }}
                >
                  ahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjsahdsjhdsjshjs4466
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: "#eee",
                }}
              ></View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
    </View>
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

export default Find;
