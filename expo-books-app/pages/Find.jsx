import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  Text,
  Searchbar,
} from "react-native-paper";
import moment from "moment";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import { useDispatch, useSelector } from "react-redux";
import request, { baseURL } from "../utils/request";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const Find = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const reviewData = useSelector((state) => {
    return state.reviewData.reviewData;
  });
  const navigation = useNavigation();
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  useEffect(() => {
    getReviewList();
  }, []);
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
  let filterData = reviewData.filter((item) => {
    let bol = false;
    if (
      item.review.indexOf(searchQuery) !== -1 ||
      item?.book?.bookName.indexOf(searchQuery) !== -1
    ) {
      bol = true;
    }
    return bol;
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
        {filterData.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={require("../assets/empty.png")}
              style={styles.emptyImage}
            />
            <Text style={[styles.emptyText, { fontSize }]}>no data</Text>
          </View>
        )}
        {filterData.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BooksDetail", {
                  id: item.bookId,
                });
              }}
              key={index}
            >
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
                    source={{ uri: baseURL + item.user?.headpic }}
                  />
                  <Text
                    style={{
                      fontSize: fontSize,
                      color: "#666",
                      marginHorizontal: 10,
                    }}
                  >
                    {item.user?.nickname}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSize,
                      color: "#999",
                    }}
                  >
                    {moment(item.created_at).fromNow()}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: fontSize * 1.2,
                    fontWeight: "bold",
                    marginVertical: 5,
                  }}
                >
                  《{item?.book?.bookName}》
                </Text>
                <Text
                  style={{
                    fontSize,
                    color: "#666",
                    lineHeight: 2 * fontSize,
                  }}
                >
                  {item.review}
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
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
  },
});

export default Find;
