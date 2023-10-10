import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import AddEmployee from "./Modal/AddEmp";
import { Employee } from "../../../Helper/Type";

function Home() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')

  const handelOpen = () => {
    setOpen(true)
  }

  const handelClose = () => {
    setOpen(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setSearchValue(value)
  }

  const fetchData = () => {
    const empData = JSON.parse(localStorage.getItem('Employees') || '[]');
    setData(empData)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())||
    item.phone.toLowerCase().includes(searchValue.toLowerCase())||
    item.email.toLowerCase().includes(searchValue.toLowerCase())||
    item.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <AddEmployee open={open} handelClose={handelClose} fetchData={fetchData} />
      <DashboardStyle>
        <div className="header_part">
          <Typography component='h1'>Employees List {data.length > 0 && <>({data.length})</>}</Typography>
          <div className='head-right'>
            <TextField type="search" label="Search employee.." size="small" onChange={handleSearchChange}
              value={searchValue} />
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handelOpen}>Add Employee</Button>
          </div>
        </div>

        <div className="list_part">
          <UserList data={filterData} />
        </div>
        <div className="pagination">
          <Pagination count={10} shape="rounded" />
        </div>
      </DashboardStyle>
    </>
  )
}

export default Home