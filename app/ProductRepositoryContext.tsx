import ProductRepository from "@/data/ProductRepository";
import { useSQLiteContext } from "expo-sqlite";
import React, { useContext } from "react";
import ApiUrlContext from "./ApiUrlContext";
import ProductsDataProvider from "@/data/ProductsDataProvider";

const ProductRepositoryContext = React.createContext<ProductRepository>({} as ProductRepository);
const { Provider } = ProductRepositoryContext;

const ProductRepositoryProvider = (props: { children: any | undefined }) => {
    const db = useSQLiteContext();
    const apiURL = useContext(ApiUrlContext);
    var repository = new ProductRepository(db, new ProductsDataProvider(apiURL.url));
    return (
        <Provider value={repository}>
            {props.children}
        </Provider>
    );
}

export { ProductRepositoryContext, ProductRepositoryProvider };