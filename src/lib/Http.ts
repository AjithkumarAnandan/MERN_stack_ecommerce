import axios, { AxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";
import { userToken } from "./userToken";

// Dynamic HTTP Class
export class Http {
    static async doGet<T>(url: string): Promise<T> {
        const token = userToken();
        if (!token) {
            redirect('/login')
        }
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get<T>(url, config);
            return response.data;
        } catch (error) {
            console.error("HTTP GET request failed", error);
            throw error;
        }
    }
}
