import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/Auth";

const BottomFloatingNavbar = ({ navigation, state }) => {
  const { colors } = useTheme();
  const { logout } = useAuth();

  const navigate = (routeName) => {
    navigation.navigate(routeName);
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={[styles.navbar, { backgroundColor: colors.cardBackground }]}>
      {/* Home Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => navigate("Home")}>
        <Feather
          name="home"
          size={24}
          color={state.index === 0 ? colors.buttonBackground : colors.text}
        />
      </TouchableOpacity>

      {/* Leaderboard Button */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigate("Leaderboard")}
      >
        <Feather
          name="award"
          size={24}
          color={state.index === 1 ? colors.buttonBackground : colors.text}
        />
      </TouchableOpacity>

      {/* Add Plant Button */}
      <TouchableOpacity
        style={[
          styles.navItem,
          styles.centerItem,
          { backgroundColor: colors.buttonBackground },
        ]}
        onPress={() => navigate("AddPlant")}
      >
        <Feather name="plus-circle" size={28} color={colors.buttonText} />
      </TouchableOpacity>

      {/* User Profile Button */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigate("UserProfile")}
      >
        <Feather
          name="user"
          size={24}
          color={state.index === 3 ? colors.buttonBackground : colors.text}
        />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
        <Feather name="log-out" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  centerItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomFloatingNavbar;
