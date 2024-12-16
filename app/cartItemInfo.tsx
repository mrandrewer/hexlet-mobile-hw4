import React from "react";
import { Image } from "expo-image"
import { View, Text, StyleSheet} from "react-native";
import CartItem from "@/model/CartItem";

const styles = StyleSheet.create({
  outContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    backgroundColor: "#EAEAEA"
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: '100%',
    verticalAlign: "top",
    alignSelf: "flex-start" 
  },
  text: {
    fontSize: 12,
    fontWeight: "200"
  },
  price: {
    fontSize: 14,
    fontWeight: "400"
  },  
  header: {
    fontSize: 18,
    fontWeight: "400"
  }
});

const CartItemInfo = ({ item }: { item : CartItem }) => {
  return(
    <View style={styles.outContainer}>
      <Image
        contentFit={'contain'}
        style={styles.image}
        source={{ uri: item.image }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.text}>{item.amount} шт по {item.price}р</Text>
        <Text style={styles.price}>Итого: {item.price * item.amount}р</Text>
      </View>
    </View>
  );
};

export default CartItemInfo;