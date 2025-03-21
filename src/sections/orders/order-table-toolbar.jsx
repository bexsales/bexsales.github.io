import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/eva/search-fill';

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export default function OrderTableToolbar({ 
  filterName, 
  onFilterName, 
  onClickSearch, 
  onHitEnter,
  isPartnerSearch,
  onTogglePartnerSearch,
}) {

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      {/* Stack for Search and Checkbox */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Search Bar */}
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          onKeyDown={onHitEnter}
          placeholder={isPartnerSearch ? 'Search by partner...' : 'Search order...'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onClickSearch} edge="end">
                <Icon icon={searchFill} style={{ color: 'text.disabled', width: 20, height: 20 }} />
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Checkbox to Search by Partner */}
        <FormControlLabel
          control={
            <Checkbox
              checked={isPartnerSearch}
              onChange={onTogglePartnerSearch}
              color="primary"
            />
          }
          label="Search by Partner"
        />
      </Stack>
    </Toolbar>
  );
}

OrderTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onClickSearch: PropTypes.func,
  onHitEnter: PropTypes.func,
  isPartnerSearch: PropTypes.bool,
  onTogglePartnerSearch: PropTypes.func,
};
