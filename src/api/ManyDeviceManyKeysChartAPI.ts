import axios from 'axios';

const ManyDeviceManyKeysChartAPI  = async (searchTag : Object[], timeWindow : {startTs:Number, endTs:Number, aggregate:string, interval: number}, LastValue? : string) => {
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
        if (LastValue) {
            try {
                const response = await axios.post(`${BASE_URL}/v1/GetManyDeviceManyKeysChartData/${LastValue}`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        } else {
            
            try {
                const response = await axios.post(`${BASE_URL}/v1/GetManyDeviceManyKeysChartData`, body);
                return response;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default ManyDeviceManyKeysChartAPI;