import axios from 'axios';

const LocationMapAPI  = async (searchTag : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "searchTag" : searchTag
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getLocationMapData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default LocationMapAPI;