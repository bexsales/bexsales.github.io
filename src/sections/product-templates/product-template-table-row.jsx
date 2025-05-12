import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function ProductTemplateTableRow({
  id,
  image,
  name,
  category,
  type,
  list_price,
  attributes,
  onSelect
}) {

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableRow hover tabIndex={-1} onClick={() => onSelect({
      id,
      image,
      name,
      category,
      type,
      list_price,
      attributes
    })}>
      <TableCell>
        {image && (
          <img
            src={`data:image/png;base64,${image}`}
            alt={name}
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{type}</TableCell>
      <TableCell>{formatToDollars(list_price)}</TableCell>

    </TableRow>
  );
}

ProductTemplateTableRow.propTypes = {
  id: PropTypes.any,
  image: PropTypes.any,
  name: PropTypes.any,
  category: PropTypes.any,
  type: PropTypes.any,
  list_price: PropTypes.any,
  attributes: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
};
