import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies

// import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

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

  const [productUnitPrices, setProductUnitPrices] = useState({})
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalProductQty, setTotalProductQty] = useState(0);

  const [notes, setNotes] = useState('');
  const [clientOrderRef, setClientOrderRef] = useState('');

  const [fileName, setFileName] = useState('');
  const fileReader = new FileReader();
  const fileInputRef = useRef(null);


  function csvToArray(str, delimiter = ",") {
    let headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    headers = headers.map((h) => h.replace('\n', '').replace('\r', ''));
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map( (row) => {
        const values = row.split(delimiter).map((r) => r.replace('\n', '').replace('\r', ''));
        const el = headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
        return el;
    });

    return arr;
  }

  const handleFileUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    fileReader.onload = async (f) => { 
      const csvArray = csvToArray(f.target.result);
      csvArray.pop();
      console.log(csvArray);
      
      const productArr = [];
      
      const promises = csvArray.map((item) => {
        const requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=products&exact_match=true&name=${item.sku}`;
        console.log(requestUrl);
        
        return axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
          }
        })
        .then(response => {
          console.log(response.data.data);
          if (Array.isArray(response.data.data) && response.data.data.length === 0) {
            alert(`There appears to be an issue with your CSV file. Please review and correct it. Product ${item.sku} not found.`);
          } else {
            const product = response.data.data[0]
            product.category = product.categ_id.name;
            product.attributes = product.product_template_attribute_value_ids.map((i) => `${i.attribute}:${i.name}`);
            product.product_uom_qty = Number(item.qty);
            productArr.push(product);
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
      });
  
      // Wait for all promises to complete
      await Promise.all(promises);
  
      // Now you can check the length of the productArr
      console.log(`Total products fetched: ${productArr.length}`);
      if (productArr.length === csvArray.length) {
        console.log('Setting products');
        console.log(productArr);
        productArr.forEach(prod => {
          handleSelectedProduct(prod, prod.product_uom_qty);
        });
      }
      e.target.value = null; 
    };
    fileReader.readAsText(file);
  };

  const handleGetOrderTotals = (_partnerId, _orderLine) => {
    console.log('Fetching order totals')
    const requestUrl = `${config.baseURL}/api-proxy/proxy?method=post&resource=ordertotals`
    console.log(requestUrl);
    const orderLinePrepped = orderLine.map(line => ({
      product_id: line.id,
      product_uom_qty: line.product_uom_qty
    }));
    const requestBody = {
      partner_id: partner.id,
      order_line: orderLinePrepped,
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
    const _totalProductQty = orderLine.reduce((acc, curr) => acc + curr.product_uom_qty, 0);
    setTotalProductQty(_totalProductQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner, orderLine]); 

  const handleDelete = (index, item, property) => {
    if (index < 0 || index >= orderLine.length) {
      // Check if n is a valid index
      return;
    }
    const newOrderLine = orderLine.filter((_, ind) => ind !== index);
    setOrderLine(newOrderLine);
    // Add your logic to delete the item from orderLine using the index, item, or property
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedOrderLine = orderLine.map((item, idx) => {
      if (idx === index) {
        console.log(item)
        console.log(newQuantity)
        const blacklist = ['consu', 'service']
        if ( (item.qty_available < newQuantity) && (!blacklist.includes(item.type))) {
          alert('Quantity available is insufficient.');
          return item;
        }
        return { ...item, product_uom_qty: newQuantity !== 0 ? Number(newQuantity) : 0 };
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

  // add new parameter for checking the quantity because it may come from CSV
  const handleSelectedProduct = (product, qty) => {
    console.log('Adding order line')
    console.log(product)
    const blacklist = ['consu', 'service']
    if ( (product.qty_available < 1) && ((!blacklist.includes(product.type)))) {
      alert(`Cannot add product lines with 0 qty available: SKU ${product.default_code}`);
    } else {
      setOrderLine(prevOrderLine => [
        ...prevOrderLine,
        {
          id: product.id,
          name: product.name,
          default_code: product.default_code,
          category: product.category,
          type: product.type,
          lst_price: product.lst_price,
          invoice_policy: product.invoice_policy,
          description_sale: product.description_sale,
          attributes: product.attributes,
          sale_ok: product.sale_ok,
          purchase_ok: product.purchase_ok,
          sales_count: product.sales_count,
          product_uom_qty: qty || 1,
          qty_available: product.qty_available
        }
      ]);
    }
  };

  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleChangeClientOrderRef = (event) => {
    setClientOrderRef(event.target.value);
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
        order_line: orderLinePrepped,
        x_studio_notes: notes,
        client_order_ref: clientOrderRef,
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
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button variant="contained" color="primary" onClick={handleFileUploadButtonClick}>
        Upload CSV
      </Button>
      {fileName && (
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Selected file: {fileName}
        </Typography>
      )}
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
                <TableCell>[{item.default_code}] {item.name}</TableCell>
                <TableCell>
                  {item.attributes.map((attribute, ind) => (
                    <Chip key={ind} label={attribute} variant="outlined" />
                  ))}
                </TableCell>
                <TableCell>{formatToDollars(productUnitPrices[item.id])}</TableCell>
                <TableCell>{item.qty_available}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    style={{ minWidth: '100px' }}
                    value={item.product_uom_qty !== 0 ? item.product_uom_qty : ''}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>{formatToDollars(productUnitPrices[item.id] * item.product_uom_qty)}</TableCell>
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
