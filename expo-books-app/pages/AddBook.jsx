import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform
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
import { useNavigation } from "@react-navigation/native";

export default function AddBook() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [typeId, setTypeId] = useState("");
  const [typeTitle, setTypeTitle] = useState("");
  const dispatch = useDispatch();
  const typeData = useSelector((state) => state.type.type);

  // Function to pick an image from the device's library
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

  // Function to get the list of books and update the redux store
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

  return (
    <PaperProvider>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.coverContainer}>
              {!cover ? (
                <View style={styles.placeholder}></View>
              ) : (
                <Image style={styles.coverImage} source={{ uri: baseURL + cover }} />
              )}
            </View>
            <View style={styles.uploadButtonContainer}>
              <Button icon="camera" mode="contained" onPress={pickImage}>
                Upload book cover
              </Button>
            </View>

            <TouchableOpacity onPress={() => setVisible(true)}>
              <TextInput
                style={styles.inputItem}
                label="Book Type"
                value={typeTitle}
                editable={false}
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
                    text2: "Please select book type",
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
                  url: `/book`,
                  method: "post",
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

        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Select Book Type</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogContent}>
              <RadioButton.Group
                onValueChange={(value) => setTypeId(value)}
                value={typeId}
              >
                {typeData.map((item, index) => (
                  <RadioButton.Item key={index} label={item.title} value={item.id} />
                ))}
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
                let item = typeData.find((item) => item.id == typeId);
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

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    width: "80%",
  },
  coverContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  placeholder: {
    width: 125,
    height: 180,
    backgroundColor: COLORS.primary,
  },
  coverImage: {
    width: 125,
    height: 180,
  },
  uploadButtonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  inputItem: {
    marginBottom: 20,
  },
  dialogContent: {
    height: 300,
  },
});

