import { useState, useEffect } from 'react';

export default function TestData() {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/testdata');
        const result = await res.json();
        setTestData(result.data);  
      } catch (error) {
        console.error('Error fetching test data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div>
      <h2>Query data from API route</h2>
      {testData ? (
        <ul>
          <li>Beginning Accelerometer X: {testData.X}</li>
          <li>Beginning Accelerometer Y: {testData.Y}</li>
          <li>Beginning Accelerometer Z: {testData.Z}</li>
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
