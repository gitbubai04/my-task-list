import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"

function Home() {
  return (
    <DashboardStyle>
      <div className="header_part">
        <Typography component='h1'>Employees List (10)</Typography>
        <div className='head-right'>
          <TextField type="search" label="Search employee.." size="small"/>
          <Button variant="contained">Add Employee</Button>
        </div>
      </div>

      <div className="list_part">
        <UserList />
      </div>
      <div className="pagination">
        <Pagination count={10} shape="rounded" />
      </div>
    </DashboardStyle>
  )
}

export default Home