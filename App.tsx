import React, { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from "@/core/store";
import paperTheme from "@/core/theme/paperTheme";
import { restoreSession } from "@/core/store/slices/authSlice";
import { AppDispatch } from "@/core/store";
import { RootNavigator } from "@/core/navigation/RootNavigator";

// Component to handle initialization (restoring session)
const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  // RootNavigator handles the "Loading" state based on useAuth()
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

// Main App wrapper with Redux and Paper providers
const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <AppInitializer />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;