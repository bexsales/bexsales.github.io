import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
    Button,
    Dialog,
    FormControl,
    DialogTitle,
    DialogContent, 
    DialogActions
} from '@mui/material';

import { ProductView } from '../products/view';

export default function ProductSKUPopupModal({ onSelect }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFromModal = (product) => {
    onSelect([product]);
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Add SKU
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>Products</DialogTitle>
        <DialogContent>
            <FormControl sx={{ width: '100%' }}>
                <ProductView onSelect={onSelectFromModal} style={{ width: '100%' }}/>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ProductSKUPopupModal.propTypes = {
    onSelect: PropTypes.func,
};
