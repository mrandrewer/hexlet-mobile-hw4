import React from "react";
import { Image } from "expo-image"
import { View, Text, StyleSheet} from "react-native";
import Product from "../model/Product";

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#EAEAEA"
  },
  image: {
    width: 100,
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

const ProductInfo = ({ id, title, image, price, description}: Product) => {
  return(
    <View style={styles.outContainer}>
      <Image style={styles.image} source={image}></Image>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default ProductInfo;