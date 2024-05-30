import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../utils/Colors";
import Index from "../pages/Index";
import Review from "../pages/Review";
import Type from "../pages/Type";
import My from "../pages/My";

export default function BottomTabBar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#666",
      }}
    >
      <Tab.Screen
        options={{
          title: "Books",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="library-books" size={20} color={color} />
          ),
        }}
        name="Index"
        component={Index}
      />

      <Tab.Screen
        options={{
          title: "Type",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore1" size={20} color={color} />
          ),
        }}
        name="Type"
        component={Type}
      />

      <Tab.Screen
        options={{
          title: "Review",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="rate-review" size={20} color={color} />
          ),
        }}
        name="Review"
        component={Review}
      />

      <Tab.Screen
        options={{
          title: "My",
          headerShown: false,
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={20} color={color} />
          ),
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
}
