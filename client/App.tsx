import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Results, Splash, Test} from './src/screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
     <StripeProvider
      publishableKey="pk_test_51PV2WAP61eirRjyiDx0FUPqnvrBRrGhEb9uGAtkScsg5JuT20h7SD6ZXnDoPMinzxYPfD7G5NhI7sLavCSQ6c3O700eGFklfsE"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.PIXIFY" // required for Apple Pay
    > 
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Splash">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Results" component={Results} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Test" component={Test} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </StripeProvider>
      <StatusBar  backgroundColor={`#4F33FC`} />
    </>
  );
};

export default App;
