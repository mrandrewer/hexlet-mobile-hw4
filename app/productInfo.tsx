import React from "react";
import { Image } from "expo-image"
import { View, Text, StyleSheet, Button} from "react-native";
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
    width: '100%',
    height: 300,
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

const ProductInfo = ({product, addBtnClick}:{ product: Product, addBtnClick: (product:Product) => void }) => {
  return(
    <View style={styles.outContainer}>
      <Image
        contentFit={'cover'}
        style={styles.image}
        source={{ uri: product.image }}
      />
      <Text style={styles.header}>{product.title}</Text>
      <Text style={styles.price}>{product.price}р</Text>
      <Text>{product.description}</Text>
      <Button onPress={() => addBtnClick(product)} title="Добавить в корзину" />
    </View>
  );
};

export default ProductInfo;