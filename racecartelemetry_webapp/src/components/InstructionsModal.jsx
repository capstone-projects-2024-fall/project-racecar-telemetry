import React from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InstructionsModal = ({ open, onClose, children }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="instructions-modal-title"
    aria-describedby="instructions-modal-description"
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Box
      sx={{
        width: '70%',
        height: '75%',
        backgroundColor: '#121213',
        padding: 4,
        borderRadius: 2,
        boxShadow: 24,
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          color: 'red',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Render Children */}
      {children}
    </Box>
  </Modal>
);

export default InstructionsModal;
