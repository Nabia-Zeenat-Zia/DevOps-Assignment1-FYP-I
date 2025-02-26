import App from "./App";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { AuthProvider } from "./src/context/Auth";
import { SnackbarProvider } from "./src/context/Snackbar";
import { ThemeProvider } from "./src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Main = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <SnackbarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </SafeAreaProvider>
);

registerRootComponent(Main);
