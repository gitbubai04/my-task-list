import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import AddEmployee from "./Modal/AddEmp";
import { Employee } from "../../../Helper/Type";

function Home(props: any) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')

  const { userData } = props;

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
    const filteredData = empData.filter((employee: Employee) => employee.created_by === userData.id) || [];

    localStorage.setItem(`Employees_${userData.id}`, JSON.stringify(filteredData))
    const dataByUser = JSON.parse(localStorage.getItem(`Employees_${userData.id}`) || '[]');

    setData(dataByUser)
  }

  const deleteItem = (itemToDelete: string) => {
    const updatedItems = data.filter(item => item.id !== itemToDelete);
    localStorage.setItem(`Employees_${userData.id}`, JSON.stringify(updatedItems));
    setData(updatedItems);
  };

  useEffect(() => {
    fetchData()
  }, [userData])


  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.address.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <AddEmployee open={open} handelClose={handelClose} fetchData={fetchData} adminId={userData.id} />
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
          <UserList data={filterData} deleteItem={deleteItem} />
        </div>
        <div className="pagination">
          <Pagination count={10} shape="rounded" />
        </div>
      </DashboardStyle>
    </>
  )
}

export default Home