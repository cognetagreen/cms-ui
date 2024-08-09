import axios from 'axios';

const ColumnLineAPI  = async (textSearch : string, type : Object) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "textSearch" : textSearch,
            "type" : type,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getColumnLine`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default ColumnLineAPI;