import React, { useEffect, useState } from "react";
import "react-native-url-polyfill/auto";
import AuthStack from "./src/navigation/AuthStack";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "./src/context/Auth";
import Loader from "./src/components/Loader";

const App = () => {
  const { verifyToken, user } = useAuth();
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await verifyToken();
      } catch (error) {
        console.error("Error during app initialization:", error);
      } finally {
        setAppLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (appLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
