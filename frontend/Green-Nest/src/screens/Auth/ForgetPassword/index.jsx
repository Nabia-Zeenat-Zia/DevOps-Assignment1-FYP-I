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
import { loginValidationSchema } from "../../../utils/ValidationSchema";
import { useAuth } from "../../../context/Auth";
import Loader from "../../../components/Loader";
import { useSnackbar } from "../../../context/Snackbar";

const { width } = Dimensions.get("window");

const ForgetPassword = ({ navigation }) => {
  const { colors } = useTheme();
  const { sendOTP, verifyOTP } = useAuth();
  const { show } = useSnackbar();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (values) => {
    setLoading(true);
    const response = await sendOTP(values.email);

    if (response.success) {
      setEmail(values.email);
      show("OTP sent successfully!", "success");
    } else {
      show(response.error, "error");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (values) => {
    setLoading(true);
    try {
      const response = await verifyOTP({ otp: values.otp, email });

      if (response.success) {
        show("OTP verified successfully!", "success");
        navigation.navigate("ResetPassword", { email });
      } else {
        show(response.error, "error");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      show("An unexpected error occurred while verifying OTP.", "error");
    } finally {
      setLoading(false);
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
              Reset Password
            </Text>
            <Text style={[styles.subheading, { color: colors.muted }]}>
              {email
                ? "Enter the OTP sent to your email to verify your identity."
                : "Forgot your password? No worries, let's get you back into your account."}
            </Text>

            <Formik
              initialValues={email ? { otp: "" } : { email: "" }}
              validationSchema={
                email
                  ? loginValidationSchema.pick(["otp"])
                  : loginValidationSchema.pick(["email"])
              }
              onSubmit={email ? handleVerifyOTP : handleSendOTP}
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
                  {/* Email Input */}
                  {!email && (
                    <>
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
                        <Text
                          style={[styles.errorText, { color: colors.DANGER }]}
                        >
                          {errors.email}
                        </Text>
                      )}
                    </>
                  )}

                  {/* OTP Input */}
                  {email && (
                    <>
                      <Text style={[styles.label, { color: colors.text }]}>
                        OTP
                      </Text>
                      <View
                        style={[
                          styles.inputContainer,
                          { borderColor: colors.border },
                        ]}
                      >
                        <Feather
                          name="key"
                          size={20}
                          color={colors.placeholder}
                          style={styles.icon}
                        />
                        <TextInput
                          style={[styles.input, { color: colors.text }]}
                          placeholder="Enter the 4-digit OTP"
                          placeholderTextColor={colors.placeholder}
                          onChangeText={handleChange("otp")}
                          onBlur={handleBlur("otp")}
                          value={values.otp}
                          keyboardType="number-pad"
                          maxLength={4}
                        />
                      </View>
                      {errors.otp && touched.otp && (
                        <Text
                          style={[styles.errorText, { color: colors.DANGER }]}
                        >
                          {errors.otp}
                        </Text>
                      )}
                    </>
                  )}

                  {/* Verify Email or OTP Button */}
                  <CustomButton
                    title={email ? "Verify OTP" : "Verify Email"}
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
    marginBottom: 20,
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

export default ForgetPassword;
