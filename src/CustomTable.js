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
import { Button } from '@mui/material';

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
  const [users, setUsers] = React.useState(null);
  const [filteredusers, setFilteredUsers] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setUsers(response.data?.results);
      setFilteredUsers(response.data?.results);
    });
  }, []);

  console.log(users);
  if (!users) return null
  return (
    <>
      <Button onClick={()=>{
        axios.get(baseURL).then((response) => {
          setUsers(response.data?.results);
          setFilteredUsers(response.data?.results);
        });

      }} >ALL</Button>
      <Button onClick={() => {
         axios.get(baseURL).then((response) => {
          setUsers(response.data?.results);
        });
        const lowerCaseGender = 'male'.toLowerCase();
        const filteredGender = users.filter(
          user => user.gender.toLowerCase() === lowerCaseGender
        );
        console.log(filteredGender);
        setFilteredUsers(filteredGender);

      }
      } >Male</Button>
      <Button onClick={() => {
        
        const lowerCaseGender = 'female'.toLowerCase();
        const filteredGender = users.filter(
          user => user.gender.toLowerCase() === lowerCaseGender
        );
        console.log(filteredGender);
        setFilteredUsers(filteredGender);
      }}>Female</Button>
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
            {filteredusers?.map((row, idx) => {
              return (
                <StyledTableRow key={idx}>

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
    </>

  );
}