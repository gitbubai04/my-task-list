import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ModalType } from '../../../../Helper/Type';
import { Grid, TextField } from '@mui/material';
import { StyleModalBody } from './style';
import { ToastService } from '../../../../Helper/Alert';

export default function AddEmployee({ open, handelClose, fetchData, adminId }: ModalType) {
    const [field, setField] = React.useState({
        name: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        note: ''
    })

    const [fieldError, setFieldError] = React.useState({
        nameError: '',
        dobError: '',
        emailError: '',
        phoneError: '',
        addressError: '',
        noteError: ''
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setField({ ...field, [name]: value });
    };

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

        if (!field.name) {
            newErrors.nameError = 'Full Name is required';
            hasError = true
        }

        if (!field.address) {
            newErrors.addressError = 'Address is required';
            hasError = true
        }

        if (!field.note) {
            newErrors.noteError = 'Note is required';
            hasError = true
        }

        if (!field.dob) {
            newErrors.dobError = 'Date of birth is required';
            hasError = true
        }

        if (!field.phone) {
            newErrors.phoneError = 'Phone is required';
            hasError = true
        } else if (!phoneRegex.test(field.phone)) {
            newErrors.phoneError = 'Invalid phone number';
            hasError = true
        }

        if (!field.email) {
            newErrors.emailError = 'Email is required';
            hasError = true
        } else if (!emailRegex.test(field.email)) {
            newErrors.emailError = 'Invalid email address';
            hasError = true
        }

        setFieldError(newErrors);

        return hasError;
    };

    function createUserID() {
        const nameAbbreviation = field.name.slice(0, 2).toUpperCase();
        const dobParts = field.dob.split('-');
        const day = dobParts[2];
        const month = dobParts[1];
        const year = dobParts[0];
        const userID = nameAbbreviation + day + month + year;

        return userID;
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const hasError = validateForm();
        const userId = createUserID();
        const id = Date.now().toString();
        if (!hasError) {
            const userData = {
                created_by: adminId,
                id: id,
                uId: userId,
                createdAt: new Date().toISOString(),
                ...field,
            };
            const existingUsers = JSON.parse(localStorage.getItem('Employees') || '[]');
            const emailExists = existingUsers.some((user: any) => user.email === field.email);
            const phoneExists = existingUsers.some((user: any) => user.phone === field.phone);

            if (emailExists || phoneExists) {
                const message = 'Email or Phone already exists';
                ToastService.warning(message);
                return;
            }

            existingUsers.push(userData);
            localStorage.setItem('Employees', JSON.stringify(existingUsers));

            setField({
                name: '',
                dob: '',
                email: '',
                phone: '',
                address: '',
                note: ''
            });

            setFieldError({
                nameError: '',
                dobError: '',
                emailError: '',
                phoneError: '',
                addressError: '',
                noteError: ''
            });

            const message = 'Employee has been created';
            ToastService.success(message);
            console.log(userData);
            handelClose()
            fetchData()
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Add Employee
            </DialogTitle>
            <form onSubmit={handelSubmit}>
                <StyleModalBody>
                    <Grid container spacing={2}>
                        <Grid item md={12}>
                            <TextField
                                name='name'
                                fullWidth
                                label='Full name'
                                onChange={handleChange}
                                value={field.name}
                                error={!!fieldError.nameError}
                                helperText={fieldError.nameError}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                name='dob'
                                fullWidth
                                type='date'
                                label='Date of birth'
                                focused
                                onChange={handleChange}
                                value={field.dob}
                                error={!!fieldError.dobError}
                                helperText={fieldError.dobError}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                name='email'
                                fullWidth
                                label='Email address'
                                onChange={handleChange}
                                value={field.email}
                                error={!!fieldError.emailError}
                                helperText={fieldError.emailError}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                name='phone'
                                fullWidth
                                label='Phone'
                                onChange={handleChange}
                                value={field.phone}
                                error={!!fieldError.phoneError}
                                helperText={fieldError.phoneError}
                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                name='note'
                                fullWidth
                                multiline
                                label='Note'
                                onChange={handleChange}
                                value={field.note}
                                error={!!fieldError.noteError}
                                helperText={fieldError.noteError}

                            />
                        </Grid>
                        <Grid item md={12}>
                            <TextField
                                name='address'
                                fullWidth
                                multiline
                                label='Address'
                                onChange={handleChange}
                                value={field.address}
                                error={!!fieldError.addressError}
                                helperText={fieldError.addressError}
                            />
                        </Grid>
                    </Grid>
                </StyleModalBody>
                <DialogActions>
                    <Button autoFocus variant='contained' type='submit'>Save</Button>
                    <Button onClick={handelClose} autoFocus color='error'>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}