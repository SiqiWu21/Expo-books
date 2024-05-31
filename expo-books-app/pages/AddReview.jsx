import { StyleSheet, View, Platform, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import * as ImagePicker from "expo-image-picker";
import request, { baseURL } from "../utils/request";
import { Button, TextInput, Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import COLORS from "../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddReview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [review, setReview] = useState("");
  const [cover, setCover] = useState("");
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });

  const getReviewList = async () => {
    try {
      let res = await request({
        url: `/review`,
        method: "get",
        params: {
          bookId: id,
        },
      });
      console.log("reviews = ", res.data);
      dispatch(updateReviewData(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.inputItem}
          multiline={true}
          mode="flat"
          value={review}
          placeholder="Write some current inspirations~"
          onChangeText={(text) => setReview(text)}
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
              navigation.goBack();
            }}
          >
            Cancel
          </Button>

          <Button
            mode="contained"
            onPress={async () => {
              if (!review) {
                Toast.show({
                  type: "error",
                  text1: "Error!",
                  text2: "Please enter some current inspirations~",
                });
                return;
              }
              let res = await request({
                url: `/review`,
                method: "post",
                data: {
                  bookId: id,
                  review
                },
              });
              getReviewList();
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
