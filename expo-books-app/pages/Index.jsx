import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import COLORS from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const Index = () => {
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });

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
            Hello, Mr zhang
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
            {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
              return (
                <TouchableOpacity
                  key={item}
                  style={{
                    marginRight: 5,
                    marginBottom: 5,
                    borderColor: "red",
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
                    Example Chip
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
                    //   backgroundColor: COLORS.light,
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

                  <ProgressBar progress={0.5} color={MD3Colors.error50} />
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
