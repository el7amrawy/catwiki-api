import axios from "axios";

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

  async show(name: string): Promise<Object> {
    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${name}&limit=1`
      );
      const breed = res.data[0];

      if (res.data.length) {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}&limit=1`
        );
        const image: Object = res.data[0];
        return { ...breed, image };
      } else {
        throw new Error("breed not found");
      }
    } catch (err) {
      throw new Error(`failed to get breed ==> ${err}`);
    }
  }

  async showImages(id: string, n: number): Promise<Object[]> {
    try {
      const res = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=${n}`
      );
      if (res.data.length) {
        const images = res.data;

        return images;
      } else {
        throw new Error("couldn't find images");
      }
    } catch (err) {
      throw new Error("couldn't get images");
    }
  }
}

export { Breeds };
