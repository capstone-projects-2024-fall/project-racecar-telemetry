// @pages/CANConfiguration.js

import React, { useState } from 'react'
import CANDataAssignment from '@components/CANDataAssignment'
import ConfigManager from '@components/ConfigManager'
import Box from '@mui/material/Box';


export default function CANConfigurationPage() {
  const [selectedConfig, setSelectedConfig] = useState("")

  return (
    <>
    <Box display="flex" flexDirection="column" gap={2} pb={4}>
      <ConfigManager onConfigSelect = {setSelectedConfig} />

      {selectedConfig && <CANDataAssignment selectedConfig = {selectedConfig}/>}
      </Box>
    </>

  );
}

