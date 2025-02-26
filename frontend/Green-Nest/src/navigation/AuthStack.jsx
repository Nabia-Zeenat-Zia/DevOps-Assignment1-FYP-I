import React from "react";
import Welcome from "../screens/Welcome";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import ResetPassword from "../screens/Auth/ForgetPassword/ResetPassword";
import ForgetPassword from "../screens/Auth/ForgetPassword";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
