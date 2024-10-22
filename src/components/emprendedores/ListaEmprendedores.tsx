"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, TextField, Grid2, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "/src/assets/styles/emprendedores/general.css";

interface DateFormValues {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface NameFormValues {
  ownerName: string;
}

interface RowData {
  id: number;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  fechaSolicitud: string;
  ruc: string;
  estado: string;
}

const rows: RowData[] = [
  {
    id: 1,
    nombrePropietario: "Juan Pérez",
    email: "juan@example.com",
    telefono: "0991234567",
    nombreComercial: "Comercial JP",
    fechaSolicitud: "21/10/2024",
    ruc: "1712345678001",
    estado: "Activo",
  },
  // Puedes agregar más datos aquí...
];

export const ListaEmprendedores = () => {
  // Hook form para las fechas
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

  // Hook form para la búsqueda por nombre
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "nombrePropietario", headerName: "Nombre", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "telefono", headerName: "Teléfono", width: 100 },
    { field: "nombreComercial", headerName: "Nombre comercial", width: 150 },
    { field: "fechaSolicitud", headerName: "Fecha ingreso", width: 120 },
    { field: "ruc", headerName: "RUC", width: 125 },
    { field: "estado", headerName: "Estado", width: 65 },
    {
      field: "activar",
      headerName: "Activar",
      width: 65,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "desactivar",
      headerName: "Desactivar",
      width: 85,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }}>
          <CloseIcon />
        </IconButton>
      ),
    },
  ];

  const handleAction = (row: RowData, action: string) => {
    console.log(`Acción ${action} para el ID: ${row.id}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: { xs: "10px", sm: "20px", md: "250px" },
          padding: "20px",
          maxWidth: "calc(100% - 250px)",
          boxSizing: "border-box",
          minWidth: "300px",
        }}
      >
        {/* Formulario de búsqueda por nombre y fechas en la misma línea */}
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }} sx={{ minWidth: "150px" }}>
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

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }} sx={{ minWidth: "150px" }}>
            <Controller
              name="endDate"
              control={controlDate}
              rules={{
                required: "La fecha de fin es obligatoria",
                validate: (value) => {
                  if (startDate && value && dayjs(value).isBefore(dayjs(startDate))) {
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

          {/* Botón Filtrar después de los campos de fechas */}
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }} sx={{ minWidth: "80px" }}>
            <Button
              type="submit"
              className="buttonFiltrarBuscar"
              sx={{ width: "100px" }}
              onClick={handleDateSubmit(onDateSubmit)}
            >
              Filtrar
            </Button>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} sx={{ minWidth: "200px" }}>
            {/* Campo de texto para la búsqueda por nombre con validación */}
            <Controller
              name="ownerName"
              control={controlName}
              rules={{
                required: "El nombre del propietario es obligatorio",
                pattern: {
                  value: /^[A-Za-z\s]+$/, // Solo acepta letras y espacios
                  message: "El nombre solo debe contener letras",
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    label="Nombre del propietario"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    onChange={(e) => field.onChange(e.target.value)}
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
          <Grid2 size={{ xs: 12, sm: 4, md: 2 }} sx={{ minWidth: "80px" }}>
            <Button
              type="submit"
              className="buttonFiltrarBuscar"
              sx={{ width: "100px" }}
              onClick={handleNameSubmit(onNameSubmit)}
            >
              Buscar
            </Button>
          </Grid2>
        </Grid2>

        {/* Tabla con 10 columnas */}
        <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
