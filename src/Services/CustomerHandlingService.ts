// src/Services/CustomerHandlingService.ts

import GetCustomersAPI from '../api/GetCustomersAPI';
import { Customer } from '../Context/CustomerOptionsContext';

const CustomerHandlingService = async (textSearch: string, setCustomerOptions: (customers: Customer[]) => void, setSelectedCustomerID : (id: string) => void) => {
  try {
    const response = await GetCustomersAPI(textSearch);
    if (response.length > 0) {
      setCustomerOptions(response);
      setSelectedCustomerID(response[0].value);
      return response;
    }
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
};

export default CustomerHandlingService;
