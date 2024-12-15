import * as SQLite from 'expo-sqlite';
import Product from '../model/Product';
import ProductsDataProvider from './ProductsDataProvider';

export default class ProductRepository {
  database: SQLite.SQLiteDatabase;
  dataProvider: ProductsDataProvider;

  constructor(db: SQLite.SQLiteDatabase, dataProvider: ProductsDataProvider) {
    this.database = db
    this.dataProvider = dataProvider;
    this.initDB();
  }

  private initDB() {
    this.database.execSync(
      `CREATE TABLE IF NOT EXISTS products (
       id INTEGER PRIMARY KEY NOT NULL,
       title varchar(1000) NOT NULL,
       image varchar(1000),
       price decimal,
       description varchar(4000)
      );`);
  }

  public async getAll(): Promise<Product[]> {
    const allRows:any[] = await this.database.getAllAsync('SELECT * FROM products;');
    const result: Product[] = [];
    for (const row of allRows) {
      result.push({
        id: row.id,
        title: row.title,
        image: row.image,
        price: row.price,
        description: row.description,
      });
    }
    return result;
  }

  public async writeProduct(product:Product) : Promise<void> {
    this.database.runAsync(`
      INSERT OR REPLACE INTO products (id, title, image, price, description)
      VALUES ($id, $title, $image, $price, $description);`,
      {
        $id: product.id,
        $title: product.title,
        $image: product.image,
        $price: product.price,
        $description: product.description
      });
  }

  public async refresh(): Promise<void> {
    const products = await this.dataProvider.get();
    for(const product of products) {
      await this.writeProduct(product);
    }
  }
}