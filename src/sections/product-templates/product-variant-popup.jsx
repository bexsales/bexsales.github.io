import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import IconButton from '@mui/material/IconButton';
import {
    Box,
    Chip,
    Paper,
    Stack,
    Table,
    Button,
    Dialog,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TextField,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableContainer
  } from '@mui/material';

import config from 'src/config/config';

import Iconify from 'src/components/iconify';

export default function ProductVariantPopupModal({
  open,
  onClose,
  product,
  onSelect
}) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [variantInfo, setVariantInfo] = useState('...');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleDeleteProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const allSelected = product?.attributes?.every(
    (attr) => selectedAttributes[attr.attribute]
  );

   // Memoize fetchProduct to prevent recreation on each render
  const fetchProduct = useCallback(() => {
    if (!allSelected) return;

    console.log('Fetching Product Variant');
    setVariantInfo('Searching...')
    const attributes = Object.values(selectedAttributes).join(',');

    let requestUrl = `${config.baseURL}/api-proxy/proxy?method=get&resource=products&template_id=${product.id}`;
    if (attributes){
        requestUrl += `&attributes=${attributes}`
    }

    console.log(requestUrl);

    axios
      .get(requestUrl, {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data && Object.keys(response.data.data).length > 0) {
            if (attributes){
                setSelectedVariant(response.data.data);
            }
            else if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                setSelectedVariant(response.data.data[0]);
            }
        }
        else {
            setSelectedVariant(null);
            setVariantInfo('Product not found...');
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [allSelected, product.id, selectedAttributes]);

  // Fetch product variant when all attributes are selected
  useEffect(() => {
    if (allSelected) {
      fetchProduct();
    }
  }, [allSelected, fetchProduct]);

  // Update variantInfo when selectedVariant changes
  useEffect(() => {
    if (selectedVariant) {
      const attributeValues = selectedVariant.product_template_attribute_value_ids
        .map((attr) => attr.name)
        .join(',');

      const { default_code, name, qty_available } = selectedVariant;
      
      const info = `${default_code ? `[${default_code}] ` : ''}${name}${attributeValues ? ` (${attributeValues})` : ''}: ${qty_available} available`;
      setVariantInfo(info);
    } else {
      setVariantInfo('Product not found...');
    }
  }, [selectedVariant]);

  const handleAttributeSelect = (attribute, value) => {
    setSelectedAttributes({
        ...selectedAttributes,
        [attribute]: value,
    });
  };

  const addToOrder = () => {
    if (!Array.isArray(selectedProducts) || selectedProducts.length === 0) {
      alert('You must select at least one product variant before adding to order.');
      return;
    }
  
    // Clean up each product before passing
    const cleanedProducts = selectedProducts.map(_product => ({
      ..._product,
      attributes: _product.product_template_attribute_value_ids,
      product_template_attribute_value_ids: undefined,
    }));
  
    console.log('Final cleaned products to add:', cleanedProducts);
  
    onSelect(cleanedProducts); // send the array
  };

  const handleQtyChange = (id, value) => {
    const parsed = parseInt(value, 10);
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty_needed: Number.isNaN(parsed) ? '' : parsed } : p
      )
    );
  };

  const addThis = () => {
    if (!selectedVariant) {
      alert('You must have a variant selected! Please select one value for each variant.');
      return;
    }

    const newProduct = {
      ...selectedVariant,
      qty_needed: 1,
    };

    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === newProduct.id);
      if (existing) {
        return prev.map((p) =>
          p.id === newProduct.id ? { ...p, qty_needed: p.qty_needed + 1 } : p
        );
      }
      return [...prev, newProduct];
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
        {product?.name && (
            <DialogTitle id="product-variant-title" variant="h6" sx={{ mb: 2 }}>
            {product.name}
            </DialogTitle>
        )}
      <DialogContent dividers sx={{ maxHeight: '70vh', overflowY: 'auto' }}>

        {/* Render attributes with values */}
        {product?.attributes?.map((attr) => (
          <Stack key={attr.id} spacing={1} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{attr.attribute}</Typography>
            {/* Make chip container scrollable */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                maxHeight: 150, // Set max height for scrollable area
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: 1,
                borderRadius: 1,
              }}
            >
              {attr.values.map((value, index) => (
                <Chip
                  key={index}
                  label={value[1]}
                  clickable
                  color={
                    selectedAttributes[attr.attribute] === value[1]
                      ? 'primary'
                      : 'default'
                  }
                  onClick={() => handleAttributeSelect(attr.attribute, value[1])}
                  sx={{
                    borderRadius: '5px',
                    fontWeight:
                      selectedAttributes[attr.attribute] === value[1]
                        ? 'bold'
                        : 'normal',
                  }}
                />
              ))}
            </Box>
          </Stack>
        ))}
        {/* Display variant info if selected */}
        {variantInfo && (
          <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1">{variantInfo}</Typography>
            <Button variant="contained" color="primary" onClick={addThis} disabled={!allSelected}>
              Add
            </Button>
          </Box>
        )}

        {selectedProducts.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Attributes</TableCell>
                    <TableCell>Qty Available</TableCell>
                    <TableCell>Qty Needed</TableCell>
                    <TableCell/> {/* For Delete button */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.map((_product) => (
                    <TableRow key={_product.id}>
                      <TableCell>{_product.default_code ? `[${_product.default_code}] ` : ''}{_product.name}</TableCell>
                      <TableCell>{_product.product_template_attribute_value_ids?.map((attr) => (
                          <Chip key={attr.id} label={attr.name} size="small" />
                        ))}</TableCell>
                      <TableCell>{_product.qty_available}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          size="small"
                          value={_product.qty_needed}
                          onChange={(e) => handleQtyChange(_product.id, e.target.value)}
                          onBlur={(e) => {
                            const parsed = parseInt(e.target.value, 10);
                            if (!parsed || parsed < 1) {
                              handleQtyChange(_product.id, 1);
                            }
                          }}
                          inputProps={{ min: 1 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteProduct(_product.id)}>
                          <Iconify icon="eva:trash-2-outline" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={addToOrder} disabled={!allSelected}>
          Add to Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ProductVariantPopupModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onSelect: PropTypes.func
};