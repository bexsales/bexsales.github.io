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

export default function SendOrderPopupModal({ handleSendOrder }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row" alignItems="center">
        <Stack direction="column" alignItems="center" spacing={1}>
            <IconButton
                onClick={handleOpen}
                sx={{
                    color: 'blue',
                    backgroundColor: '#ddf', // Light blue background
                    '&:hover': { backgroundColor: '#bbf' } // Darker blue on hover
                }}
            >
                <Iconify icon="mdi:send" />
            </IconButton>
            <Typography variant="caption" sx={{ color: 'blue' }}>Email</Typography>
        </Stack>
        <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Confirm Send</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to send this order?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSendOrder} color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </Stack>
  );
};

SendOrderPopupModal.propTypes = {
    handleSendOrder: PropTypes.func,
};
