import { useEffect, useState } from 'react';

export default function TestData() {
  const [telemetryData, setTelemetryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/testdata');  // API route for fetching test data
        const result = await res.json();
        setTelemetryData(result.data || []); // Assuming API response has a 'data' field
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Test Data</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {telemetryData.map((item, index) => (
            <li key={index}>
              <strong>{item.label}</strong>: {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
