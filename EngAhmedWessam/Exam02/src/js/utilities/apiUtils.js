import environment from "../environment.js";

export default class apiUtils {
  static async fetchData(subURL) {
    try {
      let full_url = environment.base_url + subURL;
      //console.log(full_url);

      const response = await fetch(full_url);

      if (!response.ok) {
        console.log(`HTTP GET error! Status: ${response.status}`);

        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      ("GET Fetch failed:", error);
      console.error("Fetch failed:", error);
    }
  }
  static async postData(subURL, requestBody = {}) {
    try {
      const response = await fetch(environment.base_url + subURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "xRGnhxcXrKuX8hJpeeQE5Rac9b7dyQDpaMs5fWFL",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP POST error! Status: ${response.status}`);
        console.log(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.log("Error Posting data:", error);

      console.error("Error Posting data:", error);
      throw error;
    }
  }
}
