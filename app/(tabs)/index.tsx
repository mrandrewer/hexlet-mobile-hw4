import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import ApiUrlContext from "../ApiUrlContext";
import Product from "@/model/Product";
import ProductRepository from "@/data/ProductRepository";
import ProductsDataProvider from "@/data/ProductsDataProvider";
import ProductInfo from "../productInfo";

export default function Index() {
  const db = useSQLiteContext();
  const apiURL = useContext(ApiUrlContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function setup(refresh = false) {
    try{
      setIsRefreshing(true);
      console.log(apiURL);
      var repository = new ProductRepository(db, new ProductsDataProvider(apiURL.url));
      if(refresh) {
        await repository.refresh();
      }
      const result = await repository.getAll();
      setProducts(result);
      setIsRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductInfo id={item.id} title={item.title} description={item.description} image={item.image}  price={item.price}/>}
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