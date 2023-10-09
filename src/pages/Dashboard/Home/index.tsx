import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import AddEmployee from "./Modal/AddEmp";

function Home() {
  const [open, setOpen] = useState(false)

  const handelOpen = () => {
    setOpen(true)
  }

  const handelClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AddEmployee open={open} handelClose={handelClose} />
      <DashboardStyle>
        <div className="header_part">
          <Typography component='h1'>Employees List (10)</Typography>
          <div className='head-right'>
            <TextField type="search" label="Search employee.." size="small" />
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handelOpen}>Add Employee</Button>
          </div>
        </div>

        <div className="list_part">
          <UserList />
        </div>
        <div className="pagination">
          <Pagination count={10} shape="rounded" />
        </div>
      </DashboardStyle>
    </>
  )
}

export default Home