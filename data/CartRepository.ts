import * as SQLite from 'expo-sqlite';
import CartItem from '@/model/CartItem';
import Product from '@/model/Product';

export default class CartItemRepository {
  database: SQLite.SQLiteDatabase;

  constructor(db: SQLite.SQLiteDatabase) {
    this.database = db
    this.initDB();
  }

  private initDB() {
    this.database.execSync(
      `CREATE TABLE IF NOT EXISTS cart (
       product_id INTEGER UNIQUE NOT NULL REFERENCES products(id),
       amount integer NOT NULL
      );`);
  }

  public async getAll(): Promise<CartItem[]> {
    const allRows:any[] = await this.database
    .getAllAsync(`
      SELECT p.id, p.title, p.image, p.price, p.description, c.amount 
      FROM cart c
        JOIN products p
          ON p.id = c.product_id;
      `);
    const result: CartItem[] = [];
    for (const row of allRows) {
      result.push({
        id: row.id,
        title: row.title,
        image: row.image,
        price: row.price,
        description: row.description,
        amount: row.amount,
      });
    }
    return result;
  }

  public async addItem(productId:number) : Promise<void> {
    const row:any = await this.database
    .getFirstAsync(`
      SELECT c.product_id, c.amount 
      FROM cart c
      WHERE c.product_id = $productId;
      `, {$productId : productId});
    const curAmount = row.amount ?? 0;

    this.database.runAsync(`
      INSERT OR REPLACE INTO cart (product_id, amount)
      VALUES ($id, $amount);`,
      {
        $id: productId,
        $amount: curAmount + 1,
      });
  }

}