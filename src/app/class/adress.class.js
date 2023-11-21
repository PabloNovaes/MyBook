import axios from "../../../services/axios/axios.js";

export class Adress {
  district;
  street;
  number;
  city;
  cep;
  uf;
  /**
   * @param {string} district
   * @param {string} street
   * @param {string} city
   * @param {string} cep
   * @param {int} number
   * @param {string} uf
   *
   */
  constructor(street, district, cep, number, city, uf) {
    this.district = district;
    this.street = street;
    this.number = number;
    this.city = city;
    this.cep = cep;
    this.uf = uf;
  }

  async getAdress(renderAdresses) {
    try {
      const request = axios.get("/adress/handle");
      const response = await request;

      const adresses = response.data.adresses;

      if (!renderAdresses) return adresses;

      const handleUserAdresses = async () => {
        adresses.forEach((adress) => renderAdresses(adress));
      };

      return handleUserAdresses();
    } catch (error) {
      return error;
    }
  }

  async registerNewAdress(adress) {
    try {
      JSON.stringify(adress);

      const request = await axios.post("/adress/create", adress);
      const response = await request;

      return response;
    } catch (error) {
      return error;
    }
  }
}
