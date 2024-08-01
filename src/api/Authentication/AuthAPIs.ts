import axios from "axios";

// APIs from main server

const BASE_URL = 'https://www.cogneta.cloud/api';

const GetAuthToken = async (username : string, password : string) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
    return response;
}

const GetRefreshedToken = async (refreshToken : string) => {
    const response = await axios.post(`${BASE_URL}/auth/token`, {refreshToken});
    return response;
}

const sendResetPasswordRequest = async (email : string) => {
    const response = await axios.post(`${BASE_URL}/noauth/resetPasswordByEmail`, {email});
    return response;
}

const sendLogOutRequest = async (token : string) => {
    const response = await axios.post(`${BASE_URL}/auth/logout`, null, {headers : {'X-Authorization' :`Bearer ${token}`}});
    return response;
}

export {GetAuthToken, GetRefreshedToken, sendResetPasswordRequest, sendLogOutRequest};