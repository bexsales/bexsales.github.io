import config from 'src/config/config'; // Adjust the import path as necessary

import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import PropTypes from 'prop-types';
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

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils'
import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import ProductVariantPopupModal from '../product-variant-popup';
import ProductTemplateTableRow from '../product-template-table-row';
import ProductTemplateTableHead from '../product-template-table-head';
import ProductTemplateTableToolbar from '../product-template-table-toolbar';

// ----------------------------------------------------------------------

export default function ProductTemplateView({
  showTitle,
  onSelect,
}) {

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);

  const [maxRecord, setMaxRecord] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [totalCount, setTotalCount] = useState(0);

  const [openProductVariantPopup, setOpenProductVariantPopup] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsRef = useRef(products);
  const rowsPerPageRef = useRef(rowsPerPage);
  const pageRef = useRef(page);
  const filterNameRef = useRef(filterName);

  useEffect(() => {
    // Fetch products from the API
    productsRef.current = products;
    rowsPerPageRef.current = rowsPerPage;
    pageRef.current = page;
    filterNameRef.current = filterName;
    fetchProducts(pageRef.current, rowsPerPageRef.current, productsRef.current, filterNameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = (pg, lm, prod, nm) => {
    console.log('Fetching Products');
    setLoading(true);
    const normalizedPageNumber = pg + 1;
    let requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=product-templates&page=${normalizedPageNumber}&page_size=${lm}`
    if (nm) {
      requestUrl += `&name=${nm}`;
    }
    requestUrl += '&include_images=true';
    console.log(requestUrl);
    axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`, // Replace with your actual JWT token
      }
    })
    .then(response => {
      console.log(response.data.data);
      setProducts([...prod,...response.data.data]);
      setTotalCount(response.data.count);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
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
      fetchProducts(newPage, rowsPerPage, products, filterName)
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
    fetchProducts(page, rowsPerPage, [], filterName)
  };

  const handleRowSelect = (product) => {
    setSelectedProduct(product);
    setOpenProductVariantPopup(true);
  };

  const notFound = !products.length && !!filterName;

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
        {showTitle && ( // Display error message if authError state is not null
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Products</Typography>
          </Stack>
        )}

        <Card>
          <ProductTemplateTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            onClickSearch={handleClickSearch}
            onHitEnter={handleEnter}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <ProductTemplateTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={products.length}
                  onRequestSort={handleSort}
                  headLabel={[
                    { id: 'image', label: '\u00A0'.repeat(30) },
                    { id: 'name', label: 'Name' },
                    { id: 'category', label: 'Category' },
                    { id: 'type', label: 'Type' },
                    { id: 'lst_price', label: 'Sale Price' }
                  ]}
                />
                <TableBody>
                          {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                              <ProductTemplateTableRow
                                key={row.id}
                                id={row.id}
                                image={row.image}
                                name={row.name}
                                category={row.categ_id.name}
                                type={row.type}
                                list_price={row.list_price}
                                attributes={row.attribute_line_ids}
                                onSelect={handleRowSelect}
                              />
                            ))}

                          <TableEmptyRows
                            height={77}
                            emptyRows={emptyRows(page, rowsPerPage, products.length)}
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
        {openProductVariantPopup && (
          <ProductVariantPopupModal
            open={openProductVariantPopup}
            onClose={() => setOpenProductVariantPopup(false)}
            product={selectedProduct}
            onSelect={onSelect}
          />
        )}
      </Container>
    </>
  );
}

ProductTemplateView.propTypes = {
  showTitle: PropTypes.bool,
  onSelect: PropTypes.func
};
