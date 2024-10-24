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
import theme from "@app/theme";

const DataDisplay = ({ canID }) => {
  const [data, setData] = useState([
    { label: 'Acceleration X', value: 0 },
    { label: 'Acceleration Y', value: 0 },
    { label: 'Acceleration Z', value: 0 },
    { label: 'Temperature', value: 0 },
  ]);

  useEffect(() => {
    if (!canID) return;

    // Reference to the 'CANdata/canID' node in the database
    const dataRef = ref(db, `CANdata/${canID}`);

    // Set up the real-time listener using `onValue`
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const canData = snapshot.val();

        // Update the data array with new values from Firebase
        setData([
          { label: 'Acceleration X', value: canData.X || 0 },
          { label: 'Acceleration Y', value: canData.Y || 0 },
          { label: 'Acceleration Z', value: canData.Z || 0 },
          { label: 'Temperature', value: canData.Temp || 0 },
        ]);
      }
    });

    // Clean up the listener when the component unmounts or canID changes
    return () => unsubscribe();
  }, [canID]);

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
          Live Telemetry Data
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
                <Typography variant='h6' align='left' color={theme.palette.primary.main}>
                Metric
                </Typography>
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
                <Typography variant='h6' align='right' color={theme.palette.primary.main}> 
                Value
                </Typography>
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
