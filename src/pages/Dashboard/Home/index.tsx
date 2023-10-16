import { Button, Pagination, TextField, Typography } from "@mui/material"
import { DashboardStyle } from "./style"
import UserList from "./UserLIst"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from "react";
import AddEmployee from "./Modal/AddEmp";
import { Employee } from "../../../Helper/Type";
import { Alert, ToastService } from "../../../Helper/Alert";
import { useNavigate } from "react-router-dom";
import EditEmp from "./Modal/EditEmp";

const itemsPerPage = 6;
function Home(props: any) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [Editopen, setEditOpen] = useState(false)
  const [data, setData] = useState<Employee[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const [editData, setEditData] = useState({})

  const { userData } = props;

  const handelOpen = () => {
    setOpen(true)
  }

  const handelEditOpen = (itemToDelete: { id: string, name: string }) => {
    setEditOpen(true)
    const editData = data.find((item) => itemToDelete.id === item.id);
    setEditData(editData || {});
    console.log(editData);
  }

  const handelClose = () => {
    setOpen(false)
  }

  const handelEditClose = () => {
    setEditOpen(false)
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

  const viewItem = (itemToDelete: { id: string, name: string }) => {
    if (data) {
      const existingUsers = JSON.parse(localStorage.getItem(`Employees_${userData.id}`) || '[]');
      const employee = existingUsers.find(
        (u: any) => u.id === itemToDelete.id
      );

      if (employee) {
        localStorage.setItem('EmployeeData', JSON.stringify(employee));
        const message = `${itemToDelete.name}'s Data fetch successfully`;
        ToastService.success(message);
        navigate(`/employee/${itemToDelete.name}_${itemToDelete.id}`)

      } else {
        const message = 'Employee not found';
        ToastService.error(message);
      }
    }
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
      <EditEmp open={Editopen} handelClose={handelEditClose} fetchData={fetchData} adminId={userData.id} editData={editData}/>
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
          <UserList data={filterData} deleteItem={deleteItem} viewItem={viewItem} handelEditOpen={handelEditOpen} />
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