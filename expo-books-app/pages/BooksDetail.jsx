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
} from "react-native-paper";
import COLORS from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import request, { baseURL } from "../utils/request";
import Toast from "react-native-toast-message";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

const BooksDetail = () => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState(null);
  const [status, setStatus] = useState("Read");
  const navigation = useNavigation();
  const route = useRoute();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });
  const { id } = route.params;
  const [visible, setVisible] = useState(false);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  const reviewData = useSelector((state) => {
    return state.reviewData.reviewData;
  });

  useEffect(() => {
    getDetail();
    getReviewList();
  }, []);

  const getDetail = async () => {
    try {
      let res = await request({
        url: `/book/${id}`,
        method: "get",
      });
      console.log("detail = ", res.data);
      setDetail(res.data);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

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
    <PaperProvider>
      <Portal>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 144,
                }}
                resizeMode="cover"
                source={{
                  uri: baseURL + detail?.cover,
                }}
              />
              <View
                style={{
                  flex: 1,
                  borderColor: "#eee",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: fontSize,
                    }}
                  >
                    {detail?.bookName}
                  </Text>
                  <Text
                    style={{
                      color: "#666",
                      marginTop: 5,
                    }}
                  >
                    {detail?.author}
                  </Text>
                </View>

                <View style={styles.bookStatus}>
                  {detail?.status == "Unread" ? (
                    <View style={styles.unreadBadge}>
                      <Text style={{ fontSize: fontSize * 0.8, color: "#666" }}>
                        Unread
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.readBadge}>
                      <Text style={{ fontSize: fontSize * 0.8, color: "#fff" }}>
                        Read
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: "#eee",
              }}
            ></View>

            <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
              }}
            >
              <Text
                style={{
                  fontSize,
                  color: "#666",
                  lineHeight: 1.5 * fontSize,
                }}
              >
                {detail?.desc}
              </Text>
            </View>

            <View
              style={{
                height: 6,
                backgroundColor: "#eee",
              }}
            ></View>

            <Text
              style={{
                fontSize: fontSize * 1.2,
                fontWeight: "bold",
                padding: 20,
              }}
            >
              Review
            </Text>
            {reviewData.length == 0 && (
              <View style={styles.emptyState}>
                <Image
                  source={require("../assets/empty.png")}
                  style={styles.emptyImage}
                />
                <Text style={[styles.emptyText, { fontSize }]}>no data</Text>
              </View>
            )}
            {reviewData.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "#eee",
                    padding: 20,
                    marginHorizontal: 20,
                    borderRadius: 5,
                    marginBottom: 20,
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
                      fontSize,
                      lineHeight: 2 * fontSize,
                    }}
                  >
                    {item.review}
                  </Text>
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
          {((userinfo && userinfo?.id) != (detail && detail?.userId)) && (
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

export default BooksDetail;
