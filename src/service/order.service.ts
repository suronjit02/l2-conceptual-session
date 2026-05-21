import path from "path";
import fs from "fs/promises";
import type { Order } from "../types";

const DB_PATH = path.join(process.cwd(), "db", "data.json");
// console.log(DB_PATH);

class OrderService {
  // readData and writeData
  private async readData(): Promise<Order[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }

    // const data = await fs.readFile(DB_PATH, "utf-8");

    // console.log("DB PATH:", DB_PATH);
    // console.log("RAW DATA:", data);

    // return JSON.parse(data);
  }

  private async writeData(data: Order[]) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  //   Get
  async get() {
    const data = await this.readData();
    return data;
  }

  //   Get by Id
  async getById(id: string) {
    const data = await this.readData();
    return data.find((order) => order.id === id) || null;
  }

  //   Create
  async create(order: Omit<Order, "id">) {
    const data = await this.readData();

    const newOrder: Order = {
      ...order,
      id: String(Math.random() * 100),
    };

    data.push(newOrder);

    await this.writeData(data);
  }
}

const orderService = new OrderService();

// const run = async () => {
//   await orderService.create({
//     customer: "Messi",
//     food: "kacchi",
//     price: 320,
//     quantity: 2,
//   });
// };

// run();
