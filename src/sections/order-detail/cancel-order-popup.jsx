import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Typography from '@mui/material/Typography';
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

export default function CancelOrderPopupModal({ handleCancelOrder }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems="center">
        <Typography variant="body1" sx={{ color: 'red' }}>Cancel</Typography>
        <IconButton
            onClick={handleOpen}
            sx={{ color: 'red' }} // Set the color to red
        >
            <Iconify icon="eva:close-outline" /> {/* Replace with the appropriate close icon */}
        </IconButton>
        <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Confirm Cancellation</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel this order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCancelOrder} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </Stack>
  );
};

CancelOrderPopupModal.propTypes = {
    handleCancelOrder: PropTypes.func,
};
