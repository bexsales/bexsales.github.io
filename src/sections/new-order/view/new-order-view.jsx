import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

// import PropTypes from 'prop-types';
import { useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Stack, 
  Table,
  Paper,  
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import ProductPopupModal from '../new-order-product-popup';
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

  const [orderLine, setOrderLine] = useState([]);

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

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

  const handleSelectedProduct = (product) => {
    console.log('Adding order line')
    console.log(product)
    setOrderLine([...orderLine, {
      id: product.id,
      name: product.name,
      default_code: product.default_code,
      category: product.category,
      type: product.type,
      standard_price: product.standard_price,
      lst_price: product.lst_price,
      invoice_policy: product.invoice_policy,
      description_sale: product.description_sale,
      sale_ok: product.sale_ok,
      purchase_ok: product.purchase_ok,
      sales_count: product.sales_count,
      product_uom_qty: 1
    }]);
  }; 

  const handleCreateOrder = () => {
    setLoading(true); // Set loading to true when authentication process starts
    console.log('Creating an order')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=post&resource=orders`
    console.log(requestUrl);
    console.log(orderLine)
    const orderLinePrepped = orderLine.map(line => ({
      product_id: line.id,
      product_uom_qty: line.product_uom_qty
    }));
    console.log(orderLinePrepped)
    const requestBody = {
      order: {
        partner_id: partner.id,
        order_line: orderLinePrepped
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
      <IconButton>
        <ProductPopupModal onSelect={handleSelectedProduct}/>
      </IconButton>
      <div style={{ margin: '16px 0' }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Default Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>List Price</TableCell>
              <TableCell>Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLine.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.default_code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatToDollars(item.lst_price)}</TableCell>
                <TableCell>{item.product_uom_qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
