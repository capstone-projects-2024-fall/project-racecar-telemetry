// DataDisplay.js
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { db } from '@firebaseConfig';  // Adjust the import path if necessary
import { ref, onValue, query, limitToLast } from 'firebase/database';

const DataDisplay = ({ canID }) => {
  const [canData, setCanData] = useState(null);

  useEffect(() => {
    if (!canID) return;

    // Reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // If your data is nested under unique keys (e.g., timestamps), fetch the last entry
    const dataQuery = query(dataRef, limitToLast(1));

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataQuery, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const latestData = Object.values(dataObj)[0];  // Get the latest data entry

        setCanData(latestData);
      } else {
        setCanData(null);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);

  // Prepare the data for rendering
  const data = canData
    ? [
        { label: 'Acceleration X', value: canData.X || 0 },
        { label: 'Acceleration Y', value: canData.Y || 0 },
        { label: 'Acceleration Z', value: canData.Z || 0 },
        { label: 'Temperature', value: canData.Temp || 0 },
      ]
    : [
        { label: 'Acceleration X', value: 0 },
        { label: 'Acceleration Y', value: 0 },
        { label: 'Acceleration Z', value: 0 },
        { label: 'Temperature', value: 0 },
      ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 500,
        margin: '20px auto',
        borderRadius: 2,
        boxShadow: 3,
        padding: 2,
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Car Telemetry Data
      </Typography>
      <Table aria-label="car telemetry data">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                borderBottom: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              Metric
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                borderBottom: '2px solid',
                borderColor: 'primary.main',
              }}
            >
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                '&:nth-of-type(odd)': { backgroundColor: 'grey.100' },
                '&:hover': { backgroundColor: 'grey.200' },
              }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                {item.label}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                {item.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataDisplay;
