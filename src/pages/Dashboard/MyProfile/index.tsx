import { DashboardStyle } from '../Home/style'
import { Avatar, Button, Typography } from '@mui/material'
import { DateFormat, formatName } from '../../../Helper/CommonFunction'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function MyProfile({ userData }: any) {
  const navigate = useNavigate()

  const handleMyTaskClick = () => {
    navigate('/employees');
  };

  return (
    <DashboardStyle>
      <div className='card'>
        {userData ?
          <div className='details-wrap'>
            <div className='left'>
              {userData.fullName &&
                <Avatar sx={{ width: 130, height: 130, bgcolor: '#1976d2' }}>{formatName(userData.fullName)}</Avatar>
              }
              <Typography component='h1' className='e-name'>{userData.fullName}</Typography>
            </div>
            <div className='right'>
              <div className='right-divs'>
                <div className='child'>

                  <Typography component='p' className='text'>Phone: <span>{userData.phone}</span></Typography>
                  <Typography component='p' className='text'>Email: <span>{userData.email}</span></Typography>
                  <Typography component='p' className='text'>Date of joining: <span>{DateFormat(userData.createdAt)}</span></Typography>
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

export default MyProfile