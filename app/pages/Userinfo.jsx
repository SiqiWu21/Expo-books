import { StyleSheet, View, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import * as ImagePicker from "expo-image-picker";
import request, { baseURL } from "../utils/request";
import { Button, TextInput, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";

export default function Userinfo() {
  const [nickname, setNickname] = useState("");
  const [headpic, setHeadpic] = useState("");
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });

  useEffect(() => {
    if (userinfo) {
      setNickname(userinfo.nickname);
      setHeadpic(userinfo.headpic);
    }
  }, [userinfo]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
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
      setHeadpic(json.data.imgUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={{
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Avatar.Image
            size={100}
            source={{
              uri: baseURL + headpic,
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <Button icon="camera" mode="contained" onPress={pickImage}>
            Change Avatar
          </Button>
        </View>
        <TextInput
          style={styles.inputItem}
          label="Nickname"
          value={nickname}
          onChangeText={(text) => setNickname(text)}
        />

        <Button
          mode="contained"
          onPress={async () => {
            let res = await request({
              url: `/user/${userinfo?.id}`,
              method: "put",
              data: {
                nickname,
                headpic,
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
          Save
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
