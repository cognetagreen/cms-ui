import axios from 'axios';

const EnergyYieldAPI  = async (textSearch : string, key : string) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "key" : key,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getEnergyYieldData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default EnergyYieldAPI;