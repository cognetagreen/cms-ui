import axios from 'axios';

const GeneratorTableAPI  = async (searchTag : Object, timeWindow : {startTs:Number, endTs:Number, aggregate:string}) => {
    const BASE_URL = "http://localhost:7001/api";

    const token = localStorage.getItem("token");
    // const customerID = localStorage.getItem("SelectedCustomerId");

    if(!token) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : token,
            "searchTag" : searchTag,
            "timeWindow" : timeWindow,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getGeneratorTableData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default GeneratorTableAPI;