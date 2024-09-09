import axios from 'axios';

const PlantTableAPI  = async (searchTag : Object, textSearch : string) => {
    const BASE_URL = "https://etaflux-api.cogneta.cloud/api";

    const token = localStorage.getItem("token");
    const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "searchTag" : searchTag
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getPlantTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default PlantTableAPI;