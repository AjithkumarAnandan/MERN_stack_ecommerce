import axios from "axios";
import Cookies from "js-cookie";

let token: string | null = null;

const config = () => {
  token = Cookies.get('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
};

export class Http {
  static async doGet(url: string) {
    return await axios.get(url, config());
  }

  static async doPost(url: string, payload: any) {
    return await axios.post(url, payload, config());
  }
}
