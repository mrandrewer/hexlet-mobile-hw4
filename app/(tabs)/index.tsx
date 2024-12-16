import { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { ProductRepositoryContext } from "../ProductRepositoryContext";
import Product from "@/model/Product";
import ProductInfo from "../productInfo";
import { CartItemRepositoryContext } from "../CartItemRepositoryContext";

export default function Index() {
  const productRepository = useContext(ProductRepositoryContext);
  const cartItemRepository = useContext(CartItemRepositoryContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function setup(refresh = false) {
    try{
      setIsRefreshing(true);
      if (refresh) {
        await productRepository.refresh();
      }
      const result = await productRepository.getAll();
      setProducts(result);
      setIsRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function addToCart(product:Product) {
    await cartItemRepository.addItem(product)
  }

  useEffect(() => {
    setup();
    if (products.length == 0) {
      setup(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductInfo product={item} addBtnClick={addToCart}/>}
        keyExtractor={({id}) => `${id}`}
        style={styles.scrollView}
        refreshing={isRefreshing}
        onRefresh={()=>{
          setup(true);
        }}
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