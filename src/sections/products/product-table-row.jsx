import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  default_code,
  name,
  category,
  type,
  standard_price,
  lst_price,
  description_sale,
  handleClick
}) {

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableRow hover tabIndex={-1} onClick={handleClick}>

      <TableCell>{default_code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{formatToDollars(standard_price)}</TableCell>
      <TableCell>{formatToDollars(lst_price)}</TableCell>
      <TableCell>{description_sale}</TableCell>

    </TableRow>
  );
}

ProductTableRow.propTypes = {
  default_code: PropTypes.any,
  name: PropTypes.any,
  category: PropTypes.any,
  type: PropTypes.any,
  standard_price: PropTypes.any,
  lst_price: PropTypes.any,
  description_sale: PropTypes.any,
  handleClick: PropTypes.func,
};
