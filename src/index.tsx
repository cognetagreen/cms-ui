import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Services/Hooks/UseAuth';
import { CustomerOptionsProvider } from './Context/CustomerOptionsContext';
import { SelectedCustomerIDProvider } from './Context/SelectedCustomerIDContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <CustomerOptionsProvider>
            <SelectedCustomerIDProvider>
              <App />
            </SelectedCustomerIDProvider>
          </CustomerOptionsProvider>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
