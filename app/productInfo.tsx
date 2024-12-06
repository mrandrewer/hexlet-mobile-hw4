import React from "react";
import { Image } from "expo-image"
import { View, Text, StyleSheet} from "react-native";

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

interface ProductProps {
  name: string,
  image: string,
  price: number,
  description: string,
};

const ProductInfo = ({ name, image, price, description}: ProductProps) => {
  return(
    <View style={styles.outContainer}>
      <Image style={styles.image} source={image}></Image>
      <Text style={styles.header}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text>{description}</Text>
    </View>
  );
};

export default ProductInfo;