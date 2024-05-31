import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import request from "../utils/request";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddReview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params; // Get the book ID from the route parameters
  const [review, setReview] = useState(""); // State for the review input
  const dispatch = useDispatch();

  // Function to fetch the list of reviews
  const getReviewList = async () => {
    try {
      let res = await request({
        url: `/review`,
        method: "get",
      });
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

        <View style={styles.buttonContainer}>
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
                  review,
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

// Styles extracted to the styles object
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingVertical: 20,
  },
});
