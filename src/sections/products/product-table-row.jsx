import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  id,
  default_code,
  name,
  category,
  type,
  lst_price,
  description_sale,
  attributes,
  virtual_available,
  qty_available,
  onSelect
}) {

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableRow hover tabIndex={-1} onClick={() => onSelect({
      id, 
      default_code,
      name,
      category,
      type,
      lst_price,
      description_sale,
      attributes,
      virtual_available,
      qty_available
    })}>

      <TableCell>{default_code}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{formatToDollars(lst_price)}</TableCell>
      <TableCell>{description_sale}</TableCell>
      <TableCell>
        {attributes.map((attribute, index) => (
          <Chip key={index} label={attribute} variant="outlined" />
        ))}
      </TableCell>
      <TableCell>{qty_available}</TableCell>

    </TableRow>
  );
}

ProductTableRow.propTypes = {
  id: PropTypes.any,
  default_code: PropTypes.any,
  name: PropTypes.any,
  category: PropTypes.any,
  type: PropTypes.any,
  lst_price: PropTypes.any,
  description_sale: PropTypes.any,
  attributes: PropTypes.arrayOf(PropTypes.string),
  virtual_available: PropTypes.any,
  qty_available: PropTypes.any,
  onSelect: PropTypes.func,
};
