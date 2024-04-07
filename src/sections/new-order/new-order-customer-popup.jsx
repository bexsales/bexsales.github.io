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

import { CustomerView } from '../customers/view';

export default function CustomerPopupModal({ onSelect }) {
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

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Set
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Customers</DialogTitle>
        <DialogContent>
            <FormControl sx={{ m: 0, p: 0 }}>
                <CustomerView onSelect={onSelectFromModal} style={{ width: '100%' }}/>
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

CustomerPopupModal.propTypes = {
    onSelect: PropTypes.func,
};
