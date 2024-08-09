import axios from 'axios';

const BASE_URL = "http://localhost:7001/api";

const GetCustomersAPI  = async (textSearch : string, jwt : string) => {
    if(!jwt) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : jwt,
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

const GetCustomerAPI  = async (customerID : string, jwt : string) => {
    if(!jwt) {
        throw new Error("JWT not found!")
    }else {
        const body = {
            "token" : jwt,
            "checkID" : customerID,
        };
        try {
            const response = await axios.post(`${BASE_URL}/v1/getCustomer/${customerID}`, body);
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export {GetCustomersAPI, GetCustomerAPI};