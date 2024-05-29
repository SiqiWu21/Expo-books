import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { updateUserinfo } from "../redux/reducers/userinfoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "../utils/request";
import Toast from "react-native-toast-message";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function ChangePwd() {
  const navigation = useNavigation();
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [cPwd, setCPwd] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.inputItem}
          label="Old Password"
          secureTextEntry
          value={oldPwd}
          onChangeText={(text) => setOldPwd(text)}
        />

        <TextInput
          style={styles.inputItem}
          label="New Password"
          secureTextEntry
          value={newPwd}
          onChangeText={(text) => setNewPwd(text)}
        />

        <TextInput
          style={styles.inputItem}
          label="Confirm New Password"
          secureTextEntry
          value={cPwd}
          onChangeText={(text) => setCPwd(text)}
        />
        <Button
          mode="contained"
          onPress={async () => {
            if (!oldPwd) {
              Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Please enter your old password",
              });
              return;
            }
            if (!newPwd) {
              Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Please enter a new password",
              });
              return;
            }
            if (!cPwd) {
              Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Please enter a confirmation password",
              });
              return;
            }
            if (newPwd !== cPwd) {
              Toast.show({
                type: "error",
                text1: "Error!",
                text2: "Two password inconsistencies",
              });
              return;
            }
            await request({
              url: `/user/updatePwd`,
              method: "post",
              data: {
                oldPwd,
                newPwd,
              },
            });
            dispatch(updateUserinfo(null));
            await AsyncStorage.removeItem("userinfo");
            navigation.replace("Login");
            Toast.show({
              type: "success",
              text1: "Success!",
              text2: "Modified successfully, please log in again!",
            });
          }}
        >
          Modify Now
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    width: "80%",
    paddingTop: 50,
  },
  tit: {
    color: "white",
    textAlign: "center",
    marginBottom: 100,
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
