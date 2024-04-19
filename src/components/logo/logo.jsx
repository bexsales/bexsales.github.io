import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 150,
        height: 150,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg 
        version="1.1" 
        id="Layer_1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        x="0px" 
        y="0px"
        viewBox="0 0 40 40" 
        style={{ enableBackground: 'new 0 0 40 40' }} 
        xmlSpace="preserve"
      >
      <style>{`
        .st0 { fill: none; }
        .st1 { opacity: 0; }
      `}</style>
      <rect y="0" className="st0" width="40" height="40"/>
      <g>
        <rect x="1.16" y="17.69" className="st1" width="37.68" height="4.65"/>
        <g>
          <path d="M38.56,18.1h0.03c0.03,0,0.06-0.01,0.06-0.03c0-0.02-0.02-0.04-0.05-0.04c-0.01,0-0.02,0-0.03,0V18.1z M38.56,18.24H38.5
            V18c0.02,0,0.05-0.01,0.09-0.01c0.05,0,0.07,0.01,0.08,0.02c0.01,0.01,0.02,0.03,0.02,0.05c0,0.03-0.02,0.05-0.05,0.06v0
            c0.02,0.01,0.04,0.03,0.04,0.06c0.01,0.04,0.01,0.05,0.02,0.06h-0.06c-0.01-0.01-0.01-0.03-0.02-0.06c0-0.03-0.02-0.04-0.05-0.04
            h-0.03V18.24z M38.41,18.11c0,0.11,0.08,0.19,0.19,0.19c0.1,0,0.18-0.08,0.18-0.19c0-0.11-0.08-0.19-0.18-0.19
            C38.49,17.92,38.41,18.01,38.41,18.11 M38.84,18.11c0,0.14-0.11,0.24-0.24,0.24c-0.14,0-0.25-0.11-0.25-0.24
            c0-0.13,0.11-0.24,0.25-0.24C38.73,17.87,38.84,17.98,38.84,18.11"/>
          <g>
            <path d="M11.23,20.3c-0.38-0.17-0.85-0.29-1.4-0.36v-0.02c0.47-0.08,0.87-0.18,1.21-0.32c0.34-0.14,0.51-0.34,0.51-0.59
              c0-0.21-0.12-0.39-0.35-0.54c-0.23-0.14-0.54-0.26-0.93-0.35c-0.39-0.09-0.83-0.16-1.33-0.2c-0.5-0.04-1.02-0.06-1.56-0.06
              l-5.5,0l0,0.15c0.33,0,0.49,0.05,0.49,0.15l0,0.41h2h0.75l2.61,0c0.53,0,0.96,0.03,1.31,0.09c0.34,0.06,0.52,0.2,0.52,0.4
              c0,0.2-0.17,0.33-0.52,0.4c-0.35,0.06-0.78,0.09-1.31,0.09l-3.36,0v0l-2,0l0,2.32c0,0.1-0.16,0.15-0.49,0.15v0.15l6.45,0
              c0.55,0,1.04-0.03,1.48-0.09c0.43-0.06,0.8-0.14,1.1-0.24c0.3-0.1,0.53-0.23,0.68-0.36c0.15-0.14,0.23-0.29,0.23-0.45
              C11.81,20.7,11.61,20.46,11.23,20.3 M9.32,21.25C9,21.35,8.47,21.4,7.73,21.4H4.37l0-1.16l3.36,0c0.74,0,1.27,0.05,1.59,0.16
              c0.32,0.11,0.48,0.25,0.48,0.42C9.8,21,9.64,21.14,9.32,21.25"/>
            <path d="M14.2,18.15l0,0.41h2h1.64l4.05,0c0.25,0,0.42,0.01,0.52,0.05c0.1,0.03,0.15,0.07,0.15,0.13h0.32v-1.08h-0.32
              c0,0.06-0.05,0.11-0.15,0.14c-0.1,0.04-0.27,0.05-0.52,0.05l-8.01,0V18c0.08,0,0.15,0.01,0.22,0.04
              C14.17,18.07,14.2,18.1,14.2,18.15"/>
            <path d="M22.67,21.19c0,0.07-0.06,0.12-0.17,0.16c-0.11,0.04-0.26,0.06-0.43,0.06l-5.87,0v-1.13h3.44c0.24,0,0.42,0.02,0.54,0.05
              c0.13,0.04,0.19,0.12,0.19,0.24h0.32V19.3h-0.32c0,0.13-0.06,0.2-0.19,0.23c-0.11,0.03-0.27,0.04-0.46,0.04l0,0h-0.05
              c-0.01,0-0.02,0-0.04,0l-3.44,0v0l-2,0v2.29c0,0.05-0.03,0.09-0.1,0.11c-0.06,0.02-0.14,0.04-0.22,0.04v0.15l8.19,0
              c0.18,0,0.32,0.01,0.43,0.02c0.11,0.01,0.17,0.06,0.17,0.14h0.32v-1.12H22.67z"/>
            <path d="M25.95,18.32l1.82,1.07L29,18.67l-0.39-0.23c-0.1-0.06-0.19-0.12-0.25-0.17c-0.06-0.05-0.1-0.1-0.1-0.14
              c0-0.04,0.04-0.08,0.13-0.1c0.09-0.02,0.18-0.03,0.27-0.03v-0.15l-3.83,0V18c0.22,0,0.42,0.02,0.58,0.07
              C25.57,18.12,25.75,18.2,25.95,18.32"/>
            <path d="M34.45,18.03c0.13-0.02,0.34-0.02,0.62-0.02v-0.15H31.5V18c0.32,0,0.47,0.04,0.47,0.11c0,0.03-0.05,0.07-0.14,0.12
              c-0.09,0.05-0.2,0.12-0.33,0.2l-1.46,0.86l0,0l-2.08,1.21l-2.24,1.33c-0.13,0.08-0.25,0.12-0.38,0.15
              c-0.12,0.02-0.3,0.03-0.52,0.03v0.15l3.23,0v-0.15c-0.22,0-0.33-0.04-0.33-0.11c0-0.04,0.04-0.09,0.13-0.14
              c0.09-0.05,0.16-0.1,0.22-0.13l1.74-1.01l1.62,0.98c0.1,0.06,0.2,0.11,0.27,0.16c0.08,0.05,0.11,0.09,0.11,0.13
              c0,0.09-0.09,0.13-0.28,0.13v0.15h3.53v-0.15c-0.14,0-0.27-0.01-0.38-0.04c-0.11-0.03-0.21-0.07-0.31-0.11
              c-0.09-0.04-0.17-0.08-0.23-0.13c-0.06-0.04-0.12-0.08-0.17-0.11l-2.92-1.73l3.04-1.75C34.2,18.08,34.31,18.05,34.45,18.03"/>
          </g>
          <path d="M37.71,19.9h-0.02v0L37.71,19.9c0.06,0,0.41-0.09,0.41-0.34l0-1.09h-0.07c-0.04,0.14-0.25,0.22-0.31,0.22l-0.49,0l-0.48,0
            c-0.06,0-0.27-0.08-0.31-0.22h-0.07l0,1.09c0,0.25,0.35,0.34,0.41,0.34h0.02v0H36.8c-0.06,0-0.41,0.09-0.41,0.34l0,1.09h0.07
            c0.04-0.14,0.25-0.22,0.31-0.22l0.48,0l0.49,0c0.06,0,0.27,0.08,0.31,0.22h0.07l0-1.09C38.12,19.99,37.77,19.9,37.71,19.9
            M37.75,18.86v0.74c0,0.14-0.18,0.2-0.33,0.2v-0.94H37.75z M36.76,19.6v-0.74l0.33,0v0.94C36.94,19.8,36.76,19.74,36.76,19.6
            M36.76,20.94l0-0.74c0-0.14,0.18-0.2,0.33-0.2l0,0.94H36.76z M37.75,20.94h-0.33l0-0.94c0.15,0,0.33,0.07,0.33,0.2V20.94z"/>
        </g>
      </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
