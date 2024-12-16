import React from "react";
import { Image } from "expo-image"
import { View, Text, StyleSheet} from "react-native";
import CartItem from "@/model/CartItem";

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#EAEAEA"
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: 100,
    height: '100%',
  },
  price: {
    fontSize: 32,
    fontWeight: "400"
  },  
  header: {
    fontSize: 24,
    fontWeight: "200"
  }
});

const CartItemInfo = ({ id, title, image, price, amount}: CartItem) => {
  return(
    <View style={styles.outContainer}>
      <Image
        contentFit={'cover'}
        style={styles.image}
        source={{ uri: image }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{title}</Text>
        <Text>{price}</Text>
        <Text>{amount}</Text>
        <Text style={styles.price}>Total: {price * amount}</Text>
      </View>
    </View>
  );
};

export default CartItemInfo;