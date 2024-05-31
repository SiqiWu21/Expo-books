import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  RadioButton,
  IconButton,
} from "react-native-paper";
import COLORS from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import request, { baseURL } from "../utils/request";
import Toast from "react-native-toast-message";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

const BooksDetail = () => {
  // Redux dispatch function to update the state
  const dispatch = useDispatch();
  // Local state for book details
  const [detail, setDetail] = useState(null);
  // Local state for book status
  const [status, setStatus] = useState("Read");
  // Navigation and route hooks
  const navigation = useNavigation();
  const route = useRoute();
  // Getting user info from Redux store
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });
  // Getting book data from Redux store
  const bookData = useSelector((state) => {
    return state.bookData.bookData;
  });
  // Getting book ID from route parameters
  const { id } = route.params;
  // Local state for dialog visibility
  const [visible, setVisible] = useState(false);
  // Getting font size from Redux store
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  // Getting review data from Redux store
  const reviewData = useSelector((state) => {
    return state.reviewData.reviewData;
  });

  // Filtering reviews for the current book
  let currentBookReviewData = reviewData.filter((item) => {
    return item.bookId == id;
  });

  // Fetch reviews on component mount
  useEffect(() => {
    getReviewList();
  }, []);

  // Fetch book details when book data changes
  useEffect(() => {
    getDetail();
  }, [bookData]);

  // Function to fetch book details from the server
  const getDetail = async () => {
    try {
      let res = await request({
        url: `/book/${id}`,
        method: "get",
      });
      setDetail(res.data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  // Function to fetch reviews from the server
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

  // Checking if the logged-in user is the owner of the book
  let isMe = (userinfo && userinfo?.id) == (detail && detail?.userId);

  return (
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.bookHeader}>
              <Image
                style={styles.bookCover}
                resizeMode="cover"
                source={{
                  uri: baseURL + detail?.cover,
                }}
              />
              <View style={styles.bookInfo}>
                <View>
                  <Text style={[styles.bookName, { fontSize: fontSize }]}>
                    {detail?.bookName}
                  </Text>
                  <Text style={styles.author}>{detail?.author}</Text>
                </View>
                {!isMe && (
                  <View style={styles.bookStatus}>
                    <View style={styles.readBadge}>
                      <Text style={{ fontSize: fontSize * 0.8, color: "#fff" }}>
                        {detail?.type?.title}
                      </Text>
                    </View>
                  </View>
                )}
                {isMe && (
                  <View style={styles.bookStatus}>
                    {detail?.status == "Unread" ? (
                      <View style={styles.unreadBadge}>
                        <Text
                          style={{ fontSize: fontSize * 0.8, color: "#666" }}
                        >
                          Unread
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.readBadge}>
                        <Text
                          style={{ fontSize: fontSize * 0.8, color: "#fff" }}
                        >
                          Read
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.descriptionContainer}>
              <Text
                style={[
                  styles.description,
                  { fontSize, lineHeight: 1.5 * fontSize },
                ]}
              >
                {detail?.desc}
              </Text>
            </View>

            <View style={styles.separator}></View>

            <Text style={[styles.reviewTitle, { fontSize: fontSize * 1.2 }]}>
              Review
            </Text>
            {currentBookReviewData.length == 0 && (
              <View style={styles.emptyState}>
                <Image
                  source={require("../assets/empty.png")}
                  style={styles.emptyImage}
                />
                <Text style={[styles.emptyText, { fontSize }]}>No data</Text>
              </View>
            )}
            {currentBookReviewData.map((item) => {
              return (
                <View key={item.id} style={styles.reviewContainer}>
                  <View style={styles.reviewHeader}>
                    <Image
                      style={styles.reviewAvatar}
                      resizeMode="cover"
                      source={{ uri: baseURL + item.user?.headpic }}
                    />
                    <Text style={[styles.reviewUser, { fontSize: fontSize }]}>
                      {item.user?.nickname}
                    </Text>
                    <Text style={[styles.reviewDate, { fontSize: fontSize }]}>
                      {moment(item.created_at).fromNow()}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.reviewText,
                      { fontSize, lineHeight: 2 * fontSize },
                    ]}
                  >
                    {item.review}
                  </Text>
                  {userinfo?.id == item.userId && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton
                        icon="delete"
                        iconColor="red"
                        size={20}
                        onPress={async () => {
                          let res = await request({
                            url: `/review/${item.id}`,
                            method: "delete",
                          });
                          getReviewList();
                          Toast.show({
                            type: "success",
                            text1: "Success!",
                            text2: res.msg,
                          });
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            })}
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
                onPress={async () => {
                  let res = await request({
                    url: `/book/${id}`,
                    method: "put",
                    data: {
                      status,
                    },
                  });
                  Toast.show({
                    type: "success",
                    text1: "Success!",
                    text2: res.msg,
                  });
                  getDetail();
                  setVisible(false);
                }}
              >
                Done
              </Button>
            </Dialog.Actions>
          </Dialog>
          {isMe && (
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                icon="pen"
                onPress={() => {
                  navigation.navigate("EditBook", {
                    id,
                  });
                }}
              >
                Edit
              </Button>

              <Button
                icon="update"
                mode="contained-tonal"
                onPress={() => {
                  setVisible(true);
                  setStatus(detail.status);
                }}
              >
                Mark
              </Button>

              <Button
                icon="comment"
                mode="contained"
                onPress={() => {
                  navigation.navigate("AddReview", {
                    id,
                  });
                }}
              >
                Review
              </Button>
            </View>
          )}
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
  bookHeader: {
    flexDirection: "row",
    padding: 20,
  },
  bookCover: {
    width: 100,
    height: 144,
  },
  bookInfo: {
    flex: 1,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  bookName: {
    fontWeight: "bold",
  },
  author: {
    color: "#666",
    marginTop: 5,
  },
  bookStatus: {
    flexDirection: "row",
  },
  unreadBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  readBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  separator: {
    height: 6,
    backgroundColor: "#eee",
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  description: {
    color: "#666",
  },
  reviewTitle: {
    fontWeight: "bold",
    padding: 20,
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
  reviewContainer: {
    backgroundColor: "#eee",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  reviewUser: {
    color: "#666",
    marginHorizontal: 10,
  },
  reviewDate: {
    color: "#999",
  },
  reviewText: {
    lineHeight: 2,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingVertical: 20,
  },
});

export default BooksDetail;
