import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Formik } from "formik";
import { useTheme } from "../../../context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../../components/nav/CustomButton";
import { signupValidationSchema } from "../../../utils/ValidationSchema";
import { useAuth } from "../../../context/Auth";
import { useSnackbar } from "../../../context/Snackbar";
import Loader from "../../../components/Loader";

const { width } = Dimensions.get("window");

const Signup = ({ navigation }) => {
  const { show } = useSnackbar();
  const { register, loading } = useAuth();
  const { colors } = useTheme();

  const handleSignup = async (values, { resetForm }) => {
    const response = await register(values);
    if (response.success) {
      show("Account created successfully!", "success");
      resetForm();
      navigation.navigate("Login");
    } else {
      show(response.error, "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        Create Account
      </Text>
      <Text style={[styles.subheading, { color: colors.muted }]}>
        Let's get you started with a new account.
      </Text>

      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          password: "",
          contact: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}
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
            {/* First Name Input */}
            <Text style={[styles.label, { color: colors.text }]}>
              First Name
            </Text>
            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
            >
              <Feather
                name="user"
                size={20}
                color={colors.placeholder}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your first name"
                placeholderTextColor={colors.placeholder}
                onChangeText={handleChange("fname")}
                onBlur={handleBlur("fname")}
                value={values.fname}
              />
            </View>
            {errors.fname && touched.fname && (
              <Text style={[styles.errorText, { color: colors.DANGER }]}>
                {errors.fname}
              </Text>
            )}

            {/* Last Name Input */}
            <Text style={[styles.label, { color: colors.text }]}>
              Last Name
            </Text>
            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
            >
              <Feather
                name="user"
                size={20}
                color={colors.placeholder}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your last name"
                placeholderTextColor={colors.placeholder}
                onChangeText={handleChange("lname")}
                onBlur={handleBlur("lname")}
                value={values.lname}
              />
            </View>
            {errors.lname && touched.lname && (
              <Text style={[styles.errorText, { color: colors.DANGER }]}>
                {errors.lname}
              </Text>
            )}

            {/* Email Input */}
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
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

            {/* Password Input */}
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
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

            {/* Contact Input */}
            <Text style={[styles.label, { color: colors.text }]}>Contact</Text>
            <View
              style={[styles.inputContainer, { borderColor: colors.border }]}
            >
              <Feather
                name="phone"
                size={20}
                color={colors.placeholder}
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your contact number"
                placeholderTextColor={colors.placeholder}
                onChangeText={handleChange("contact")}
                onBlur={handleBlur("contact")}
                value={values.contact}
                keyboardType="numeric"
              />
            </View>
            {errors.contact && touched.contact && (
              <Text style={[styles.errorText, { color: colors.DANGER }]}>
                {errors.contact}
              </Text>
            )}

            {/* Signup Button */}
            <CustomButton
              title="Signup"
              onPress={handleSubmit}
              buttonStyle={[
                styles.button,
                { backgroundColor: colors.buttonBackground },
              ]}
              textStyle={[styles.buttonText, { color: colors.buttonText }]}
            />
          </View>
        )}
      </Formik>
    </View>
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

export default Signup;
