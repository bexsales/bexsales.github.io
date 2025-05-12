import PropTypes from 'prop-types';

import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils'
import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import InvoiceTableRow from '../invoice-table-row';
import InvoiceTableHead from '../invoice-table-head';
import InvoiceTableToolbar from '../invoice-table-toolbar';

// ----------------------------------------------------------------------

export default function InvoiceView({ invoiceOrigin }) {

  const _invoiceOrigin = invoiceOrigin;

  const [loading, setLoading] = useState(false);

  const [invoices, setInvoices] = useState([]);

  const [page, setPage] = useState(0);

  const [maxRecord, setMaxRecord] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [totalCount, setTotalCount] = useState(0);

  const invoicesRef = useRef(invoices);
  const rowsPerPageRef = useRef(rowsPerPage);
  const pageRef = useRef(page);
  const filterNameRef = useRef(filterName);

  useEffect(() => {
    // Fetch orders from the API
    invoicesRef.current = invoices;
    rowsPerPageRef.current = rowsPerPage;
    pageRef.current = page;
    filterNameRef.current = filterName;
    fetchInvoices(pageRef.current, rowsPerPageRef.current, invoicesRef.current, filterNameRef.current, _invoiceOrigin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInvoices = (pg, lm, inv, nm, org) => {
    console.log('Fetching Invoices');
    setLoading(true);
    const normalizedPageNumber = pg + 1;
    let requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=invoices&page=${normalizedPageNumber}&page_size=${lm}`
    if (nm) {
      requestUrl += `&name=${nm}`;
    }
    if (org) {
      requestUrl += `&invoice_origin=${org}`;
    }
    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data.data);
      setInvoices([...inv,...response.data.data]);
      setTotalCount(response.data.count);
    })
    .catch(error => {
      console.error('Error fetching invoices:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const numberOfRecords = rowsPerPage * newPage;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (numberOfRecords > maxRecord) {
      setMaxRecord(numberOfRecords);
      fetchInvoices(newPage, rowsPerPage, invoices, filterName, _invoiceOrigin);
    }

  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleClickSearch();
    }
  };

  const handleClickSearch = (event) => {
    setPage(0);
    fetchInvoices(page, rowsPerPage, [], filterName)
  };

  const handleSendInvoice = async (invoiceId) => {
    try {
      console.log('Sending Invoice');
      const action = 'post';
      const requestUrl = `${config.baseURL}/api-proxy/proxy?method=${action}&resource=send-invoices`;
      console.log(requestUrl);
  
      const requestBody = {
        invoice: {
          id: parseInt(invoiceId, 10),
        },
      };
      console.log('Request body', requestBody);
  
      const response = await axios.post(requestUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
        },
      });
  
      console.log(response.data);
  
      if (response.data.success === false) {
        alert('Invoice failed to send!');
        return false;
      }
      alert('Invoice Sent!');
      return true;
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Error sending invoice!');
      return false;
    }
  };

  const notFound = !invoices.length && !!filterName;

  return (
    <>
      {loading && (
        <Stack
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            zIndex: 2000, // high enough to overlay everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Stack>
      )}
      <Container>
        <Card>
          <InvoiceTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            onClickSearch={handleClickSearch}
            onHitEnter={handleEnter}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <InvoiceTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={invoices.length}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'email_action', label: ''},
                    { id: 'name', label: 'Name' },
                    { id: 'payment_state', label: 'Payment State' },
                    { id: 'customer', label: 'Customer' },
                    { id: 'customer_email', label: 'Email' },
                    { id: 'create_date', label: 'Create Date' },
                    { id: 'amount_untaxed', label: 'Amount Untaxed' },
                    { id: 'amount_tax', label: 'Amount Tax' },
                    { id: 'amount_total', label: 'Amount Total' },
                    { id: 'state', label: 'State' },
                    { id: 'invoice_origin', label: 'Order' },
                    { id: 'invoice_Date', label: 'Invoice Date' }
                  ]}
                />
                <TableBody>
                  {invoices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <InvoiceTableRow
                        key={row.id}
                        id={row.id}
                        name={row.name}
                        payment_state={row.payment_state}
                        customer={row.customer_id.name}
                        customer_email={row.customer_id.email}
                        create_date={row.create_date}
                        amount_untaxed={row.amount_untaxed}
                        amount_tax={row.amount_tax}
                        amount_total={row.amount_total}
                        state={row.state}
                        invoice_origin={row.invoice_origin}
                        invoice_date={row.invoice_date}
                        handleSendInvoice={(event) => handleSendInvoice(event, row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, invoices.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}

InvoiceView.propTypes = {
  invoiceOrigin: PropTypes.string,
};