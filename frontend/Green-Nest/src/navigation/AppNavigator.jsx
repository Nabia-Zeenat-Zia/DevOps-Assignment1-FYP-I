import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./TabNav";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={HomeStack} />
      {/* <Stack.Screen name="PlantDetails" component={PlantDetails} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
