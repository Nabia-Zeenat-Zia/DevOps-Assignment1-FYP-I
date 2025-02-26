import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../../context/ThemeContext";

const Loader = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.loadingContainer,
        { backgroundColor: colors.loaderBackground },
      ]}
    >
      <LottieView
        source={require("../../assets/Animations/Loading.json")}
        autoPlay
        loop
        style={styles.lottieView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieView: {
    width: 200,
    height: 200,
  },
});

export default Loader;
