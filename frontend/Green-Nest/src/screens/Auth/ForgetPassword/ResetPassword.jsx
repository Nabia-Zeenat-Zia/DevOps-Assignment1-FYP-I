import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/nav/CustomButton";
import { resetPasswordValidationSchema } from "../../../utils/ValidationSchema";
import { useAuth } from "../../../context/Auth";
import Loader from "../../../components/Loader";
import { useSnackbar } from "../../../context/Snackbar";

const { width } = Dimensions.get("window");

const ResetPassword = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { resetPassword, loading } = useAuth();
  const { show } = useSnackbar();
  const { email } = route.params;

  const handleResetPassword = async (values) => {
    const response = await resetPassword({ email, ...values });

    if (response.success) {
      show("Password reset successful!", "success");
      navigation.navigate("Login");
    } else {
      show(response.error, "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            <Text style={[styles.heading, { color: colors.text }]}>
              Reset Your Password
            </Text>
            <Text style={[styles.subheading, { color: colors.muted }]}>
              Enter a new password for your account associated with {email}.
            </Text>

            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={handleResetPassword}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  {/* Password Input */}
                  <Text style={[styles.label, { color: colors.text }]}>
                    New Password
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      { borderColor: colors.border },
                    ]}
                  >
                    <Feather
                      name="lock"
                      size={20}
                      color={colors.placeholder}
                      style={styles.icon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter your new password"
                      placeholderTextColor={colors.placeholder}
                      secureTextEntry
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                  </View>
                  {errors.password && touched.password && (
                    <Text style={[styles.errorText, { color: colors.DANGER }]}>
                      {errors.password}
                    </Text>
                  )}

                  {/* Confirm Password Input */}
                  <Text style={[styles.label, { color: colors.text }]}>
                    Confirm Password
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      { borderColor: colors.border },
                    ]}
                  >
                    <Feather
                      name="lock"
                      size={20}
                      color={colors.placeholder}
                      style={styles.icon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Confirm your new password"
                      placeholderTextColor={colors.placeholder}
                      secureTextEntry
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={[styles.errorText, { color: colors.DANGER }]}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  {/* Reset Password Button */}
                  <CustomButton
                    title="Reset Password"
                    onPress={handleSubmit}
                    buttonStyle={[
                      styles.button,
                      { backgroundColor: colors.buttonBackground },
                    ]}
                    textStyle={[
                      styles.buttonText,
                      { color: colors.buttonText },
                    ]}
                  />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResetPassword;
