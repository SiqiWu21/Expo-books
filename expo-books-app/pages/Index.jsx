import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../utils/Colors";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import { updateType } from "../redux/reducers/typeSlice";
import { updateBookData } from "../redux/reducers/bookDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import request, { baseURL } from "../utils/request";

const Index = () => {
  const navigation = useNavigation();
  const typeData = useSelector((state) => state.type.type);
  const bookData = useSelector((state) => state.bookData.bookData);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => {
    return state.userinfo.userinfo;
  });
  const getUserinfo = async () => {
    const value = await AsyncStorage.getItem("userinfo");
    if (value == null) {
      navigation.navigate("Login");
    } else {
      dispatch(updateUserinfo(JSON.parse(value)));
    }
  };

  const getTypeListData = async () => {
    try {
      let res = await request({
        url: "/type",
        method: "get",
      });
      res.data.forEach((item) => {
        item.checked = true;
      });
      dispatch(updateType(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };
  const getBookData = async () => {
    let typeIds = typeData
      .filter((item) => {
        return item.checked;
      })
      .map((item) => {
        return item.id;
      });
    try {
      let res = await request({
        url: "/book",
        method: "get",
        params: {
          typeIds,
        },
      });
      dispatch(updateBookData(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  useEffect(() => {
    if (userinfo && typeData.length === 0) {
      getTypeListData();
    }
  }, [userinfo]);

  useEffect(() => {
    if (userinfo) {
      getBookData();
    }
  }, [typeData]);

  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={["rgb(91,61,221)", "#9317ed"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headBox}
        >
          <Text style={[styles.headText, { fontSize: fontSize * 1.5 }]}>
            Hello, {userinfo?.nickname}
          </Text>
          <Text style={styles.subHeadText}>Record your wonderful reading</Text>
          <View style={[styles.circle, styles.circle1]}></View>
          <View style={[styles.circle, styles.circle2]}></View>
          <View style={[styles.circle, styles.circle3]}></View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize * 1.2 }]}>
            Type
          </Text>
          <View style={styles.typeContainer}>
            {typeData.length == 0 && (
              <Text style={[styles.emptyText, { fontSize }]}>no type</Text>
            )}
            {typeData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.typeButton,
                    {
                      borderColor: item.color,
                      backgroundColor: item.checked
                        ? item.color
                        : "transparent",
                    },
                  ]}
                  onPress={() => {
                    let deepData = [...typeData];
                    deepData[index].checked = !deepData[index].checked;
                    dispatch(updateType(deepData));
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSize * 0.8,
                      color: item.checked ? "#fff" : item.color,
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {bookData.length === 0 && (
            <View style={styles.emptyState}>
              <Image
                source={require("../assets/empty.png")}
                style={styles.emptyImage}
              />
              <Text style={[styles.emptyText, { fontSize }]}>no data</Text>
            </View>
          )}

          {bookData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.bookItem}
                onPress={() => {
                  navigation.navigate("BooksDetail", {
                    id: item.id,
                  });
                }}
              >
                <Image
                  style={styles.bookImage}
                  resizeMode="cover"
                  source={{
                    uri: baseURL + item.cover,
                  }}
                />
                <View style={styles.bookInfo}>
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: fontSize }}>
                      {item.bookName}
                    </Text>
                    <Text style={styles.bookAuthor}>{item.author}</Text>
                  </View>

                  <View style={styles.bookStatus}>
                    {item.status == "Unread" ? (
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
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddBook");
        }}
        style={styles.floatingButton}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
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
  headText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },
  subHeadText: {
    color: "rgba(255,255,255,0.8)",
  },
  circle: {
    position: "absolute",
    borderWidth: 5,
    borderStyle: "solid",
  },
  circle1: {
    right: 0,
    top: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "pink",
  },
  circle2: {
    right: 50,
    top: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "gold",
  },
  circle3: {
    right: 10,
    top: 120,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "red",
  },
  content: {
    padding: 20,
    margin: 20,
    backgroundColor: "#fff",
    marginTop: -50,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  typeButton: {
    marginRight: 5,
    marginBottom: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
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
  bookItem: {
    flexDirection: "row",
    marginTop: 15,
  },
  bookImage: {
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
  bookAuthor: {
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
});

export default Index;
