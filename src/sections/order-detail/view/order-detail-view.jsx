import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Grid,
  Chip,
  Stack, 
  Table,
  Paper,  
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer
} from '@mui/material';

import Iconify from 'src/components/iconify';

import ProductPopupModal from '../edit-product-popup';
import SendOrderPopupModal from '../send-order-popup';
import CustomerPopupModal from '../edit-customer-popup';
import DeliveryPopupModal from '../edit-delivery-popup';
import CancelOrderPopupModal from '../cancel-order-popup';

// ----------------------------------------------------------------------

export default function OrderDetailView({
  orderId,
}) {

  const [loading, setLoading] = useState(false);

  const [orderName, setOrderName] = useState('');
  
  const [orderState, setOrderState] = useState('');

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

  const [delivery, setDelivery] = useState({
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

  const [deletedOrderLine, setDeletedOrderLine] = useState([]);

  const [productUnitPrices, setProductUnitPrices] = useState({})
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalProductQty, setTotalProductQty] = useState(0);

  const [notes, setNotes] = useState('');
  const [clientOrderRef, setClientOrderRef] = useState('');

  useEffect(() => {
    // Fetch order details from the API
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancelOrder = () => {
    handleSaveOrder(true, false);
  }

  const handleSendOrder = () => {
    handleSaveOrder(false, true);
  }

  const handleGetOrderTotals = (_partnerId, _orderLine) => {
    console.log('Fetching order totals')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`
    console.log(requestUrl);
    const orderLinePrepped = orderLine.map(line => ({
      product_id: line[2].id,
      product_uom_qty: line[2].product_uom_qty
    }));
    const requestBody = {
      partner_id: partner.id,
      order_line: orderLinePrepped
    };
    console.log('Request body', requestBody);
    axios.post(requestUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data);
      setProductUnitPrices(response.data.result.product_prices)
      setSubTotal(response.data.result.subtotal)
      setTotal(response.data.result.total)
    })
    .catch(error => {
      console.error('Error fetching order totals:', error);
    });    
  };

  useEffect(() => {
    handleGetOrderTotals(partner, orderLine);
    const _totalProductQty = orderLine.reduce((acc, curr) => acc + curr[2].product_uom_qty, 0);
    setTotalProductQty(_totalProductQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner, orderLine]); 

  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleChangeClientOrderRef = (event) => {
    setClientOrderRef(event.target.value);
  };

  const handleSaveOrder = (cancel, send) => {
    setLoading(true); // Set loading to true when authentication process starts
    console.log('Saving Order')
    let action = 'post';
    if ( cancel === true ) {
      action = 'cancel';
    }
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=${action}&resource=orders`
    console.log(requestUrl);
    console.log(orderLine);

    const _preparedOrderLine = orderLine.map((ol) => [
      ol[0],
      ol[1],
      {
        product_id: ol[2].id,
        product_uom_qty: ol[2].product_uom_qty
      }
    ]);

    const _preparedDeletedOrderLine = deletedOrderLine.map((dol) => [
      2,
      dol[1],
      {}
    ]);

    const _combinedOrderLines = _preparedOrderLine.concat(_preparedDeletedOrderLine);

    const requestBody = {
      order: {
        id: parseInt(orderId, 10),
        partner_id: partner.id,
        order_line: _combinedOrderLines,
        x_studio_notes: notes,
        client_order_ref: clientOrderRef,
        // Conditionally include is_send if send is true
        ...(send && { is_send: true }),
        // Include delivery_id if it exists
        ...(delivery.id && { partner_shipping_id: delivery.id })
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
      console.error('Error saving order:', error);
    });
  };

  const handleDelete = (index, item, property) => {
    if (index < 0 || index >= orderLine.length) {
      // Check if n is a valid index
      return;
    }
    const toDelete = orderLine.filter((_, ind) => ind === index);
    
    if ( toDelete[0][0] !== 0 ) {
      console.log('Adding line to delete queue', toDelete);
      setDeletedOrderLine(deletedOrderLine.concat(toDelete));
    }

    const newOrderLine = orderLine.filter((_, ind) => ind !== index);
    setOrderLine(newOrderLine);

  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedOrderLine = orderLine.map((item, idx) => {
      if (idx === index) {
        console.log('handle qty change', item)
        const blacklist = ['consu', 'service']
        if ( (item[2].qty_available < newQuantity) && (!blacklist.includes(item[2].type))) {
          alert('Quantity available is insufficient.');
          return item;
        }
        return [item[0], item[1], { ...item[2], product_uom_qty: newQuantity !== 0 ? Number(newQuantity) : 0 }];
      }
      return item;
    });
    setOrderLine(updatedOrderLine);
  };

  // Format amount to dollars
  const formatToDollars = (amount) => {
    if(amount){
      return `$${amount.toFixed(2)}`;
    }
    return ''
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
      setOrderName(response.data.data.name);
      setPartner(response.data.data.customer_id);
      setDelivery(response.data.data.partner_shipping_id);
      setNotes(response.data.data.x_studio_notes);
      setClientOrderRef(response.data.data.client_order_ref ? response.data.data.client_order_ref : '');
      const _orderLinesPrepped = response.data.data.order_line.map((line) => 
        [
          1, // 1 means edit
          line.id, 
          {
            line_id: line.id,
            id: line.product_id.id,
            name: line.name,
            product_uom_qty: line.product_uom_qty,
            attributes: line.product_id.attributes.map((i) => `${i.attribute}:${i.name}`),
            qty_available: line.product_id.qty_available,
            type: line.product_id.type
          }
        ]
      )
      console.log(_orderLinesPrepped)
      setOrderLine(_orderLinesPrepped);
      setSubTotal(response.data.data.amount_untaxed);
      setTotal(response.data.data.amount_total);
      setOrderState(response.data.data.state);
    })
    .catch(error => {
      console.error('Error fetching order details:', error);
    });
  };

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
    });
  
    // Clear the delivery information when the partner changes
    setDelivery({
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
  }; 

  const handleSelectedDelivery = (_delivery) => {
    console.log('Setting order partner')
    console.log(_delivery)
    setDelivery({
      id: _delivery.id,
      name: _delivery.name,
      street: _delivery.street,
      city: _delivery.city,
      state: _delivery.state,
      country: _delivery.country,
      zip: _delivery.zip,
      phone: _delivery.phone,
      mobile: _delivery.mobile,
      email: _delivery.email
    })
  }; 

  const handleSelectedProduct = (product) => {
    console.log('Adding order line')
    console.log(product)
    const blacklist = ['consu', 'service']
    if ( (product.qty_available < 1) && (!blacklist.includes(product.type)) ) {
      alert('Cannot add product lines with 0 qty available');
    } else {
      setOrderLine([...orderLine,[0, 0, {
        id: product.id,
        name: `[${product.default_code}] ${product.name}`,
        product_uom_qty: 1,
        attributes: product.attributes,
        qty_available: product.qty_available
      }]]);
    }
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
      {partner.name && (
        <Stack spacing={3} direction="row" alignItems="center">
          <TextField 
            fullWidth
            name="partner_shipping_id" 
            label="Delivery Address"
            value={delivery.name}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton>
                  <DeliveryPopupModal 
                    onSelect={handleSelectedDelivery}
                    filterParentContactOption={partner.id}/>
                </IconButton>
              )
            }}
          />
        </Stack>
      )}
      {/* Display partner address and phone */}
      {delivery.name && ( // Display error message if authError state is not null
        <>
          <div style={{ margin: '16px 0' }} />
          <Typography variant="body1" fontWeight="bold">Address:</Typography>
          <Typography variant="body1">{delivery.street}</Typography>
          <Typography variant="body1">{delivery.city} {partner.state}</Typography>
          <Typography variant="body1">{delivery.country} {partner.zip}</Typography>
          <Typography variant="body1"><b>Phone:</b> {delivery.phone}</Typography>
          <Typography variant="body1"><b>Mobile:</b> {delivery.mobile}</Typography>
          <Typography variant="body1"><b>Email:</b> {delivery.email}</Typography>
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
              <TableCell>Product</TableCell>
              <TableCell>Attributes</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Qty Available</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderLine.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item[2].name}</TableCell>
                <TableCell>
                  {item[2].attributes.map((attribute, ind) => (
                    <Chip key={ind} label={attribute} variant="outlined" />
                  ))}
                </TableCell>
                <TableCell>{formatToDollars(productUnitPrices[item[2].id])}</TableCell>
                <TableCell>{item[2].qty_available}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    style={{ minWidth: '100px' }}
                    value={item[2].product_uom_qty !== 0 ? item[2].product_uom_qty : ''}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>{formatToDollars(productUnitPrices[item[2].id] * item[2].product_uom_qty)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(index)}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: '16px 0' }} />
      <Typography variant="body1" fontWeight="bold">Total Product Qty: {totalProductQty}</Typography>
      <Typography variant="body1" fontWeight="bold">Subtotal: {formatToDollars(subTotal)}</Typography>
      <Typography variant="body1" fontWeight="bold">Total: {formatToDollars(total)}</Typography>
      <div style={{ margin: '16px 0' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Notes"
            value={notes}
            multiline
            fullWidth
            rows={4} // Number of rows to display
            onChange={handleChangeNotes}
          />
        </Grid>
      </Grid>
      <div style={{ margin: '16px 0' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="PO Number"
            value={clientOrderRef}
            fullWidth
            onChange={handleChangeClientOrderRef}
          />
        </Grid>
      </Grid> 
      <div style={{ margin: '16px 0' }} />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSaveOrder}
        loading={loading}
      >
        Save
      </LoadingButton>     
    </>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Order {orderName}   
          <Chip
            label={orderState}  // Directly use orderState for the label
            color={orderState === 'cancel' ? 'danger' : 'primary'}  // Customize the color based on the state
            variant="outlined"  // Optional: Change to solid if you prefer
            style={{ marginLeft: '10px' }}
          />
        </Typography>
        {/* Cancel Order Button */}
        {(orderState === 'draft' || orderState === 'sent') && (
          <Stack direction="row" spacing={2}>
            <CancelOrderPopupModal 
              handleCancelOrder={handleCancelOrder}
            />
            <SendOrderPopupModal 
              handleSendOrder={handleSendOrder}
            />
          </Stack>
        )}
      </Stack>
      {renderForm}
      <Card/>
    </Container>
  );
}

OrderDetailView.propTypes = {
  orderId: PropTypes.any,
};
