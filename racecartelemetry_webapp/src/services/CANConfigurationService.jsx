export const fetchConfigs = async () => {
  const response = await fetch('/api/CANConfigurationAPI?collectionName=canConfigs', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  return result.data;
};

export const createConfig = async (configName) => {
  const response = await fetch('/api/CANConfigurationAPI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: configName,
      collectionName: 'canConfigs',
    }),
  });
  return await response.json();
};

export const saveCANData = async (selectedConfig, rows) => {

  const response = await fetch('/api/CANConfigurationAPI', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collectionName: 'canConfigs',
      docId: selectedConfig,
      data: rows 
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to save data: ${response.statusText}`);
  }

  return await response.json();

};

export const fetchCANData = async (selectedConfig) => {
  const response = await fetch(`/api/CANConfigurationAPI?collectionName=canConfigs&docId=${selectedConfig}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return await response.json();
};


export const deleteConfig = async (configId) => {
  const response = await fetch('/api/CANConfigurationAPI', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ docId: configId, collectionName: 'canConfigs' })
  })
  return await response.json()
}

export const deleteConfigRow = async (selectedConfig, canId) => {
  const response = await fetch('/api/CANConfigurationAPI', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collectionName: 'canConfigs',
      docId: selectedConfig,
      action: 'deleteRow',
      canId
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to delete row: ${response.statusText}`);
  }

  return await response.json();
};

export const updateCurrentConfig = async (configName) => {
  const response = await fetch('/api/CANConfigurationAPI', {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      docId: "currentConfig",
      collectionName: "canConfigs",
      data: { current: configName }, 
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update current config: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchDataChannelsGroupedByCanID = async (selectedConfig) => {
  const response = await fetch(`/api/CANConfigurationAPI?collectionName=canConfigs&docId=${selectedConfig}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  // console.log("1. Fetched data for selectedConfig:", data);

  const groupedDataChannels = {};

  if (data) {
    Object.entries(data).forEach(([canID, canData]) => {
      if (canData?.DataChannels) {
        groupedDataChannels[canID] = Object.keys(canData.DataChannels); // Map canID to its channels
      }
    });
  } else {
    console.warn(`No data found for selectedConfig: ${selectedConfig}`);
  }

  // console.log("Grouped Data Channels by CAN ID:", groupedDataChannels); // Debug
  return groupedDataChannels;
};


export const getCurrentConfig = async () => {
  const response = await fetch(`/api/CANConfigurationAPI?collectionName=canConfigs&docId=currentConfig`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch current config: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("!1111", data);
  return data?.current || null; // Return the current config name
};