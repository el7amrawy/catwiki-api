import axios from "axios";

class Breeds {
  async index() {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/breeds/");
      const data = res.data;

      return data;
    } catch (err) {
      new Error("failed to get data");
    }
  }
}

export { Breeds };
