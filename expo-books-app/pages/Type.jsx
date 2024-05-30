import { useState, useEffect } from "react";
import { TextInput, IconButton, MD3Colors, Button } from "react-native-paper";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { updateType } from "../redux/reducers/typeSlice";
import request from "../utils/request";

const Type = () => {
  const dispatch = useDispatch();
  const typeData = useSelector((state) => state.type.type);
  const [title, setTitle] = useState("");
  const fontSize = useSelector((state) => state.fontSize.fontSize);

  const handleSubmit = async () => {
    if (!title) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Please enter type name",
      });
      return;
    }
    try {
      let res = await request({
        url: "/type",
        method: "post",
        data: {
          title,
          color: getRandomDarkColor(),
        },
      });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: res.msg,
      });
      setTitle("");
      getListData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await request({
        url: `/type/${id}`,
        method: "delete",
      });
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: res.msg,
      });
      getListData();
    } catch (error) {
      console.log("error = ", error);
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };

  const getListData = async () => {
    try {
      let res = await request({
        url: "/type",
        method: "get",
      });
      console.log("res123 = ", res);
      dispatch(updateType(res.data));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Server Error!",
      });
    }
  };
  useEffect(() => {
    if (typeData.length == 0) {
      getListData();
    }
  }, []);
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="Type Name"
          value={title}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
        />
        <Button mode="contained" onPress={handleSubmit}>
          New addition
        </Button>
      </View>
      <ScrollView style={styles.scrollView}>
        {typeData.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={require("../assets/empty.png")}
              style={styles.emptyImage}
            />
            <Text style={[styles.emptyText, { fontSize }]}>no data</Text>
          </View>
        )}
        {typeData.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemInnerContainer}>
                <View
                  style={[
                    styles.itemColorIndicator,
                    {
                      backgroundColor: item.color,
                      height: fontSize * 1.5,
                    },
                  ]}
                />
                <Text
                  style={[styles.itemTitle, { fontSize, color: item.color }]}
                >
                  {item.title}
                </Text>
              </View>
              <IconButton
                icon="delete"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => handleDelete(item.id)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  inputContainer: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    height: 38,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
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
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemColorIndicator: {
    width: 6,
    marginRight: 5,
    borderRadius: 3,
  },
  itemTitle: {
    fontWeight: "bold",
  },
});

export default Type;
