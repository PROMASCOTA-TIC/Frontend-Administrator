'use client'

import { loginSchema } from "@/app/validations/loginSchema";
import { theme, themePalette } from "@/config/theme.config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, FormLabel, Grid2, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoVerde from "@/assets/images/logoVerde.png";
import Imagen from "@/assets/images/Foto.png";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
}

export default function Login() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit = (data: Inputs) => {
    console.log({ ...data });
  };

  return (
    <div>
      <Grid2 container
        sx={{
          textAlign: 'center',
          height: '100vh',
          fontFamily: theme.typography.fontFamily,
        }} >
        <Grid2 size={{xs: 12, md: 7}}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: { xs: '20px', md: '0' },
          }} >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginBottom: { xs: '20px', md: '34px' },
              marginTop: { xs: '10px', md: '21px' }
            }} >
            <Typography
              sx={{
                fontSize: { xs: '32px', md: '42px' },
                color: theme.palette.primary.main,
              }}>
              PROMASCOTA
            </Typography>
            <Image src={LogoVerde}
              style={{
                width: '80px',
                height: '80px',
                marginTop: '8px',
              }}
              alt="logo"
              priority
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(70, 218, 105, 0.08)',
              padding: { xs: '10px 20px', md: '5px 30px' },
              width: { xs: '90%', sm: '80%', lg: '60%' },
              borderRadius: '20px',
            }}>
            <Typography
              sx={{
                fontSize: { xs: '28px', md: '36px' },
                fontWeight: 'bold',
                margin: { xs: '20px 0px', md: '34px 0px' },
                color: theme.palette.primary.main,
              }}
            >
              Inicio de sesión
            </Typography>
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
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{ placeholder: "Ingrese su contraseña" }}
                required
              />
              <Link href="#"
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
          </Box>
        </Grid2>
        <Grid2 size={{xs: 0, md: 5}}
          sx={{
            display: { xs: 'none', md: 'block' },
            margin: 0,
            padding: 0,
            position: 'relative',
            '::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 64, 64, 0.4)',
              pointerEvents: 'none',
            }
          }}>
          <Image src={Imagen} alt="imagen"
            style={{
              margin: 0,
              padding: 0,
              width: '100%',
              height: '100vh',
            }}
            priority
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
