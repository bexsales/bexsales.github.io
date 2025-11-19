import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  name,
  street,
  city,
  state,
  country,
  zip,
  phone,
  mobile,
  email,
  is_brick_and_mortar,
  is_sells_at_roadshows,
  onSelect,
}) {

  const navigate = useNavigate();

  const defaultSelect = (customer) => {
    console.log(  'Navigating to customer', customer);
    navigate(`/customers/${customer.id}`);
  };

  // eslint wants this version instead of the ternary
  const handleSelect = onSelect || defaultSelect;

  return (
    <TableRow hover tabIndex={-1} onClick={() => handleSelect({
      id, 
      name,
      street,
      city,
      state,
      country,
      zip,
      phone,
      mobile,
      email,
      is_brick_and_mortar,
      is_sells_at_roadshows
    })}>

      <TableCell>{name}</TableCell>
      <TableCell>{street}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>{state}</TableCell>
      <TableCell>{country}</TableCell>
      <TableCell>{zip}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{mobile}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{is_brick_and_mortar ? 'Yes' : 'No'}</TableCell>
      <TableCell>{is_sells_at_roadshows ? 'Yes' : 'No'}</TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  street: PropTypes.any,
  city: PropTypes.any,
  state: PropTypes.any,
  country: PropTypes.any,
  zip: PropTypes.any,
  phone: PropTypes.any,
  mobile: PropTypes.any,
  email: PropTypes.any,
  is_brick_and_mortar: PropTypes.bool,
  is_sells_at_roadshows: PropTypes.bool,
  onSelect: PropTypes.func,
};
