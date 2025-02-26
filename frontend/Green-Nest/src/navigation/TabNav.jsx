import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import Leaderboard from "../screens/Leaderboard";
import UserProfile from "../screens/UserProfile";
import AddPlant from "../screens/Plant";
import BottomFloatingNavbar from "../components/nav/BottomNavBar";

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomFloatingNavbar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="AddPlant" component={AddPlant} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default HomeStack;
