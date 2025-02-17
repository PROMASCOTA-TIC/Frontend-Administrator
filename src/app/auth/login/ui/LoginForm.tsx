'use client';

import { loginSchema } from '@/validations/financiero/loginSchema';
import { theme, themePalette } from '@/config/theme.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormLabel, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { URL_BASE } from '@/config/config';
import Notification from '@/components/ui/notifications/Notification';
import { useRouter } from 'next/navigation';

type Inputs = {
    email: string;
    password: string;
}


export const LoginForm = () => {

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const handleClickShowPassword: () => void = () => setShowPassword((show) => !show);

    const onSubmit = async (data: Inputs) => {
        try {
            const response = await axios.post(`${URL_BASE}auth/login-admin`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            if (response.status === 200 || response.status === 201) {
                setNotification({
                    open: true,
                    message: 'Inicio de sesión exitoso',
                    type: 'success',
                });
            }
            const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
            document.cookie = `auth_cookie=${response.data.token}; expires=${expirationTime.toUTCString()}; path=/`;
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.id);
            setNotification({
                open: true,
                message: 'Inicio de sesión exitoso',
                type: 'success',
            });
            router.push('/')
        } catch (error) {
            setNotification({
                open: true,
                message: 'Credenciales incorrectas',
                type: 'error',
            });
            console.log('error',error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '21px',
            }}
            noValidate
        >
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
            <FormLabel htmlFor="email"
                sx={{
                    color: themePalette.black,
                    textAlign: 'left',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}
            >
                Correo electrónico
            </FormLabel>
            <TextField
                id="email"
                error={!!errors.email}
                placeholder="Ingrese su correo electrónico"
                {...register('email')}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "gray", borderRadius: "10px" },
                        "&:hover fieldset": { borderColor: themePalette.secondary },
                        "&.Mui-focused fieldset": { borderColor: themePalette.secondary },
                    },
                    backgroundColor: "white",
                    borderRadius: "10px",
                }}
            />
            {errors.email &&
                <Typography className="text-red-500 text-fs12"
                    style={{ textAlign: 'left' }}>{errors.email.message}
                </Typography>
            }
            <FormLabel htmlFor="password"
                sx={{
                    color: themePalette.black,
                    textAlign: 'left',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    marginTop: '20px',
                }}
            >
                Contraseña
            </FormLabel>
            <OutlinedInput
                id="password"
                error={!!errors.password}
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                inputProps={{ placeholder: "Ingrese su contraseña" }}
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "gray", borderRadius: "10px" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: themePalette.secondary },
                    backgroundColor: "white",
                    borderRadius: "10px",
                }}
            />
            {errors.password &&
                <Typography className="text-red-500 text-fs12"
                    style={{ textAlign: 'left' }}>{errors.password.message}
                </Typography>
            }
            <Box
                sx={{
                    margin: '34px 0 15px 0',
                }}
            >
                <Button
                    variant="contained"
                    type="submit"
                    sx={
                        {
                            backgroundColor: theme.palette.primary.main,
                            color: themePalette.cwhite,
                            borderRadius: '20px',
                            padding: '5px 0',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            width: { xs: '40%', md: '50%' },
                        }
                    }
                >
                    Iniciar Sesión
                </Button>
            </Box>
        </Box>
    )
}
