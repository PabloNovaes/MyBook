import axios from "../../../services/axios/axios.js";

export class ShoppingBag {
  async loadItens() {
    try {
      const response = await axios.get("/bag/get-itens");
      const data = await response.data;

      return data;
    } catch (error) {
      return error;
    }
  }
  async addItem(product) {
    try {
      const response = await axios.post("/bag/add-item", product);
      const item = await response.data;

      return item;
    } catch (error) {
      return error;
    }
  }
  async removeItem({productId}) {
    try {
      const response = await axios.delete(`/bag/remove-item/id=${productId}` );
      const data = await response;
      return data;
    } catch (error) {
      return error;
    }
  }
}
