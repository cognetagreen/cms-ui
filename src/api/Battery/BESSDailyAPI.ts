import axios from 'axios';

const BESSDailyAPI  = async (searchTag : Object, timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}) => {
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
            "timeWindow" : timeWindow,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getBESSDailyData`, body);
            return response;
        } catch (error) {
            console.error(error)
        }
    }
}

export default BESSDailyAPI;