import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import AddEmployee from "./Modal/AddEmp";
import { Employee } from "../../../Helper/Type";
import { Alert, ToastService } from "../../../Helper/Alert";

const itemsPerPage = 6;
function Home(props: any) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

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
    // const empData = JSON.parse(localStorage.getItem('Employees') || '[]');
    // const filteredData = empData.filter((employee: Employee) => employee.created_by === userData.id) || [];

    // localStorage.setItem(`Employees_${userData.id}`, JSON.stringify(filteredData))
    const dataByUser = JSON.parse(localStorage.getItem(`Employees_${userData.id}`) || '[]');
    setData(dataByUser)
  }

  const deleteItem = (itemToDelete: { id: string, name: string }) => {
    Alert.confirm(`Are you sure you want to delete ${itemToDelete.name}?`).then((res) => {
      if (res) {
        const updatedItems = data.filter(item => item.id !== itemToDelete.id);
        localStorage.setItem(`Employees_${userData.id}`, JSON.stringify(updatedItems));
        setData(updatedItems);
        const message = `${itemToDelete.name} has been Remove`;
        ToastService.success(message);
      }
    }).catch((err) => {
      // Handle the error, if needed
    });
  }

  useEffect(() => {
    fetchData()
  }, [userData])


  const filterData = currentData.filter(item =>
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
          {data.length > 6 &&
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              shape="rounded"
              color="primary"
              onChange={(event, page) => setCurrentPage(page)} />
          }

        </div>
      </DashboardStyle>
    </>
  )
}

export default Home