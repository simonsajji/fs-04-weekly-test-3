import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const baseURL = "https://randomuser.me/api/?results=20";

export default function CustomTable() {
  const [users,setUsers] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setUsers(response.data?.results);
    });
  }, []);

  console.log(users);
  if(!users) return null
    return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row,idx) => {
            return(
              <StyledTableRow >
            
              <StyledTableCell align="center">{row.name?.first} {row.name?.last}</StyledTableCell>
              <StyledTableCell align="center">{row?.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.gender}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center"><img src={row.picture.thumbnail} alt="no img" /></StyledTableCell>
            </StyledTableRow>
            )
            
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}