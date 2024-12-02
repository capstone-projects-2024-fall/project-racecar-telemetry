import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import theme from "@app/theme";

const DataDisplay = ({ data }) => {
  return (
    
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 500,
          margin: '10px auto',
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
