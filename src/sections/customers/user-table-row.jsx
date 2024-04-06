import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  street,
  city,
  state,
  country,
  zip,
  phone,
  mobile,
  email,
  handleClick,
}) {

  return (
    <TableRow hover tabIndex={-1}>

      <TableCell>{name}</TableCell>
      <TableCell>{street}</TableCell>
      <TableCell>{city}</TableCell>
      <TableCell>{state}</TableCell>
      <TableCell>{country}</TableCell>
      <TableCell>{zip}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{mobile}</TableCell>
      <TableCell>{email}</TableCell>

    </TableRow>
  );
}

UserTableRow.propTypes = {
  selected: PropTypes.any,
  name: PropTypes.any,
  street: PropTypes.any,
  city: PropTypes.any,
  state: PropTypes.any,
  country: PropTypes.any,
  zip: PropTypes.any,
  phone: PropTypes.any,
  mobile: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
};
