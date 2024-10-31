// @pages/CANConfiguration.js

import React, { useState } from 'react'
import CANDataAssignment from '@components/CANDataAssignment'
import ConfigManager from '@components/ConfigManager'

export default function CANConfigurationPage() {
  const [selectedConfig, setSelectedConfig] = useState("")

  return (
    <>
      <ConfigManager onConfigSelect = {setSelectedConfig} />
      {selectedConfig && <CANDataAssignment selectedConfig = {selectedConfig}/>}
    </>

  );
}

