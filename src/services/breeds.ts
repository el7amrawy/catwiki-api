import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class Breeds {
  async index(n?: number) {
    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/breeds${n ? "?limit=" + n : ""}`
      );
      const data = res.data;
      return data;
    } catch (err) {
      new Error(`failed to get data ==> ${err}`);
    }
  }

  async length(): Promise<number> {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/breeds");
      const length = res.data.length;

      return length;
    } catch (err) {
      throw new Error(`failed to get length ==> ${err}`);
    }
  }
}

export { Breeds };
