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

export default function AddBook() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });

  useEffect(() => {}, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 23],
      quality: 1,
      base64: false,
    });
    let uri = result.assets[0].uri;
    if (!result.canceled) {
      const formData = new FormData();
      formData.append("file", {
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        type: "image/jpeg",
        name: "image.jpg",
      });
      const response = await fetch(baseURL + "/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const json = await response.json();
      setCover(json.data.imgUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {/* <View
            style={{
              width: 125,
              height: 180,
              backgroundColor: COLORS.primary,
            }}
          ></View> */}
          <Image
            style={{
              width: 125,
              height: 180,
            }}
            source={require("../assets/cover.jpg")}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Button icon="camera" mode="contained" onPress={pickImage}>
            Upload book cover
          </Button>
        </View>
        <TextInput
          style={styles.inputItem}
          label="Book Name"
          value={bookName}
          onChangeText={(text) => setBookName(text)}
        />

        <TextInput
          style={styles.inputItem}
          label="author"
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />

        <TextInput
          style={styles.inputItem}
          label="Book Description"
          multiline={true}
          numberOfLines={4}
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />

        <Button
          mode="contained"
          onPress={async () => {
            let res = await request({
              url: `/user/${userinfo?.id}`,
              method: "put",
              data: {
                bookName,
                cover,
              },
            });
            dispatch(updateUserinfo(res.data));
            await AsyncStorage.setItem("userinfo", JSON.stringify(res.data));
            Toast.show({
              type: "success",
              text1: "Success!",
              text2: "Save successful!",
            });
          }}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    width: "80%",
  },
  tit: {
    color: "white",
    textAlign: "center",
    marginBottom: 100,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputItem: {
    marginBottom: 20,
  },
  link: {
    color: "#fff",
    textAlign: "center",
    paddingTop: 30,
  },
});
