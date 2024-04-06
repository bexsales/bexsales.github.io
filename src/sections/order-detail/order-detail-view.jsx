import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// ----------------------------------------------------------------------

export default function OrderDetailView({
  orderId,
}) {

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState({
    name: '',
    customer_id: {
      name: ''
    } 
  });

  useEffect(() => {
    // Fetch order details from the API
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setLoading(true); // Set loading to true when authentication process starts
    try {
      // Send request to Strapi for authentication
      // const response = await axios.post(`${config.baseURL}/auth/local`, {
      //   identifier: formData.identifier, // Replace with actual email
      //   password: formData.password, // Replace with actual password
      // });

      // Handle successful authentication
      // console.log('Authentication successful', response.data);
      // Cookies.set('jwt', response.data.jwt, { expires: 7 }); // Expires in 7 days
      // // Redirect user to dashboard or any other protected route
      // router.push('/');
    } catch (error) {
      // Handle authentication error
      console.error('Authentication error', error);
      // Optionally, display error message to user
      // setAuthError('Invalid email or password.')
    } finally {
      setLoading(false); // Set loading to false regardless of authentication success or failure
    }
  };

  const fetchOrder = () => {
    console.log('Fetching Order Details')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=orders&order_id=${orderId}`
    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data.data);
      setOrder(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching order details:', error);
    });
  };
  
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField 
          name="customer_id" 
          label="Customer"
          value={order.customer_id.name}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Save
      </LoadingButton>     
    </>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Order {order.name}</Typography>
      </Stack>
      {renderForm}
      <Card/>
    </Container>
  );
}

OrderDetailView.propTypes = {
  orderId: PropTypes.any,
};
