import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateFontSize } from "../redux/reducers/fontSizeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import request from "../utils/request";
import Toast from "react-native-toast-message";
import { Button, TextInput, RadioButton, Text } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utils/Colors";
export default function Settings() {
  const fontSize = useSelector((state) => {
    return state.fontSize.fontSize;
  });
  const navigation = useNavigation();
  const [size, setSize] = useState(14);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.sampleBox}>
          <Text style={[styles.sample, { fontSize: size }]}>
            Sample Text Size
          </Text>
        </View>

        <RadioButton.Group
          onValueChange={(newValue) => setSize(newValue)}
          value={size}
        >
          <RadioButton.Item label="Mini" value={12} />
          <RadioButton.Item label="Standard" value={14} />
          <RadioButton.Item label="Large" value={20} />
        </RadioButton.Group>

        <Button
          mode="contained"
          style={styles.btn}
          onPress={async () => {
            dispatch(updateFontSize(size));
            await AsyncStorage.setItem("fontSize", 20 + '');
            Toast.show({
              type: "success",
              text1: "Success!",
              text2: "Set successfully!",
            });
            navigation.goBack();
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
  row: {
    marginTop: 20,
  },
  sample: {
    fontSize: 14,
  },
  btn: {
    marginTop: 50,
  },
  sampleBox: {
    backgroundColor: COLORS.light,
    padding: 10,
    marginBottom: 50,
    borderRadius: 5,
  },
});
