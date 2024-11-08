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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: rows,
        collectionName: 'canConfigs',
        docId: selectedConfig
      })
    });
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
  
