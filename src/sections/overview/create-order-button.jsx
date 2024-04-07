import React from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%', // Adjust width as needed
    height: '100%', // Adjust height as needed
    fontSize: '1.5rem', // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed,
  },
}));

const CreateOrderButton = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const router = useRouter();

  const handleClick = () => {
    router.push('/new-order');
  }

  return (
    <Button className={classes.button} variant="contained" onClick={handleClick}>
      Create Order
    </Button>
  );
};

export default CreateOrderButton;