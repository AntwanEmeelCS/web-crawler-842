import environment from "./environment.js";

export default class Utils {
  static async fetchData(subURL) {
    try {
      const response = await fetch(environment.base_url + subURL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }
}
