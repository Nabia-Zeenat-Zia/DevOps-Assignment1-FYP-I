import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import CustomButton from "../../components/nav/CustomButton";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const handleButtonPress = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      {/* Transparent and overlaying status bar */}
      <StatusBar translucent backgroundColor="transparent" />

      <SafeAreaView style={styles.container}>
        {/* Fullscreen image as background */}
        <Image
          source={require("../../assets/Background/WelcomeBackground.jpg")}
          style={styles.fullscreenImage}
        />

        {/* Content overlay */}
        <View
          style={[
            styles.bottomContainer,
            {
              backgroundColor: colors.cardBackground,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <Text style={[styles.heading, { color: colors.text }]}>Welcome!</Text>
          <Text style={[styles.description, { color: colors.muted }]}>
            This is the beginning of your journey. Start exploring now.
          </Text>
          <CustomButton
            title="Get Started"
            onPress={handleButtonPress}
            buttonStyle={{ backgroundColor: colors.buttonBackground }}
            textStyle={{ color: colors.buttonText }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  fullscreenImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.43,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 35,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default WelcomeScreen;
