import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import ApiUrlContext from "./ApiUrlContext";

export default function RootLayout() {
  const apiURL = 'https://fakestoreapi.com/products';

  return (
    <SQLiteProvider databaseName="test.db">
      <ApiUrlContext.Provider value={{ url: apiURL }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ApiUrlContext.Provider>
    </SQLiteProvider>
  );
}
