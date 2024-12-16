import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
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
        renderItem={({item}) => <CartItemInfo item={item} />}
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