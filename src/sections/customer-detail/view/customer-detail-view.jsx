import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export default function CustomerDetailView({
  customerId,
}) {

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');

  const [street, setStreet] = useState('');
  
  const [city, setCity] = useState('');

  const [state, setState] = useState('');

  const [country, setCountry] = useState('');

  const [zip, setZip] = useState('');

  const [phone, setPhone] = useState('');

  const [mobile, setMobile] = useState('');

  const [email, setEmail] = useState('');

  const [isBrickAndMortar, setIsBrickAndMortar] = useState(false);

  const [isSellsAtRoadshows, setIsSellsAtRoadshows] = useState(false);


  useEffect(() => {
    // Fetch customer details from the API
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const handleChangeIsBrickAndMortar = (event) => {
    setIsBrickAndMortar(event.target.checked);
  };

  const handleChangeSellsAtRoadshows = (event) => {
    setIsSellsAtRoadshows(event.target.checked);
  };

  const handleSaveCustomer = () => {
    setLoading(true); // Set loading to true when authentication process starts
    console.log('Saving Customer')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=post&resource=customers`
    console.log(requestUrl);
    const requestBody = {
      partner: {
        id: parseInt(customerId, 10),
        is_brick_and_mortar: isBrickAndMortar,
        is_sells_at_roadshows: isSellsAtRoadshows
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
      if ( response.data.result.success === false ) {
        alert(response.data.result.message);
      } else {
        window.location.reload();
      }
    })
    .catch(error => {
      setLoading(false)
      console.error('Error saving customer:', error);
    });
  };

  const fetchCustomer = () => {
    console.log('Fetching Customer Details')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=customers&partner_id=${customerId}`
    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data.data);
      setName(response.data.data.name);
      setStreet(response.data.data.street);
      setCity(response.data.data.city);
      setState(response.data.data.state_id.name);
      setCountry(response.data.data.country_id.name);
      setZip(response.data.data.zip);
      setPhone(response.data.data.phone);
      setMobile(response.data.data.mobile);
      setEmail(response.data.data.email);
      setIsBrickAndMortar(response.data.data.is_brick_and_mortar);
      setIsSellsAtRoadshows(response.data.data.is_sells_at_roadshows);
    })
    .catch(error => {
      console.error('Error fetching customer details:', error);
    });
  };

  const renderForm = (
    <Grid container spacing={3}>

      {/* LEFT COLUMN — Address Info */}
      <Grid item xs={12} md={6}>
        <Typography variant="body1" fontWeight="bold">Address:</Typography>
        <Typography variant="body1">{street}</Typography>
        <Typography variant="body1">
          {city} {state}
        </Typography>
        <Typography variant="body1">
          {country} {zip}
        </Typography>
        <Typography variant="body1"><b>Phone:</b> {phone}</Typography>
        <Typography variant="body1"><b>Mobile:</b> {mobile}</Typography>
        <Typography variant="body1"><b>Email:</b> {email}</Typography>
      </Grid>

      {/* RIGHT COLUMN — Boolean Fields */}
      <Grid item xs={12} md={6}>
        <Stack direction="column" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isBrickAndMortar}
                onChange={handleChangeIsBrickAndMortar}
              />
            }
            label="Brick and Mortar Store"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isSellsAtRoadshows}
                onChange={handleChangeSellsAtRoadshows}
              />
            }
            label="Sells at Roadshows"
          />
        </Stack>
      </Grid>

      {/* FULL-WIDTH Save Button */}
      <Grid item xs={12}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleSaveCustomer}
          loading={loading}
        >
          Save
        </LoadingButton>
      </Grid>

    </Grid>
  );

    return (
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">{name}</Typography>
        </Stack>
        {renderForm}
        <Card/>
      </Container>
    );
  }

CustomerDetailView.propTypes = {
  customerId: PropTypes.any,
};
