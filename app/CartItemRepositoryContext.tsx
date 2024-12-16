import CartItemRepository from "@/data/CartRepository";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";

const CartItemRepositoryContext = React.createContext<CartItemRepository>({} as CartItemRepository);
const { Provider } = CartItemRepositoryContext;

const CartItemRepositoryProvider = (props: { children: any | undefined }) => {
    const db = useSQLiteContext();
    var repository = new CartItemRepository(db);
    return (
        <Provider value={repository}>
            {props.children}
        </Provider>
    );}

export { CartItemRepositoryContext, CartItemRepositoryProvider };