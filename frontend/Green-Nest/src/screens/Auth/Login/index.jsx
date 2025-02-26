import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
import { loginValidationSchema } from "../../../utils/ValidationSchema";
import { useAuth } from "../../../context/Auth";
import Loader from "../../../components/Loader";
import { useSnackbar } from "../../../context/Snackbar";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    const response = await login(values);
    if (response.success) {
      show("Login successful!", "success");
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeStack" }],
      });
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
              Hey there!
            </Text>
            <Text style={[styles.subheading, { color: colors.muted }]}>
              Welcome Back
            </Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
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
                  {/* Email Input with Icon */}
                  <Text style={[styles.label, { color: colors.text }]}>
                    Email
                  </Text>
                  <View
                    style={[
                      styles.inputContainer,
                      { borderColor: colors.border },
                    ]}
                  >
                    <Feather
                      name="mail"
                      size={20}
                      color={colors.placeholder}
                      style={styles.icon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter your email"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={[styles.errorText, { color: colors.DANGER }]}>
                      {errors.email}
                    </Text>
                  )}

                  {/* Password Input with Icon and Eye */}
                  <Text style={[styles.label, { color: colors.text }]}>
                    Password
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
                      placeholder="Enter your password"
                      placeholderTextColor={colors.placeholder}
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color={colors.placeholder}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={[styles.errorText, { color: colors.DANGER }]}>
                      {errors.password}
                    </Text>
                  )}

                  {/* Forget Password */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgetPassword")}
                  >
                    <Text
                      style={[
                        styles.forgotText,
                        { color: colors.buttonBackground },
                      ]}
                    >
                      Forget Password?
                    </Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <CustomButton
                    title="Login"
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

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: colors.text }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={[
                    styles.signupLink,
                    { color: colors.buttonBackground },
                  ]}
                >
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 18,
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
  forgotText: {
    alignSelf: "flex-end",
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    marginRight: 5,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;
