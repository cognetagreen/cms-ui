import axios from 'axios';

const GetCustomersAPI  = async (textSearch : string) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getCustomers`, body);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export default GetCustomersAPI;