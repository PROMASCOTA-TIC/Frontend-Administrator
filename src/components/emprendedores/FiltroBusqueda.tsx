"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, TextField, Grid2, colors } from "@mui/material";
import "/src/assets/styles/emprendedores/general.css";
import { themePalette } from "@/config/theme.config";


interface DateFormValues {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface NameFormValues {
  ownerName: string;
}

export const FiltroBusqueda = () => {
  const {
    handleSubmit: handleDateSubmit,
    control: controlDate,
    watch: watchDate,
    formState: { errors: dateErrors },
  } = useForm<DateFormValues>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const {
    handleSubmit: handleNameSubmit,
    control: controlName,
    formState: { errors: nameErrors },
  } = useForm<NameFormValues>({
    defaultValues: {
      ownerName: "",
    },
  });

  const startDate = watchDate("startDate");

  const onDateSubmit = (data: DateFormValues) => {
    console.log("Filtrado por fechas:", data);
  };

  const onNameSubmit = (data: NameFormValues) => {
    console.log("Filtrado por nombre de propietario:", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        className="form-container"
        sx={{
          marginLeft: "250px", // Ajuste por el sidebar
          padding: "20px",
          maxWidth: "calc(100% - 250px)",
          boxSizing: "border-box",
        }}
      >
        {/* Formulario de fechas */}
        <form
          onSubmit={handleDateSubmit(onDateSubmit)}
          style={{ marginBottom: "10px" }}
        >
          <Grid2 container spacing={2}>
            {/* Fecha de inicio */}
            <Grid2 size={{xs:12,sm:6,md:4}}>
              <Controller
                name="startDate"
                control={controlDate}
                rules={{ required: "La fecha de inicio es obligatoria" }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      format="DD/MM/YYYY"
                      label="Fecha de inicio"
                      sx={{ width: "100%" }}
                      onChange={(date) => field.onChange(date)}
                    />
                    {dateErrors.startDate && (
                      <Typography color="error" variant="body2">
                        {dateErrors.startDate.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid2>

            {/* Fecha de fin */}
            <Grid2 size={{xs:12,sm:6,md:4}}>
              <Controller
                name="endDate"
                control={controlDate}
                rules={{
                  required: "La fecha de fin es obligatoria",
                  validate: (value) => {
                    if (
                      startDate &&
                      value &&
                      dayjs(value).isBefore(dayjs(startDate))
                    ) {
                      return "La fecha de fin no puede ser anterior a la fecha de inicio";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      {...field}
                      format="DD/MM/YYYY"
                      label="Fecha de fin"
                      sx={{ width: "100%" }}
                      minDate={startDate || undefined}
                      onChange={(date) => field.onChange(date)}
                    />
                    {dateErrors.endDate && (
                      <Typography color="error" variant="body2">
                        {dateErrors.endDate.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid2>

            {/* Botón Filtrar */}
            <Grid2 size={{xs:12,md:4}}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <Button
                  type="submit"
                  className="buttonFiltrarBuscar"
                  sx={{ width: "100%" }}
                >
                  Filtrar
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>

        {/* Formulario de nombre */}
        <form onSubmit={handleNameSubmit(onNameSubmit)}>
          <Grid2 container spacing={2}>
            {/* Nombre del propietario */}
            <Grid2 size={{xs:12,sm:6,md:8}}>
              <Controller
                name="ownerName"
                control={controlName}
                rules={{ required: "El nombre del propietario es obligatorio" }}
                render={({ field }) => (
                  <>
                    <TextField
                      {...field}
                      label="Nombre del propietario"
                      variant="outlined"
                      sx={{ width: "100%",
                        borderColor:themePalette.primary
                       }}
                      onChange={(e) => field.onChange(e.target.value)
                      
                      }
                    />
                    {nameErrors.ownerName && (
                      <Typography color="error" variant="body2">
                        {nameErrors.ownerName.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Grid2>

            {/* Botón Buscar */}
            <Grid2 size={{xs:12,sm:6,md:4}}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <Button
                  type="submit"
                  className="buttonFiltrarBuscar"
                  sx={{ width: "100%" }}
                >
                  Buscar
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </LocalizationProvider>
  );
};