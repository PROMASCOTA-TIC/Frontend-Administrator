"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "/src/assets/styles/emprendedores/general.css";
import { themePalette } from "@/config/theme.config";
import { esES } from '@mui/x-data-grid/locales';
import axios from 'axios';
import 'dayjs/locale/es';

interface DateFormValues {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface RowData {
  id: string;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  fechaSolicitud: string;
  ruc: string;
}

export const SolicitudesEmprendedores = () => {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // Cargar datos de emprendedores pendientes
  const fetchPendingEntrepreneurs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/entrepreneurs/state/PENDING');
      const data = response.data;

      const formattedData = data.map((entrepreneur: any) => ({
        id: entrepreneur.idEntrepreneur,
        nombrePropietario: entrepreneur.name,
        email: entrepreneur.email,
        telefono: entrepreneur.numeroCelular,
        nombreComercial: entrepreneur.nombreEmprendimiento,
        fechaSolicitud: dayjs(entrepreneur.createdAt).format('DD/MM/YYYY'),
        ruc: entrepreneur.ruc,
      }));

      setRows(formattedData);
    } catch (error) {
      console.error('Error al obtener los emprendedores pendientes:', error);
    }
  };

  // Cargar los datos al montar el componente
  React.useEffect(() => {
    fetchPendingEntrepreneurs();
  }, []);

  const handleReject = async () => {
    if (!selectedId) return;
    try {
      console.log(`Rechazando emprendedor con ID: ${selectedId}`);

      const response = await axios.patch(
        `http://localhost:3001/api/users/update-entrepreneur/${selectedId}`, 
        { estado: "REJECTED" },
        { headers: { "Content-Type": "application/json" } } 
      );

      console.log("Respuesta del backend:", response.data);

      // ✅ Eliminar el emprendedor rechazado de la lista sin recargar la página
      setRows((prevRows) => prevRows.filter(row => row.id !== selectedId));

      console.log(`Emprendedor con ID ${selectedId} ha sido rechazado.`);
      handleCloseDialog();
    } catch (error: any) {
      if (error.response) {
        console.error(`Error al rechazar emprendedor ${selectedId}:`, error.response.data);
      } else {
        console.error(`Error desconocido al rechazar emprendedor ${selectedId}:`, error);
      }
    }
  };

  const handleOpenDialog = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

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
      renderCell: () => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "rechazar",
      headerName: "Rechazar",
      flex: 0.5, minWidth: 80,
      renderCell: (params) => (
        <IconButton
          size="medium"
          sx={{ color: "red" }}
          onClick={() => handleOpenDialog(params.row.id)}
        >
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
        <Typography sx={{
          marginBottom: "20px", textAlign: "center",
          color: themePalette.primary, fontSize: "36px", fontWeight: "bold"
        }}>
          Solicitudes de emprendedores
        </Typography>

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

        {/* Modal de confirmación */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirmar Rechazo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas rechazar esta solicitud? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}} >
              Cancelar
            </Button>
            <Button onClick={handleReject} 
            sx={{color:themePalette.cwhite, background:"red", textTransform:"none"}} >
              Rechazar
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </LocalizationProvider>
  );
};
