import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { ProductRepositoryProvider } from "./ProductRepositoryContext";
import { CartItemRepositoryProvider } from "./CartItemRepositoryContext";
import ApiUrlContext from "./ApiUrlContext";

export default function RootLayout() {
  const apiURL = 'https://fakestoreapi.com/products';



  return (
    <SQLiteProvider databaseName="test.db">
      <ApiUrlContext.Provider value={{ url: apiURL }}>
        <ProductRepositoryProvider>
          <CartItemRepositoryProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </CartItemRepositoryProvider>
        </ProductRepositoryProvider>
      </ApiUrlContext.Provider>
    </SQLiteProvider>
  );
}
