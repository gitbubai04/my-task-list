import React, { useState } from 'react'
import { AuthSection, SubmitBtn } from '../style'
import TextField from '@mui/material/TextField'
import { FormDataError, FormDataType } from '../../../Helper/Type';
import { SCREEN } from '..';
import { ToastService } from '../../../Helper/Alert';

function Signup(props: any) {
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormDataError>({
    fullNameError: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const validateForm = () => {
    let hasError: boolean = false
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    const newErrors: FormDataError = {
      fullNameError: '',
      phoneError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (!formData.fullName) {
      newErrors.fullNameError = 'Full Name is required';
      hasError = true
    }

    if (!formData.phone) {
      newErrors.phoneError = 'Phone is required';
      hasError = true
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phoneError = 'Invalid phone number';
      hasError = true
    }

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
    if (formData.password !== formData.confirmPassword) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validateForm();

    if (!hasError) {
      const userId = Date.now().toString();
      const userData = {
        id: userId,
        createdAt: new Date().toISOString(),
        ...formData,
      };

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some((user: FormDataType) => user.email === formData.email);
      const phoneExists = existingUsers.some((user: FormDataType) => user.phone === formData.phone);

      if (emailExists || phoneExists) {
        const message = 'Email or Phone already exists';
        ToastService.warning(message);
        return;
      }

      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      setFormData({
        fullName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setErrors({
        fullNameError: '',
        phoneError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
      const message = 'Account has been created';
      ToastService.success(message);
      props.setScreen(SCREEN.LOGIN)
    }
  };

  return (
    <AuthSection>
      <h1 className='head-name'>Create Account</h1>
      <form action="" style={{ width: '100%' }} onSubmit={handleSubmit}>
        <div className='form-field'>
          <TextField
            InputProps={
              { style: { borderRadius: "15px", height: 58 } }
            }
            fullWidth
            id=""
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!errors.fullNameError}
            helperText={errors.fullNameError}
          />
        </div>
        <div className='form-field'>
          <TextField
            InputProps={
              { style: { borderRadius: "15px", height: 58 } }
            }
            fullWidth
            id=""
            name='phone'
            type='number'
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phoneError}
            helperText={errors.phoneError}
          />
        </div>
        <div className='form-field'>
          <TextField
            InputProps={{ style: { borderRadius: "15px", height: 58 } }}
            fullWidth
            id=""
            name='email'
            label="Email"
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
            label="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            error={!!errors.passwordError}
            helperText={errors.passwordError}
            type='password'
          />
        </div>
        <div className='form-field'>
          <TextField
            InputProps={{ style: { borderRadius: "15px", height: 58 } }}
            fullWidth
            id=""
            label="Confirm Password"
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPasswordError}
            helperText={errors.confirmPasswordError}
            type='password'
          />
        </div>
        <SubmitBtn type='submit'>Sign up</SubmitBtn>
      </form>
    </AuthSection>
  )
}

export default Signup