import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import config from 'src/config/config';

// ----------------------------------------------------------------------

export default function SearchView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setCustomers([]);
    setProducts([]);
    setOrders([]);

    try {
      const headers = {
        Authorization: `Bearer ${Cookies.get('jwt')}`,
      };

      // Search customers
      const customerUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=customers&name=${query}`;
      const customersRes = await axios.get(customerUrl, { headers });
      setCustomers(customersRes.data.data || []);

      // Search products
      const productUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=products&name=${query}`;
      const productsRes = await axios.get(productUrl, { headers });
      setProducts(productsRes.data.data || []);

      // Search orders
      const orderUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=orders&name=${query}`;
      const ordersRes = await axios.get(orderUrl, { headers });
      setOrders(ordersRes.data.data || []);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
      navigate(`?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const totalResults = customers.length + products.length + orders.length;

  return (
    <Container>
      <Stack spacing={3} mb={5}>
        <Typography variant="h4">Search</Typography>
        <TextField
          fullWidth
          placeholder="Search customers, products, or orders..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleSearch}
          size="small"
        />
      </Stack>

      {loading && (
        <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 10 }}>
          <CircularProgress />
        </Stack>
      )}

      {!loading && hasSearched && (
        <>
          {totalResults === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 5 }}>
              {`No results found for "${queryParam}"`}
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {/* Customers Results */}
              {customers.length > 0 && (
                <Grid item xs={12}>
                  <Card>
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Typography variant="h6">
                        Customers ({customers.length})
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableCell>Name</TableCell>
                              <TableCell>City</TableCell>
                              <TableCell>State</TableCell>
                              <TableCell>Email</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {customers.map((customer) => (
                              <TableRow
                                key={customer.id}
                                hover
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/customers/${customer.id}`)}
                              >
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.city}</TableCell>
                                <TableCell>{customer.state_id?.name || '-'}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Stack>
                  </Card>
                </Grid>
              )}

              {/* Products Results */}
              {products.length > 0 && (
                <Grid item xs={12}>
                  <Card>
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Typography variant="h6">
                        Products ({products.length})
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableCell>SKU</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Category</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {products.map((product) => (
                              <TableRow
                                key={product.id}
                                hover
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/products`)}
                              >
                                <TableCell>{product.default_code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.categ_id?.name || '-'}</TableCell>
                                <TableCell>${product.lst_price?.toFixed(2) || '0.00'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Stack>
                  </Card>
                </Grid>
              )}

              {/* Orders Results */}
              {orders.length > 0 && (
                <Grid item xs={12}>
                  <Card>
                    <Stack spacing={2} sx={{ p: 3 }}>
                      <Typography variant="h6">
                        Orders ({orders.length})
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                              <TableCell>Order #</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orders.map((order) => (
                              <TableRow
                                key={order.id}
                                hover
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                <TableCell>{order.name}</TableCell>
                                <TableCell>{order.partner_id?.name || '-'}</TableCell>
                                <TableCell>
                                  {order.date_order
                                    ? new Date(order.date_order).toLocaleDateString()
                                    : '-'}
                                </TableCell>
                                <TableCell>{order.state || '-'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Stack>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}
