import ProductRepository from "@/data/ProductRepository";
import ProductsDataProvider from "@/data/ProductsDataProvider";
import Product from "@/model/Product";
import { useSQLiteContext } from "expo-sqlite";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, FlatList } from "react-native";
import ApiUrlContext from "../ApiUrlContext";
import ProductInfo from "../productInfo";
import CartItem from "@/model/CartItem";
import CartItemRepository from "@/data/CartRepository";
import CartItemInfo from "../cartItemInfo";

export default function Index() {
  const db = useSQLiteContext();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  async function setup() {
    try{
      var repository = new CartItemRepository(db);
      const result = await repository.getAll();
      setCartItems(result);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setup();
  }, []);

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Добавьте товар в корзину чтобы начать покупки!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({item}) => <CartItemInfo id={item.id} title={item.title} description={item.description} image={item.image} price={item.price} amount={item.amount} />}
        keyExtractor={({id}) => `${id}`}
        style={styles.scrollView}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },  
  scrollView: {
    marginHorizontal: 20,
    maxWidth: 300
  },
  text: {
    fontSize: 24,
  },
});