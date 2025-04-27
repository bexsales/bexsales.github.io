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

import { InvoiceView } from '../invoices/view';

export default function InvoicePopupModal({ invoiceOrigin, accountMoveCount }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Invoices ({ accountMoveCount })
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>Invoices</DialogTitle>
        <DialogContent>
            <FormControl sx={{ width: '100%' }}>
                <InvoiceView invoiceOrigin={invoiceOrigin} style={{ width: '100%' }}/>
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

InvoicePopupModal.propTypes = {
    invoiceOrigin: PropTypes.func,
    accountMoveCount: PropTypes.number
};
