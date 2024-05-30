import { StyleSheet, View, Platform, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import * as ImagePicker from "expo-image-picker";
import request, { baseURL } from "../utils/request";
import { Button, TextInput, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import COLORS from "../utils/Colors";

export default function AddReview() {
  const [bookName, setBookName] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.inputItem}
          multiline={true}
          mode="flat"
          value={desc}
          placeholder="Write some current inspirations~"
          onChangeText={(text) => setDesc(text)}
        />

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
            
            }}
          >
            Cancel
          </Button>

          <Button mode="contained" onPress={() => console.log("Pressed")}>
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  card: {
    width: "100%",
    flex: 1,
  },
  inputItem: {
    flex: 1,
  },
});
