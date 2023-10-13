import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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


export default function UserList(props) {
    const { data, deleteItem,viewItem } = props;
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ?
                        <>
                            {data.map((e, i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell component="th" scope="row">
                                        {e.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{e.phone}</StyledTableCell>
                                    <StyledTableCell align="right">{e.email}</StyledTableCell>
                                    <StyledTableCell align="right">{e.address}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton>
                                            <ModeEditOutlineOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => viewItem({ id: e.id, name: e.name })}>
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteItem({ id: e.id, name: e.name })}>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </>
                        :
                        <Box sx={{
                            height: '80px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            right: '-151%',
                        }}>No Data!</Box>
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
}