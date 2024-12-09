// @pages/CANConfiguration.js

import React, { useState, useEffect } from 'react'
import CANDataAssignment from '@components/CANDataAssignment'
import ConfigManager from '@components/ConfigManager'
import { Box, ThemeProvider, CssBaseline, Typography, Grid2 } from "@mui/material"
import CANDataView from '@components/CANDataView';
import theme from "@theme";
import InstructionsModal from '@components/InstructionsModal';
import HelpButton from '@/components/HelpButton';

export default function CANConfigurationPage() {
  const [selectedConfig, setSelectedConfig] = useState("")
  const [isEditing, setIsEditing] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('CANConfigVisited');
    if (!hasVisited) {
      setOpen(true); // Show modal on first visit
      sessionStorage.setItem('CANConfigVisited', 'true');
    }
  }, []);

  const handleClose = () => setOpen(false);

  const modalContent = (
    <>
      {/* Welcome Text */}
      <Box textAlign="center" mb={1}  sx={{ mt: 2 }}>
        <Typography
          id="instructions-modal-title"
          variant="h4"
          gutterBottom
          sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}
        >
          CAN message configuration guide
        </Typography>
        <Box
          sx={{
            width: '0%',
            height: '2px',
            backgroundColor: '#cccccc',
            margin: '0 auto',
          }}
        />
      </Box>
  
      {/* Steps in Rows with Left Alignment but Centered Content */}
      <Grid2
        container
        direction="column"
        spacing={6}
        sx={{
          px: 4,
          backgroundColor: '#121213',
          borderRadius: 2,
          padding: 4,
        }}
      >
        {/* Step 1 */}
        <Grid2 container spacing={3} justifyContent="center" alignItems="flex-start">
          <Grid2 xs={12} md={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Step 1: Selecting a Configuration to edit
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'left' }}>
              Use the{' '}
              <Typography component="span" sx={{ color: '#1d9bf0' }}>
                configuration manager
              </Typography>{' '}
              to choose or create a new configuration.
              <br />
              <Typography component="span" sx={{ color: '#FF5733' }}>
                Select
              </Typography>{' '}
              the configuration you want to edit.
              <br />
              Enter a new configuration by typing in a name and clicking the{' '}
              <Typography component="span" sx={{ color: '#28A745' }}>
                create
              </Typography>{' '}
              button.
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={5}>
            <Box
              component="img"
              src="/select-configuration.png"
              alt="Select Configuration Image"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
                border: '2px solid #444',
                display: 'block',
              }}
            />
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%',
              height: '2px',
              backgroundColor: '#cccccc',
              margin: '10px auto',
            }}
          />
        </Grid2>
  
        {/* Step 2 */}
        <Grid2 container spacing={3} justifyContent="center" alignItems="flex-start">
          <Grid2 xs={12} md={5} order={{ xs: 2, md: 1 }}>
            <Box
              component="img"
              src="/data-assignment.png"
              alt="Edit Data Image"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
                border: '2px solid #444',
                display: 'block',
              }}
            />
          </Grid2>
          <Grid2 xs={12} md={5} order={{ xs: 1, md: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Step 2: Editing Data Assignments
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'left' }}>
              Assign your data values by editing the fields.
              <br />
              Click the{' '}
              <Typography component="span" sx={{ color: '#FF5733' }}>
                pencil icon
              </Typography>{' '}
              to start editing.
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 xs={12}>
          <Box
            sx={{
              width: '90%',
              height: '2px',
              backgroundColor: '#cccccc',
              margin: '10px auto',
            }}
          />
        </Grid2>
  
        {/* Step 3 */}
        <Grid2 container spacing={3} justifyContent="center" alignItems="flex-start">
          <Grid2 xs={12} md={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Step 3: Saving your Configuration
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'left' }}>
              Once you're happy with your configuration, don't forget to{' '}
              <Typography component="span" sx={{ color: '#FF5733' }}>
                save
              </Typography>{' '}
              and head to the dashboard.
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={5}>
            <Box
              component="img"
              src="/save-configuration.png"
              alt="Save Configuration"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
                border: '2px solid #444',
                display: 'block',
              }}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
  
  
  



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" gap={2} pb={4}>
        <ConfigManager onConfigSelect={setSelectedConfig} />

        {/* Conditionally render based on isEditing state */}
        {selectedConfig && (
          isEditing ? (
            <CANDataAssignment selectedConfig={selectedConfig} setIsEditing={setIsEditing} />
          ) : (
            <CANDataView selectedConfig={selectedConfig} setIsEditing={setIsEditing} />
          )
        )}
      </Box>

      <InstructionsModal open={open} onClose={handleClose}>
        {modalContent}
      </InstructionsModal>

      {/* Help Button */}
      <HelpButton onClick={() => setOpen(true)} />


    </ThemeProvider>
  );
}

