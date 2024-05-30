import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import COLORS from "../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from '@expo/vector-icons';
import { Text, Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import request from "../utils/request";
import Toast from "react-native-toast-message";

export default function Login() {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [cPwd, setCPwd] = useState("");
  const [islogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#8BC6EC", COLORS.second]}
        style={styles.background}
      >
        <View style={styles.card}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <MaterialIcons name="library-books" size={100} color="white" />
          </View>
          <Text style={styles.tit} variant="displaySmall">
            {islogin ? "Books Login" : "Books Register"}
          </Text>

          {!islogin && (
            <TextInput
              style={styles.inputItem}
              label="Nickname"
              value={nickname}
              onChangeText={(text) => setNickname(text)}
            />
          )}
          <TextInput
            style={styles.inputItem}
            label="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.inputItem}
            label="Password"
            secureTextEntry
            value={pwd}
            onChangeText={(text) => setPwd(text)}
          />
          {!islogin && (
            <TextInput
              style={styles.inputItem}
              label="Confirm Password"
              secureTextEntry
              value={cPwd}
              onChangeText={(text) => setCPwd(text)}
            />
          )}
          <Button
            mode="contained"
            onPress={async () => {
              if (!username) {
                Toast.show({
                  type: "error",
                  text1: "Error!",
                  text2: "Please enter username",
                });
                return;
              }
              if (!pwd) {
                Toast.show({
                  type: "error",
                  text1: "Error!",
                  text2: "Please enter password",
                });
                return;
              }
              if (!islogin) {
                if (!cPwd) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please enter a confirmation password",
                  });
                  return;
                }
                if (!nickname) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Please enter your nickname",
                  });
                  return;
                }
                if (pwd !== cPwd) {
                  Toast.show({
                    type: "error",
                    text1: "Error!",
                    text2: "Two password inconsistencies",
                  });
                  return;
                }
              }
              if (islogin) {
                let res = await request({
                  url: "/user/login",
                  method: "post",
                  data: {
                    username,
                    pwd,
                  },
                });
                dispatch(updateUserinfo(res.data));
                await AsyncStorage.setItem("userinfo", JSON.stringify(res.data));
                navigation.navigate("TabBar");
              } else {
                await request({
                  url: "/user/register",
                  method: "post",
                  data: {
                    nickname,
                    username,
                    pwd,
                  },
                });
                setIsLogin(true);
                Toast.show({
                  type: "success",
                  text1: "Success!",
                  text2: "Registration successful, please log in!",
                });
              } 
            }}
          >
            {islogin ? "Log in now" : "Register Now"}
          </Button>
          <TouchableOpacity
            onPress={() => {
              setIsLogin(!islogin);
            }}
          >
            <Text style={styles.link} variant="labelMedium">
              {islogin ? "I don't have an account yet, register now" : "Existing account, log in now"}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
  },
  tit: {
    color: "white",
    textAlign: "center",
    marginBottom: 50,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputItem: {
    marginBottom: 20,
  },
  link: {
    color: "#fff",
    textAlign: "center",
    paddingTop: 30,
  },
});
