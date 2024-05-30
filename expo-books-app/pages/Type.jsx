import { useState, useEffect } from "react";
import { TextInput, IconButton, MD3Colors, Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Type = () => {
  const [text, setText] = useState("");
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomDarkColor = () => {
    const randomColor = `rgb(${getRandomInt(0, 128)}, ${getRandomInt(
      0,
      128
    )}, ${getRandomInt(0, 128)})`;
    return randomColor;
  };

  console.log("getRandomDarkColor = ", getRandomDarkColor())

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#eee",
      }}
    >
      <View
        style={{
          height: 100,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          // iOS shadow
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          // Android shadow
          elevation: 15,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: 10,
            height: 38
          }}
          label="Type Name"
          value={text}
          mode="outlined"
          onChangeText={(text) => setText(text)}
        />
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          New addition
        </Button>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 0,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 6,
                    backgroundColor: "red",
                    height: fontSize * 1.5,
                    marginRight: 2,
                    borderRadius: 3
                  }}
                ></View>
                <Text>Type1</Text>
              </View>

              <IconButton
                icon="delete"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => console.log("Pressed")}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Type;
