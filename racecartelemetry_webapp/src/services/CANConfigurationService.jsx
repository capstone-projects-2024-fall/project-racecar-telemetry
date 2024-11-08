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