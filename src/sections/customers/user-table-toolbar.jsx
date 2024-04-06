import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify-icons/eva/search-fill';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ filterName, onFilterName, onClickSearch, onHitEnter }) {

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          onKeyDown={onHitEnter}
          placeholder="Search customer..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onClickSearch} edge="end">
                <Icon icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </IconButton>
            </InputAdornment>
          }
        />
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onClickSearch: PropTypes.func,
  onHitEnter: PropTypes.func,
};
