import { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import request from "../utils/request";

const Index = () => {
  const navigation = useNavigation();
  const typeData = useSelector((state) => state.type.type);
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
      res.data.checked = false;
      dispatch(updateType(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  useEffect(() => {
    if(userinfo && typeData.length === 0){
      getTypeListData();
    }
  }, [userinfo])

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
          <Text
            style={[
              {
                color: "#fff",
                fontWeight: "bold",
                marginTop: 20,
              },
              {
                fontSize: fontSize * 1.5,
              },
            ]}
          >
            Hello, {userinfo?.nickname}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Record your wonderful reading
          </Text>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 30,
              width: 50,
              height: 50,
              borderRadius: 25,
              borderColor: "pink",
              borderWidth: 5,
              borderStyle: "solid",
            }}
          ></View>
          <View
            style={{
              position: "absolute",
              right: 50,
              top: 50,
              width: 80,
              height: 80,
              borderRadius: 40,
              borderColor: "gold",
              borderWidth: 5,
              borderStyle: "solid",
            }}
          ></View>
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 120,
              width: 60,
              height: 60,
              borderRadius: 30,
              borderColor: "red",
              borderWidth: 5,
              borderStyle: "solid",
            }}
          ></View>
        </LinearGradient>

        <View
          style={{
            padding: 20,
            margin: 20,
            backgroundColor: "#fff",
            marginTop: -50,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: fontSize * 1.2,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Type
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {typeData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    marginRight: 5,
                    marginBottom: 5,
                    borderColor: item.color,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 15,
                    backgroundColor: index % 2 == 0 ? "red" : "transparent",
                  }}
                  mode={index % 2 == 0 ? "outlined" : "flat"}
                  onPress={() => console.log("Pressed")}
                >
                  <Text
                    style={{
                      fontSize: fontSize * 0.8,
                      color: index % 2 == 0 ? "#fff" : "red",
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 144,
                  }}
                  resizeMode="cover"
                  source={require("../assets/cover.jpg")}
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
                      To Kill a Mockingbird Mockingbird
                    </Text>
                    <Text
                      style={{
                        color: "#666",
                        marginTop: 5,
                      }}
                    >
                      Harper Lee
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                        backgroundColor: "#eee",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSize * 0.8,
                          color: "#666",
                        }}
                      >
                        Unread
                      </Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                        backgroundColor: COLORS.primary,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSize * 0.8,
                          color: "#fff",
                        }}
                      >
                        Read
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
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
