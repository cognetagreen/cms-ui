import axios from 'axios';

const LatestValueCardAPI  = async (deviceLabel : string, telemetry : string, title : string) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "deviceLabel" : deviceLabel,
            "telemetry" : telemetry,
            "title" : title,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getLatestValueCardData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default LatestValueCardAPI;