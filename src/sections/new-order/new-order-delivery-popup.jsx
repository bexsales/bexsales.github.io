import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
    Button,
    Dialog,
    FormControl,
    DialogTitle,
    DialogContent, 
    DialogActions 
} from '@mui/material';

import { CustomerView } from '../customers/view';

export default function DeliveryPopupModal({ 
  onSelect,
  filterParentContactOption,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFromModal = (customer) => {
    onSelect(customer);
    handleClose();
  }

  // Log parameters whenever they change
  useEffect(() => {
    console.log('DeliveryPopupModal Props:');
    console.log('filterParentContactOption:', filterParentContactOption);
  }, [onSelect, filterParentContactOption]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Set
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>Delivery Address</DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
            <FormControl sx={{ width: '100%' }}>
                <CustomerView 
                  onSelect={onSelectFromModal} 
                  filterTypeOption="delivery" 
                  filterParentContactOption={filterParentContactOption} 
                  style={{ width: '100%' }}/>
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
DeliveryPopupModal.propTypes = {
    onSelect: PropTypes.func,
    filterParentContactOption: PropTypes.number,
};
