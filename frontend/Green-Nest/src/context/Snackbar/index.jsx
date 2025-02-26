import React, { createContext, useContext, useState } from "react";
import { Snackbar } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

const SnackbarContext = createContext({});

const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("This is a success message!");
  const [backgroundColor, setBackgroundColor] = useState("#4CAF50"); // Default: Success (Green)
  const [snackbarStyle, setSnackbarStyle] = useState({}); // Optional custom style for Snackbar

  // Function to show Snackbar
  const show = (
    message = "Success!",
    severity = "success",
    customStyle = {}
  ) => {
    setMessage(message);
    setBackgroundColor(getBackgroundColor(severity)); // Set background based on severity
    setSnackbarStyle(customStyle); // Set custom style if provided
    setVisible(true);
  };

  // Function to hide Snackbar
  const hide = () => {
    setVisible(false);
  };

  // Helper function to determine background color based on severity
  const getBackgroundColor = (severity) => {
    switch (severity) {
      case "success":
        return "#4CAF50"; // Green
      case "error":
        return "#f44336"; // Red
      case "info":
        return "#2196F3"; // Blue
      case "warning":
        return "#FF9800"; // Orange
      default:
        return "#323232"; // Default dark color
    }
  };

  return (
    <SnackbarContext.Provider value={{ show }}>
      <View style={styles.container}>
        {children}
        <Snackbar
          visible={visible}
          onDismiss={hide}
          duration={3000} // Auto-hide duration
          style={[{ backgroundColor }, snackbarStyle]}
        >
          <Text style={styles.snackbarText}>{message}</Text>
        </Snackbar>
      </View>
    </SnackbarContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbarText: {
    color: "#fff",
    fontSize: 16,
  },
});

export { SnackbarProvider, useSnackbar };
