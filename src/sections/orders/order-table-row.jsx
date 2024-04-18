import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function OrderTableRow({
  name,
  customer,
  create_date,
  amount_untaxed,
  amount_tax,
  amount_total,
  state,
  x_studio_notes,
  handleClick,
}) {

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableRow hover tabIndex={-1} onClick={handleClick}>

      <TableCell>{name}</TableCell>
      <TableCell>{customer}</TableCell>
      <TableCell>{create_date}</TableCell>
      <TableCell>{formatToDollars(amount_untaxed)}</TableCell>
      <TableCell>{formatToDollars(amount_tax)}</TableCell>
      <TableCell>{formatToDollars(amount_total)}</TableCell>
      <TableCell>
          <Label color={(state !== 'draft' && 'error') || 'success'}>{state}</Label>
      </TableCell>
      <TableCell>{x_studio_notes}</TableCell>

    </TableRow>
  );
}

OrderTableRow.propTypes = {
  name: PropTypes.any,
  customer: PropTypes.any,
  create_date: PropTypes.any,
  amount_untaxed: PropTypes.any,
  amount_tax: PropTypes.any,
  amount_total: PropTypes.any,
  state: PropTypes.any,
  x_studio_notes: PropTypes.any,
  handleClick: PropTypes.func,
};
