import React from "react";
import { Tabs } from 'expo-router';
import { Image} from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
          title: 'Товары',
          tabBarIcon: ({size, focused }) => {
            return (
              <Image
                style={{ width: size, height: size, opacity: focused ? 1 : 0.5 }}
                source={ require("../../assets/images/shop.png") }
              />
            );
          }
        }} />
      <Tabs.Screen
        name="cart"
        options={{ 
          title: 'Корзина',
          tabBarIcon: ({size, focused }) => {
            return (
              <Image
                style={{ width: size, height: size, opacity: focused ? 1 : 0.5 }}
                source={ require("../../assets/images/cart.png") }
              />
            );
          }
        }} />
    </Tabs>
  );
}
