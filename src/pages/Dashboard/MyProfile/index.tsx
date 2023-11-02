import { DashboardStyle } from '../Home/style'
import { Avatar, Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DateFormat, formatName } from '../../../Helper/CommonFunction'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import { ToastService } from '../../../Helper/Alert';
import { ChangePasswordError } from '../../../Helper/Type';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import MuiPasswordField from '../../../components/MuiPasswordField';

function MyProfile({ userData, getUserData }: any) {
  const [openField, setOpenField] = useState(true)

  const [formData, setFormData] = useState({
    password: '',
    conPassword: ''
  });

  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')

  useEffect(() => {
    setName(userData.fullName)
  }, [userData])

  const handelEditOpen = () => {
    setOpenField(!openField)
  }


  const [errors, setErrors] = useState<ChangePasswordError>({
    passwordError: '',
    confirmPasswordError: '',
  });

  const navigate = useNavigate()

  const handleMyTaskClick = () => {
    navigate('/employees');
  };

  const validateForm = () => {
    let hasError: boolean = false
    const newErrors: ChangePasswordError = {
      passwordError: '',
      confirmPasswordError: '',
    };

    if (!formData.password) {
      newErrors.passwordError = 'Password is required';
      hasError = true
    }
    if (!formData.conPassword) {
      newErrors.confirmPasswordError = 'Password is required';
      hasError = true
    }
    if (formData.password !== formData.conPassword) {
      newErrors.confirmPasswordError = 'Passwords do not match';
      hasError = true
    }

    setErrors(newErrors);

    return hasError;
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validateForm();

    if (!hasError) {
      const existingData = JSON.parse(localStorage.getItem('users') || '[]');

      const index = existingData.findIndex((item: any) => item.id === userData.id);

      if (index !== -1) {
        const hasSamePass = existingData[index].password === formData.password;
        console.log(hasSamePass);


        if (hasSamePass) {
          const message = 'You enter old password';
          ToastService.warning(message);
          return;
        }

        existingData[index].password = formData.password;
        localStorage.setItem('users', JSON.stringify(existingData));
        ToastService.success('Password update successfully!');
        setFormData({
          password: '',
          conPassword: '',
        });

        setErrors({
          passwordError: '',
          confirmPasswordError: '',
        });

      } else {
        ToastService.error('Item not found in local storage');
      }
    }

  };

  const handelNameEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (name) {
      const existingData = JSON.parse(localStorage.getItem('users') || '[]');
      const index = existingData.findIndex((item: any) => item.id === userData.id);
      if (index !== -1) {
        existingData[index].fullName = name;
        localStorage.setItem('users', JSON.stringify(existingData));
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          parsedUserData.fullName = name;

          localStorage.setItem('userData', JSON.stringify(parsedUserData));
        }
        ToastService.success('Name update successfully!');
        getUserData()
        setOpenField(!openField)
      } else {
        ToastService.error('Item not found in local storage');
      }
    } else {
      setNameError('Please enter a name')
    }
  }

  return (
    <DashboardStyle>
      <div className='card'>
        {userData ?
          <div className='details-wrap fd-c'>
            <div className='left'>
              {userData.fullName &&
                <Avatar sx={{
                  width: 130,
                  height: 130,
                  bgcolor: '#1976d2',
                  '@media(max-width:767px)': {
                    width: 90,
                    height: 90,
                  }
                }}>{formatName(userData.fullName)}</Avatar>
              }

              {openField ?
                <Box className='name-box'>
                  <Typography component='h1' className='e-name'>{userData.fullName}</Typography>
                  <IconButton onClick={handelEditOpen}>
                    <EditIcon />
                  </IconButton>
                </Box>
                :
                <form onSubmit={handelNameEdit}>
                  <Box className='form-box'>
                    <TextField
                      type='text'
                      size='small'
                      value={name}
                      onChange={handleNameChange}
                      error={!!nameError}
                      helperText={nameError}
                    />
                    <IconButton className='btn ok' type='submit'>
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton onClick={handelEditOpen} className='btn close'>
                      <CancelIcon />
                    </IconButton>

                  </Box>
                </form>
              }

            </div>
            <div className='right w-100'>
              <Grid container spacing={2}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography component='p' className='text'>Phone: <span>{userData.phone}</span></Typography>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography component='p' className='text'>Email: <span>{userData.email}</span></Typography>

                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Typography component='p' className='text'>Date of joining: <span>{DateFormat(userData.createdAt)}</span></Typography>
                </Grid>
              </Grid>
            </div>
          </div>
          :
          'No data'
        }
        <Box sx={{ marginTop: '25px' }}>
          <Typography component='h1' sx={{ marginBottom: '25px' }}>Change Password</Typography>
          <form onSubmit={handelSubmit}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                {/* <TextField
                  label='New password'
                  type='password'
                  fullWidth
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.passwordError}
                  helperText={errors.passwordError}
                /> */}
                <MuiPasswordField
                  label='New password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.passwordError}
                  helperText={errors.passwordError}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <MuiPasswordField
                  label='Conferm password'
                  name='conPassword'
                  value={formData.conPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPasswordError}
                  helperText={errors.confirmPasswordError}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button variant='outlined' sx={{ float: 'right' }} type='submit'>Update Password</Button>
              </Grid>
            </Grid>
          </form>
        </Box>

        <div className='back-button'>
          <Button startIcon={<ArrowBackIcon />} onClick={handleMyTaskClick}>Go back</Button>
        </div>

      </div>
    </DashboardStyle>
  )
}

export default MyProfile