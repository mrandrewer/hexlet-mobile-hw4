import axios from "axios";
import Product from "../model/Product";

export default class ProductsDataProvider {
  productsUrl: string;

  constructor(productsUrl:string){
    this.productsUrl = productsUrl;
  }

  public async get(): Promise<Product[]> {
    const response = await axios.get(this.productsUrl);
    if (response.status !== 200) {
      console.log("Failed to refresh data");
      return [];
    }
    const result: Product[] = [];
    for (const record of response.data) {
      const product: Product = {
        id: record.id,
        title: record.title,
        price: record.price,
        description: record.description,
        image: record.image
      };
      result.push(product);
    }
    return result;
  }

}