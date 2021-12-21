import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components imports
import Details from './src/components/Details';

// Screnns imports
import Home from './src/screens/Home';
import Signup from './src/screens/Auth/Signup';
import Signin from './src/screens/Auth/Signin';
import ShoppingCart from './src/screens/ShoppingCart';
import PaymentConfirmation from './src/screens/PaymentConfirmation';
import Profile from './src/screens/Profile';

// Services
import { getActualUser } from './src/services/BasicAuthService';
import { Auth } from '@firebase/auth';

// Context import
import { ShoppingCartProvider } from './shoppingCartContext';

const Stack: any = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Root() {
  return (
    <>
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (true) {
            case route.name === 'Home':
              iconName = 'home-outline';
              break;
            case route.name === 'Details':
              iconName = 'list-outline';
              break;
            case route.name === 'ShoppingCart':
              iconName = 'cart-outline';
              break;
            case route.name === 'Profile':
              iconName = 'person-outline'
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
       })}
      >
        <Tab.Screen  name='Home' component={Home} options={{ headerShown: false, unmountOnBlur: true }} />
        <Tab.Screen  name='ShoppingCart' component={ShoppingCart} options={{ headerShown: false, unmountOnBlur: true }} />
        <Tab.Screen  name='Profile' component={Profile} options={{ headerShown: false, unmountOnBlur: true }} />
      </Tab.Navigator>
    </>
  ) 
}

export default function App() {
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let user: Auth = await getActualUser();

      if (user.currentUser) {
        setUserExist(true);
      } else {
        setUserExist(false);
      }
    })();
  }, [userExist]);

  return (
    <>
      <NavigationContainer>
        <ShoppingCartProvider>
          {
            userExist ? (
              <Stack.Navigator>
                <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name='Root' component={Root} options={{ headerShown: false }} />
                <Stack.Screen  name='Details' component={Details} options={{ headerShown: false }} />
                <Stack.Screen  name='PaymentConfirmed' component={PaymentConfirmation} options={{ headerShown: false }} />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name='Signin' component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name='Root' component={Root} options={{ headerShown: false }} />
                <Stack.Screen  name='Details' component={Details} options={{ headerShown: false }} />
                <Stack.Screen  name='PaymentConfirmed' component={PaymentConfirmation} options={{ headerShown: false }} />
              </Stack.Navigator>
            )
          }
        </ShoppingCartProvider>
      </NavigationContainer>
    </>
  );
}