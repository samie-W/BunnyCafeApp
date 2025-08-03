// BottomNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Your screens
import Homepage from './Homepage';
import TypeDetail from './TypeDetail';
import Cart from './Cart';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import Settings from './Settings';
import NotificationSettings from './NotificationSettings';
import HelpSupport from './HelpSupport';
import AboutApp from './AboutApp';
import Payment from './Payment';
import ConfirmOrder from './ConfirmOrder';
import TrackOrder from './TrackOrder';
import ThemeScreen from './ThemeScreen';
import PrivacySecurityScreen from './PrivacySecurityScreen';
import ChangePassword from './ChangePassword';
import PrivacyPolicy from './PrivacyPolicy';
import SendMessage from './SendMessage';
import FAQs from './FAQs';
import TermsAndConditions from './TermsAndConditions';
import OrderHistory from './OrderHistory';
import FavoriteDrinks from './FavoriteDrinks';
// ... import all other "main app" screens

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Details" component={TypeDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
      <Stack.Screen name="PrivacySecurityScreen" component={PrivacySecurityScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="SendMessage" component={SendMessage} />
      <Stack.Screen name="FAQs" component={FAQs} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="FavoriteDrinks" component={FavoriteDrinks} />
     




    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteDrinks" component={FavoriteDrinks} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default function BottomNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="heart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="shopping-cart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
