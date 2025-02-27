import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {Platform} from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => <IconSymbol
            name="house.fill"
            color={color}
            style={{ marginRight: Platform.select({ default: 0, android: 8 }) }}
          />,
        }}
      />
      <Tabs.Screen
        name="carousel"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="device"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
