"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, Grid2, IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "/src/assets/styles/emprendedores/general.css";
import { themePalette } from "@/config/theme.config";
import { esES } from '@mui/x-data-grid/locales';
import 'dayjs/locale/es';

interface DateFormValues {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface RowData {
  id: number;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  fechaSolicitud: string;
  ruc: string;
  tipoVenta: string;
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
    tipoVenta: "Directa",
  },
];

export const SolicitudesEmprendedores = () => {
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

  const startDate = watchDate("startDate");

  const onDateSubmit = (data: DateFormValues) => {
    console.log("Filtrado por fechas:", data);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 40 }, 
    { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 100 }, 
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 150 }, 
    { field: "telefono", headerName: "Teléfono", flex: 1, minWidth: 120 }, 
    { field: "nombreComercial", headerName: "Nombre comercial", flex: 1.5, minWidth: 180 }, 
    { field: "fechaSolicitud", headerName: "Fecha solicitud", flex: 1, minWidth: 115 }, 
    { field: "ruc", headerName: "RUC", flex: 1, minWidth: 140 }, 
    {
      field: "aceptar",
      headerName: "Aceptar",
      flex: 0.5, minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "rechazar",
      headerName: "Rechazar",
      flex: 0.5, minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }}>
          <CloseIcon />
        </IconButton>
      ),
    },
  ];

  const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <GridToolbarQuickFilter 
                debounceMs={500}
                sx={{ marginLeft: 'auto' }}
            />
        </GridToolbarContainer>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "0 20px",
          width: "100%",
        }}
      >
        {/* Título centrado */}
        <Typography sx={{ marginBottom: "20px", textAlign: "center",
        color:themePalette.primary, fontSize: "36px", fontWeight: "bold"
       }}>
          Solicitudes de emprendedores
        </Typography>

        <Grid2 container spacing={2} alignItems="center" justifyContent="flex-end">
          <Grid2 size={{ xs: 12, sm: 4, md: 2.09 }}>
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

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
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

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              className="buttonFiltrarBuscar"
              sx={{ width: "100px" }}
              onClick={handleDateSubmit(onDateSubmit)}
            >
              Filtrar
            </Button>
          </Grid2>
        </Grid2>
        <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: themePalette.cwhite,
                padding: '0.5rem',
                border: '0px solid',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
              },
            }}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
