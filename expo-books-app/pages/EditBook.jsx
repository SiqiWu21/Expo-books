import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateBookData } from "../redux/reducers/bookDataSlice";
import * as ImagePicker from "expo-image-picker";
import request, { baseURL } from "../utils/request";
import {
  Button,
  TextInput,
  Dialog,
  PaperProvider,
  RadioButton,
} from "react-native-paper";
import Toast from "react-native-toast-message";
import COLORS from "../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EditBook() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [visible, setVisible] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [typeId, setTypeId] = useState("");
  const [typeTitle, setTypeTitle] = useState("");
  const dispatch = useDispatch();
  const typeData = useSelector((state) => state.type.type);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 23],
      quality: 1,
      base64: false,
    });
    if (!result.canceled) {
      let uri = result.assets[0].uri;
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

  const getBookData = async () => {
    try {
      let res = await request({
        url: "/book",
        method: "get",
      });
      dispatch(updateBookData(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  const getDetail = async () => {
    try {
      let res = await request({
        url: `/book/${id}`,
        method: "get",
      });
      setBookName(res.data.bookName);
      setAuthor(res.data.author);
      setDesc(res.data.desc);
      setCover(res.data.cover);
      setTypeTitle(res.data?.type?.title);
      setTypeId(Number(res.data.typeId));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  useEffect(() => {
    getDetail();
  }, [])

  return (
    <PaperProvider>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              {!cover ? (
                <View
                  style={{
                    width: 125,
                    height: 180,
                    backgroundColor: COLORS.primary,
                  }}
                ></View>
              ) : (
                <Image
                  style={{ width: 125, height: 180 }}
                  source={{ uri: baseURL + cover }}
                />
              )}
            </View>
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <Button icon="camera" mode="contained" onPress={pickImage}>
                Upload book cover
              </Button>
            </View>

            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
            >
              <TextInput
                style={styles.inputItem}
                label="Book Type"
                value={typeTitle}
                editable={false}
                onChangeText={(text) => setBookName(text)}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.inputItem}
              label="Book Name"
              value={bookName}
              onChangeText={(text) => setBookName(text)}
            />

            <TextInput
              style={styles.inputItem}
              label="Author"
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
                if (!cover) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please upload book cover",
                  });
                  return;
                }
                if (!typeId) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please selec book type",
                  });
                  return;
                }
                if (!bookName) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please enter book name",
                  });
                  return;
                }
                if (!author) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please enter book author",
                  });
                  return;
                }
                if (!desc) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please enter book description",
                  });
                  return;
                }
                let res = await request({
                  url: `/book/${id}`,
                  method: "put",
                  data: {
                    bookName,
                    cover,
                    author,
                    desc,
                    typeId,
                  },
                });
                getBookData();
                navigation.goBack();
                Toast.show({
                  type: "success",
                  text1: "Success!",
                  text2: res.msg,
                });
              }}
            >
              Submit
            </Button>
          </View>
        </View>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>Select Book Type</Dialog.Title>
          <Dialog.Content>
            <ScrollView
              style={{
                height: 300,
              }}
            >
              <RadioButton.Group
                onValueChange={(value) => setTypeId(value)}
                value={typeId}
              >
                {typeData.map((item, index) => {
                  return (
                    <RadioButton.Item
                      key={index}
                      label={item.title}
                      value={item.id}
                    />
                  );
                })}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if(!typeId){
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please select book type",
                  });
                  return;
                }
                let item = typeData.find((item) => {
                  return item.id == typeId;
                });
                setTypeTitle(item.title);
                setVisible(false);
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  card: {
    width: "80%",
  },
  inputItem: {
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
