import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils'
import TableNoData from '../table-no-data';
import OrderTableRow from '../order-table-row';
import OrderTableHead from '../order-table-head';
import TableEmptyRows from '../table-empty-rows';
import OrderTableToolbar from '../order-table-toolbar';

// ----------------------------------------------------------------------

export default function OrderView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [saleOrders, setSaleOrders] = useState([]);

  const [page, setPage] = useState(0);

  const [maxRecord, setMaxRecord] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [isPartnerSearch, setIsPartnerSearch] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [totalCount, setTotalCount] = useState(0);

  const saleOrdersRef = useRef(saleOrders);
  const rowsPerPageRef = useRef(rowsPerPage);
  const pageRef = useRef(page);
  const filterNameRef = useRef(filterName);

  useEffect(() => {
    // Fetch orders from the API
    saleOrdersRef.current = saleOrders;
    rowsPerPageRef.current = rowsPerPage;
    pageRef.current = page;
    filterNameRef.current = filterName;
    fetchOrders(pageRef.current, rowsPerPageRef.current, saleOrdersRef.current, filterNameRef.current, isPartnerSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = (pg, lm, ord, nm, isPartner) => {
    console.log('Fetching Orders');
    setLoading(true);
    const normalizedPageNumber = pg + 1;
    let requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=orders&page=${normalizedPageNumber}&page_size=${lm}`
    if (nm) {
      requestUrl += `&name=${nm}`;
    }
    if (isPartner) {
      requestUrl += `&search_partner=${isPartner}`;
    }

    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data.data);
      setSaleOrders([...ord,...response.data.data]);
      setTotalCount(response.data.count);
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
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
      fetchOrders(newPage, rowsPerPage, saleOrders, filterName, isPartnerSearch)
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
    fetchOrders(page, rowsPerPage, [], filterName, isPartnerSearch);
  };

  const handleClick = (event, id) => {
    router.push(`/orders/${id}`);
  };

  const notFound = !saleOrders.length && !!filterName;

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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Orders</Typography>
        </Stack>

        <Card>
          <OrderTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            onClickSearch={handleClickSearch}
            onHitEnter={handleEnter}
            isPartnerSearch={isPartnerSearch}
            onTogglePartnerSearch={() => setIsPartnerSearch(!isPartnerSearch)}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <OrderTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={saleOrders.length}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'name', label: 'Name' },
                    { id: 'customer', label: 'Customer' },
                    { id: 'create_date', label: 'Create Date' },
                    { id: 'amount_untaxed', label: 'Amount Untaxed' },
                    { id: 'amount_tax', label: 'Amount Tax' },
                    { id: 'amount_total', label: 'Amount Total' },
                    { id: 'state', label: 'State' },
                    { id: 'invoiced', label: 'Invoiced' },
                    { id: 'x_studio_notes', label: 'Notes' },
                    { id: 'client_order_ref', label: 'PO Number' },
                    { id: 'ship_date', label: 'Ship Date' },
                    { id: 'ship_tracking_number', label: 'Tracking #' }
                  ]}
                />
                <TableBody>
                      {saleOrders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <OrderTableRow
                            key={row.id}
                            name={row.name}
                            customer={row.customer_id.name}
                            create_date={row.create_date}
                            amount_untaxed={row.amount_untaxed}
                            amount_tax={row.amount_tax}
                            amount_total={row.amount_total}
                            state={row.state}
                            invoiced={row.account_move_count > 0}
                            x_studio_notes={row.x_studio_notes}
                            client_order_ref={row.client_order_ref}
                            ship_date={row.ship_date}
                            ship_tracking_number={row.ship_tracking_number}
                            handleClick={(event) => handleClick(event, row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, saleOrders.length)}
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
