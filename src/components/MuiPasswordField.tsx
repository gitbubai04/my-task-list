import { IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { PassWrap } from './style';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type Props = {
    value: string;
    onChange: any;
    error: any;
    helperText: string
    name: string;
    label: string;
}

function MuiPasswordField(props: Props) {
    const { value, onChange, error, helperText, name, label } = props

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <PassWrap>
            <TextField
                InputProps={{ style: { borderRadius: "15px", height: 58 } }}
                fullWidth
                id=""
                type={showPassword ? 'text' : 'password'}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={helperText}
            />

            <IconButton
                className='eyeBtn'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </PassWrap>
    )
}

export default MuiPasswordField