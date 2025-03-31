import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for managing cookies
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import {
    Box,
    Chip,
    Stack,
    Button,
    Dialog,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions
  } from '@mui/material';

import config from 'src/config/config';

export default function ProductVariantPopupModal({
  open,
  onClose,
  product,
  onSelect
}) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [variantInfo, setVariantInfo] = useState('...');

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
    if ( !selectedVariant ) {
        alert('You must have a variant selected! Please select one value for each variant. If you already selected for all attributes, the product is not available.')
    }
    else {
        // Rename 'product_template_attribute_value_ids' to 'attributes'
        const updatedProduct = {
            ...selectedVariant, // Spread the existing properties
            attributes: selectedVariant.product_template_attribute_value_ids, // Rename the field
            product_template_attribute_value_ids: undefined, // Remove the old field
        };
        console.log(updatedProduct);
        onSelect(updatedProduct);
    }
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
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: '1px solid #ccc',
              borderRadius: 1,
              backgroundColor: '#f5f5f5',
            }}
          >
            <Typography variant="subtitle1">{variantInfo}</Typography>
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