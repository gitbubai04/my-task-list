import React, { useEffect, useState } from 'react'
import { EmpDataType } from '../../../Helper/Type';
import { DateFormat, calculateAge, formatName } from '../../../Helper/CommonFunction';
import { DashboardStyle } from './style';
import { Avatar, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function ViewEmp() {
    const [empData, setEmpData] = useState<EmpDataType | null>(null)
    useEffect(() => {
        const storedUserData = localStorage.getItem('EmployeeData');

        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setEmpData(parsedUserData);
        }
    }, [])

    const navigate = useNavigate();

    const handleMyTaskClick = () => {
        navigate('/employees');
    };

    return (
        <DashboardStyle>
            <div className='card'>
                {empData ?
                    <div className='details-wrap fd-c w-100'>
                        <div className='left'>
                            {empData.name &&
                                <Avatar sx={{ width: 130, height: 130, bgcolor: '#1976d2' }}>{formatName(empData.name)}</Avatar>
                            }
                            <Typography component='h1' className='e-name'>{empData.name}</Typography>
                            <Typography component='h1' className='name'>{empData.uId}</Typography>
                        </div>
                        <div className='right'>
                            <div className='right-divs'>
                                <div className='child'>
                                    <Typography component='p' className='text'>Date of Birth: <span>{DateFormat(empData.dob)}</span></Typography>
                                    <Typography component='p' className='text'>Phone: <span>{empData.phone}</span></Typography>
                                    <Typography component='p' className='text'>Email: <span>{empData.email}</span></Typography>
                                    <Typography component='p' className='text'>Date of joining: <span>{DateFormat(empData.createdAt)}</span></Typography>
                                </div>
                                <div className='child'>
                                    <Typography component='div' className='text'>
                                        Description:<br />
                                        <span>{empData.note}</span>
                                    </Typography>
                                    <Typography component='div' className='text'>
                                        Address:<br />
                                        <span>{empData.address}</span>
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    'No data'
                }
                <div className='back-button'>
                    <Button startIcon={<ArrowBackIcon />} onClick={handleMyTaskClick}>Go back</Button>
                </div>

            </div>
        </DashboardStyle>
    )
}

export default ViewEmp