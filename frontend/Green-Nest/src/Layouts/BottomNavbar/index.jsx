import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../../context/ThemeContext";
import BottomFloatingNavbar from "../../components/nav/BottomNavBar";

const Stack = createStackNavigator();

const MainLayout = ({ children, navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Render the current screen */}
      <View style={styles.content}>{children}</View>

      {/* Persistent Bottom Navbar */}
      <BottomFloatingNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 100,
  },
});

export default MainLayout;
