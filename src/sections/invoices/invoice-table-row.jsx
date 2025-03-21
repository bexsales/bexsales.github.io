import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Label from 'src/components/label';

import SendInvoicePopupModal from './send-invoice-popup';

// ----------------------------------------------------------------------

export default function InvoiceTableRow({
  id,
  name,
  payment_state,
  customer,
  customer_email,
  create_date,
  amount_untaxed,
  amount_tax,
  amount_total,
  state,
  invoice_origin,
  invoice_date,
  handleSendInvoice,
}) {

  // Format amount to dollars
  const formatToDollars = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
      {(state === 'posted' && payment_state === 'not_paid' && customer_email) && (<SendInvoicePopupModal 
          handleSendInvoice={handleSendInvoice}
          partner={customer}
          invoiceName={name}
          invoiceId={id}
          customerEmail={customer_email}
        />)}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{payment_state}</TableCell>
      <TableCell>{customer}</TableCell>
      <TableCell>{customer_email}</TableCell>
      <TableCell>{create_date}</TableCell>
      <TableCell>{formatToDollars(amount_untaxed)}</TableCell>
      <TableCell>{formatToDollars(amount_tax)}</TableCell>
      <TableCell>{formatToDollars(amount_total)}</TableCell>
      <TableCell>
          <Label color={(state !== 'draft' && 'error') || 'success'}>{state}</Label>
      </TableCell>
      <TableCell>{invoice_origin}</TableCell>
      <TableCell>{invoice_date}</TableCell>
    </TableRow>
  );
}

InvoiceTableRow.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  payment_state: PropTypes.any,
  customer: PropTypes.any,
  customer_email: PropTypes.any,
  create_date: PropTypes.any,
  amount_untaxed: PropTypes.any,
  amount_tax: PropTypes.any,
  amount_total: PropTypes.any,
  state: PropTypes.any,
  invoice_origin: PropTypes.any,
  invoice_date: PropTypes.any,
  handleSendInvoice: PropTypes.func,
};
