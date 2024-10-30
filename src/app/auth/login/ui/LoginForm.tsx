'use client';

import { loginSchema } from '@/app/validations/financiero/loginSchema';
import { theme, themePalette } from '@/config/theme.config';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

type Inputs = {
    email: string;
    password: string;
}


export const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = (data: Inputs) => {
        console.log({ ...data });
    };

    return (
        <FormControl component="form" onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '21px',
            }}
        >
            <FormLabel htmlFor="email"
                sx={{
                    color: themePalette.black,
                    textAlign: 'left',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}
                required
            >
                Correo electrónico
            </FormLabel>
            <TextField
                id="email"
                error={!!errors.email}
                placeholder="Ingrese su correo electrónico"
                {...register('email')}
                required
            />
            {errors.email &&
                <Typography className="text-red-500"
                    style={{ textAlign: 'left' }}>{errors.email.message}
                </Typography>}
            <FormLabel htmlFor="password"
                sx={{
                    color: themePalette.black,
                    textAlign: 'left',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    marginTop: '20px',
                }}
                required
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
                required
            />
            <Link href="/auth/forgot-password"
                style={{
                    color: themePalette.secondary,
                    textDecoration: 'underline',
                    fontSize: '14px',
                    textAlign: 'right',
                    marginTop: '5px',
                    marginBottom: '10px',
                }}
            >
                Recuperar contraseña
            </Link>
            <Box
                sx={{
                    margin: '10px 0',
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
        </FormControl>
    )
}
