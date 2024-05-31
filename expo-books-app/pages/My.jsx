import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import { updateBookData } from "../redux/reducers/bookDataSlice";
import { updateType } from "../redux/reducers/typeSlice";
import { updateReviewData } from "../redux/reducers/reviewDataSlice";
import { updateFontSize } from "../redux/reducers/fontSizeSlice";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Avatar, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../utils/request";
import COLORS from "../utils/Colors";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function My() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userinfo.userinfo);
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8BC6EC", COLORS.second]}
        style={styles.headBox}
      >
        <View style={styles.headContent}>
          <Avatar.Image
            size={100}
            source={{
              uri: userinfo ? baseURL + userinfo.headpic : "",
            }}
          />
          <Text style={[styles.headText, { fontSize }]}>
            {userinfo?.nickname}
          </Text>
        </View>
      </LinearGradient>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              onPress={() => navigation.navigate("Userinfo")}
              title={<Text style={[{ fontSize }]}>User Profile</Text>}
              left={() => (
                <Entypo name="user" size={24} color={COLORS.primary} />
              )}
              right={() => <AntDesign name="right" size={20} color="#ddd" />}
            />
            <List.Item
              onPress={() => navigation.navigate("ChangePwd")}
              title={<Text style={[{ fontSize }]}>Password Modification</Text>}
              left={() => <Entypo name="lock" size={24} color="blue" />}
              right={() => <AntDesign name="right" size={20} color="#ddd" />}
            />
            <List.Item
              onPress={() => navigation.navigate("Settings")}
              title={<Text style={[{ fontSize }]}>Settings</Text>}
              left={() => (
                <Fontisto name="player-settings" size={24} color="deeppink" />
              )}
              right={() => <AntDesign name="right" size={20} color="#ddd" />}
            />
            <List.Item
              onPress={() => navigation.navigate("About")}
              title={<Text style={[{ fontSize }]}>About</Text>}
              left={() => (
                <AntDesign name="infocirlce" size={24} color="purple" />
              )}
              right={() => <AntDesign name="right" size={20} color="#ddd" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          style={styles.logoutButton}
          buttonColor="red"
          mode="contained"
          onPress={async () => {
            dispatch(updateUserinfo(null));
            dispatch(updateBookData([]));
            dispatch(updateFontSize(14));
            dispatch(updateReviewData([]));
            dispatch(updateType([]));
            await AsyncStorage.removeItem("userinfo");
            navigation.replace("Login");
          }}
        >
          <Text
            style={[
              {
                fontSize,
              },
            ]}
          >
            Log out
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  headBox: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
  },
  card: {
    width: "90%",
    marginTop: 20,
  },
  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  logoutButton: {
    width: 200,
  },
});
