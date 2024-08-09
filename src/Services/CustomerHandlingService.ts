// src/Services/CustomerHandlingService.ts

import { jwtDecode } from 'jwt-decode';
import { GetCustomersAPI, GetCustomerAPI } from '../api/GetCustomersAPI';
import { Customer } from '../Context/CustomerOptionsContext';

interface JwtHeader {
  lastName: string;
  customerId: string;
}

const CustomerHandlingService = async (textSearch: string, setCustomerOptions: (customers: Customer[]) => void, setSelectedCustomerID : (id: string) => void) => {
  const jwt = localStorage.getItem("token");
  let authority = "";
  let customerID = ""
  if (!jwt) {
    throw new Error("JWT not found in localStorage");
  }
  try {
    const Decoded : JwtHeader = jwtDecode<JwtHeader>(jwt);
    const {lastName , customerId} = Decoded;
    authority = lastName;
    customerID = customerId;
    
    
  } catch (error) {
    throw new Error("Last Name Not present in JWT")
  }
  
  if (authority === "c_admin") {
    
    try {
      const response = await GetCustomersAPI(textSearch, jwt);
      if (response.length > 0) {
        setCustomerOptions(response);
        setSelectedCustomerID(response[0].value);
        return response;
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  } else if(authority === "c_user") {
    console.log(authority, customerID, 8989898989)
    try {
      const response = await GetCustomerAPI(customerID, jwt);
      setCustomerOptions(response);
      setSelectedCustomerID(response[0].value);
    } catch (error) {
      console.error("Error fetching customer Data: ", error);
    }
  }
};

export default CustomerHandlingService;
