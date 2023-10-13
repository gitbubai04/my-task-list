import React, { useState } from 'react'
import { AuthSection, SubmitBtn } from '../style'
import TextField from '@mui/material/TextField'
import { LoginErorType, LoginFormType } from '../../../Helper/Type'
import { ToastService } from '../../../Helper/Alert'
import { useNavigate } from 'react-router-dom'

function Login(props:any) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormType>({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState<LoginErorType>({
    emailError: '',
    passwordError: '',
  });

  const validateForm = () => {
    let hasError: boolean = false
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const newErrors: LoginErorType = {
      emailError: '',
      passwordError: '',
    };

    if (!formData.email) {
      newErrors.emailError = 'Email is required';
      hasError = true
    } else if (!emailRegex.test(formData.email)) {
      newErrors.emailError = 'Invalid email address';
      hasError = true
    }

    if (!formData.password) {
      newErrors.passwordError = 'Password is required';
      hasError = true
    }
    setErrors(newErrors);

    return hasError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validateForm();

    if (!hasError) {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');      
      const user = existingUsers.find(        
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        const message = 'You are successfully login';
        ToastService.success(message);
        props.setAuthenticated(true);
        navigate('/employees')

      } else {
        const message = 'Please enter a valid email or password';
        ToastService.error(message);
      }
    }
  };

  return (
    <AuthSection>
      <h1 className='head-name'>Login</h1>
      <form action="" style={{ width: '100%' }} onSubmit={handleSubmit}>
        <div className='form-field'>
          <TextField
            InputProps={{ style: { borderRadius: "15px", height: 58 } }}
            fullWidth
            id=""
            label="Email"
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.emailError}
            helperText={errors.emailError}
          />
        </div>
        <div className='form-field'>
          <TextField
            InputProps={{ style: { borderRadius: "15px", height: 58 } }}
            fullWidth
            id=""
            type='password'
            label="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            error={!!errors.passwordError}
            helperText={errors.passwordError}
          />
        </div>
        <SubmitBtn type='submit'>Login</SubmitBtn>
      </form>
    </AuthSection>
  )
}

export default Login