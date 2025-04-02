import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("next-auth.session-token");
const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Ensure token is valid
    },
};
export class HTTP{
static async doGet(url:any){
    const response=await axios.get(url, config)
    return response;
}
}