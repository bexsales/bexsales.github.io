import PropTypes from 'prop-types';
import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import {
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent, 
    DialogActions,
    DialogContentText 
} from '@mui/material';

import Iconify from 'src/components/iconify';

export default function SendInvoicePopupModal({ 
    handleSendInvoice, 
    partner,
    invoiceName,
    invoiceId,
    customerEmail
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    const result = await handleSendInvoice(invoiceId);
    if (result === true) {
      handleClose();
    }
  };

  return (
    <Stack direction="row" alignItems="center">
        <Stack direction="column" alignItems="center" spacing={1}>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: 'blue',
                    backgroundColor: '#fff', // Light blue background
                    '&:hover': { backgroundColor: '#bbf' } // Darker blue on hover
                }}
            >
                <Iconify icon="mdi:send" />
            </IconButton>
        </Stack>
        <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Confirm Send</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to send this invoice <b>[{invoiceName}]</b> to <b>{partner} [{customerEmail}]</b>?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </Stack>
  );
};

SendInvoicePopupModal.propTypes = {
    handleSendInvoice: PropTypes.func,
    partner: PropTypes.any,
    invoiceName: PropTypes.any,
    invoiceId: PropTypes.any,
    customerEmail: PropTypes.any
};
