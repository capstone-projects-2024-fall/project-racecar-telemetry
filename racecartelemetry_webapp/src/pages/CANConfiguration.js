// @pages/CANConfiguration.js

import React, { useState } from 'react'
import CANDataAssignment from '@components/CANDataAssignment'
import ConfigManager from '@components/ConfigManager'
import Box from '@mui/material/Box';
import CANDataView from '@components/CANDataView';


export default function CANConfigurationPage() {
  const [selectedConfig, setSelectedConfig] = useState("")
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
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
    </>
  );
}

