import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HelpButton = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      backgroundColor: 'transparent', 
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 1000,
    }}
  >
    <HelpOutlineIcon style={{ color: 'white', fontSize: '30px' }} />
  </div>
);

export default HelpButton;
