import axios from 'axios';

const PlantCardAPI  = async (searchTag : string, DataLabel : string[]) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "customerID" : customerID,
            "searchTag" : searchTag,
            "DataLabel" : DataLabel
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantCardData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantCardAPI;