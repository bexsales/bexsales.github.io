import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

// import PropTypes from 'prop-types';
import { useState } from 'react';

import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

import CustomerPopupModal from '../new-order-customer-popup';

// ----------------------------------------------------------------------

export default function NewOrderView() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [partner, setPartner] = useState({
    id: 0,
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
    mobile: '',
    email: ''
  });

  // const [orderLine, setOrderLine] = useState([]);

  // const handleSetPartnerId = () => {
  // };

  // const handleAddProductLine = () => {
  // };

  const handleSelectedCustomer = (customer) => {
    console.log('Setting order partner')
    console.log(customer)
    setPartner({
      id: customer.id,
      name: customer.name,
      street: customer.street,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      zip: customer.zip,
      phone: customer.phone,
      mobile: customer.mobile,
      email: customer.email
    })
  }; 

  const handleCreateOrder = () => {
    setLoading(true); // Set loading to true when authentication process starts
    console.log('Creating an order')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=post&resource=orders`
    console.log(requestUrl);
    const requestBody = {
      order: {
        partner_id: partner.id,
        order_line: []
      }
    };
    console.log('Request body', requestBody);
    axios.post(requestUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data);
      setLoading(false);
      router.push(`/orders/${response.data.result.sale_order_id}`);
    })
    .catch(error => {
      console.error('Error fetching customers:', error);
    });
  };
  
  const renderForm = (
    <>
      <Stack spacing={3} direction="row" alignItems="center">
        <TextField 
          fullWidth
          name="partner_id" 
          label="Customer"
          value={partner.name}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <IconButton>
                <CustomerPopupModal onSelect={handleSelectedCustomer}/>
              </IconButton>
            )
          }}
        />
      </Stack>
      {/* Display partner address and phone */}
      {partner.name && ( // Display error message if authError state is not null
        <>
          <div style={{ margin: '16px 0' }} />
          <Typography variant="body1" fontWeight="bold">Address:</Typography>
          <Typography variant="body1">{partner.street}</Typography>
          <Typography variant="body1">{partner.city} {partner.state}</Typography>
          <Typography variant="body1">{partner.country} {partner.zip}</Typography>
          <Typography variant="body1"><b>Phone:</b> {partner.phone}</Typography>
          <Typography variant="body1"><b>Mobile:</b> {partner.mobile}</Typography>
          <Typography variant="body1"><b>Email:</b> {partner.email}</Typography>
        </>
      )}
      <div style={{ margin: '16px 0' }} />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleCreateOrder}
        loading={loading}
      >
        Create
      </LoadingButton>   
    </>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">New Order</Typography>
      </Stack>
      {renderForm}
      <Card/>
    </Container>
  );
}
