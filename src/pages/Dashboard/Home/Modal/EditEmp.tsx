import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { EditModalType, Employee, ModalType } from '../../../../Helper/Type';
import { Grid, TextField } from '@mui/material';
import { StyleModalBody } from './style';
import { ToastService } from '../../../../Helper/Alert';

function EditEmp({ open, handelClose, fetchData, adminId, editData }: EditModalType) {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        note: ''
    });

    const [fieldError, setFieldError] = React.useState({
        nameError: '',
        dobError: '',
        emailError: '',
        phoneError: '',
        addressError: '',
        noteError: ''
    })

    const validateForm = () => {
        let hasError: boolean = false
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        let newErrors = {
            nameError: '',
            dobError: '',
            emailError: '',
            phoneError: '',
            addressError: '',
            noteError: ''
        };

        if (!formData.name) {
            newErrors.nameError = 'Full Name is required';
            hasError = true
        }

        if (!formData.address) {
            newErrors.addressError = 'Address is required';
            hasError = true
        }

        if (!formData.note) {
            newErrors.noteError = 'Note is required';
            hasError = true
        }

        if (!formData.dob) {
            newErrors.dobError = 'Date of birth is required';
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

        setFieldError(newErrors);

        return hasError;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hasError = validateForm();
        if (!hasError) {
            const existingData = JSON.parse(localStorage.getItem(`Employees_${adminId}`) || '[]');

            const index = existingData.findIndex((item: any) => item.id === formData.id);

            if (index !== -1) {
                existingData[index] = formData;
                localStorage.setItem(`Employees_${adminId}`, JSON.stringify(existingData));
                fetchData()
                handelClose();
                ToastService.success('Item update successfully!');
            } else {
                ToastService.error('Item not found in local storage');
            }
        }
    };

    useEffect(() => {
        setFormData(editData)
    }, [editData])

    return (
        <Dialog
            open={open}
            onClose={handelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Edit Employee
            </DialogTitle>
            <form onSubmit={handelSubmit}>
                <StyleModalBody>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <TextField
                                name='name'
                                fullWidth
                                label='Full name'
                                value={formData.name}
                                onChange={handleChange}
                                error={!!fieldError.nameError}
                                helperText={fieldError.nameError}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} >
                            <TextField
                                name='dob'
                                fullWidth
                                type='date'
                                label='Date of birth'
                                focused
                                value={formData.dob}
                                onChange={handleChange}
                                error={!!fieldError.dobError}
                                helperText={fieldError.dobError}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name='email'
                                fullWidth
                                label='Email address'
                                value={formData.email}
                                disabled
                                onChange={handleChange}
                                error={!!fieldError.emailError}
                                helperText={fieldError.emailError}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                name='phone'
                                fullWidth
                                label='Phone'
                                value={formData.phone}
                                onChange={handleChange}
                                error={!!fieldError.phoneError}
                                helperText={fieldError.phoneError}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                name='note'
                                fullWidth
                                multiline
                                label='Note'
                                value={formData.note}
                                onChange={handleChange}
                                error={!!fieldError.noteError}
                                helperText={fieldError.noteError}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                name='address'
                                fullWidth
                                multiline
                                label='Address'
                                value={formData.address}
                                onChange={handleChange}
                                error={!!fieldError.addressError}
                                helperText={fieldError.addressError}
                            />
                        </Grid>

                    </Grid>
                </StyleModalBody>
                <DialogActions>
                    <Button autoFocus variant='contained' type='submit'>Update</Button>
                    <Button onClick={handelClose} autoFocus color='error'>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditEmp