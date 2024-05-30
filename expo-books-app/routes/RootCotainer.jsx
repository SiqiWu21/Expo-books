import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import COLORS from "../utils/Colors";
import Login from "../pages/Login";
import TabBar from "./BottomTabBar";
import ChangePwd from "../pages/ChangePwd";
import Userinfo from "../pages/Userinfo";
import Settings from "../pages/Settings";
import BooksDetail from "../pages/BooksDetail";
import AddBook from "../pages/AddBook";
import AddReview from "../pages/AddReview";
import EditBook from "../pages/EditBook";

export default function RootCotainer() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="AddReview"
          component={AddReview}
          options={{
            title: "Add Review",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBook}
          options={{
            title: "Edit Book",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{
            title: "Add Book",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="TabBar"
          component={TabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Books Detail"
          component={BooksDetail}
          options={{
            title: "BooksDetail",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ChangePwd"
          component={ChangePwd}
          options={{
            title: "Password Modification",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Userinfo"
          component={Userinfo}
          options={{
            title: "User Profile",
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
