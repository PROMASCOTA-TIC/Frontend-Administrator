"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
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
  const [openApproveDialog, setOpenApproveDialog] = React.useState(false);
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [comision, setComision] = React.useState<number | "">("");
  const [comisionError, setComisionError] = React.useState<string | null>(null);


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

  React.useEffect(() => {
    fetchPendingEntrepreneurs();
  }, []);

  const handleApprove = async () => {
    if (comision === "" || comisionError) {
      setComisionError("Debes ingresar una comisión válida entre 1 y 99");
      return;
    }
  
    if (!selectedId) return;
  
    try {
      console.log(`Aprobando emprendedor con ID: ${selectedId} y comisión: ${comision}`);
  
      const response = await axios.patch(
        `http://localhost:3001/api/users/entrepreneurs/${selectedId}/status-and-commission`,
        { estado: "APPROVED", comision: Number(comision) },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Respuesta del backend:", response.data);
  
      setRows((prevRows) => prevRows.filter(row => row.id !== selectedId));
  
      console.log(`Emprendedor con ID ${selectedId} ha sido aprobado.`);
      handleCloseApproveDialog();
    } catch (error: any) {
      if (error.response) {
        console.error(`Error al aprobar emprendedor ${selectedId}:`, error.response.data);
      } else {
        console.error(`Error desconocido al aprobar emprendedor ${selectedId}:`, error);
      }
    }
  };
  

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

      setRows((prevRows) => prevRows.filter(row => row.id !== selectedId));

      console.log(`Emprendedor con ID ${selectedId} ha sido rechazado.`);
      handleCloseRejectDialog();
    } catch (error: any) {
      if (error.response) {
        console.error(`Error al rechazar emprendedor ${selectedId}:`, error.response.data);
      } else {
        console.error(`Error desconocido al rechazar emprendedor ${selectedId}:`, error);
      }
    }
  };

  const handleOpenApproveDialog = (id: string) => {
    setSelectedId(id);
    setComisionError(null);
    setOpenApproveDialog(true);
  };

  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
    setSelectedId(null);
    setComision("");
  };

  const handleOpenRejectDialog = (id: string) => {
    setSelectedId(id);
    setOpenRejectDialog(true);
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false);
    setSelectedId(null);
  };

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
      <Box sx={{ padding: "0 20px", width: "100%" }}>
        <Typography sx={{ marginBottom: "20px", textAlign: "center", color: themePalette.primary, fontSize: "36px", fontWeight: "bold" }}>
          Solicitudes de emprendedores
        </Typography>

        <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={[
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
                renderCell: (params) => (
                  <IconButton sx={{ color: "green" }} onClick={() => handleOpenApproveDialog(params.row.id)}>
                    <CheckIcon />
                  </IconButton>
                ),
              },
              {
                field: "rechazar",
                headerName: "Rechazar",
                renderCell: (params) => (
                  <IconButton sx={{ color: "red" }} onClick={() => handleOpenRejectDialog(params.row.id)}>
                    <CloseIcon />
                  </IconButton>
                ),
              },
            ]}

            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
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

        <Dialog open={openApproveDialog} onClose={handleCloseApproveDialog}>
  <DialogTitle
  sx={{ display: "flex", justifyContent: "center", color: themePalette.primary, fontWeight: "bold" }}
  >Confirmar Aprobación</DialogTitle>
  <DialogContent>
    <DialogContentText>
    Antes de aprobar esta solicitud, ingresa la comisión acordada con el emprendedor.
    </DialogContentText>

    {/* Input para ingresar la comisión */}
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 2 }}>
    <TextField
      fullWidth
      margin="dense"
      label="Comisión (%)"
      type="text"
      value={comision}
      sx={{width: "30%"}}
      onChange={(e) => {
        const inputValue = e.target.value;

        if (/^\d*$/.test(inputValue)) {
          const numberValue = Number(inputValue);
          if (numberValue >= 1 && numberValue <= 99) {
            setComision(numberValue);
            setComisionError(""); 
          } else {
            setComision(inputValue === "" ? "" : numberValue);
            setComisionError("La comisión debe estar entre 1 y 99");
          }
        }
      }}
      error={!!comisionError}
      helperText={comisionError}
    />
      </Box>
  </DialogContent>

  <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
    {/* Botón Cancelar */}
    <Button
      onClick={handleCloseApproveDialog}
      sx={{ color: themePalette.cwhite, background: themePalette.primary, textTransform: "none" }}
    >
      Cancelar
    </Button>

    <Button
      onClick={handleApprove}
      sx={{
        color: themePalette.cwhite,
        background: comision === "" || comisionError ? "lightgray" : themePalette.primary,
        textTransform: "none",
      }}
      disabled={comision === "" || comisionError !== ""}
    >
      Aprobar
    </Button>
  </DialogActions>
</Dialog>

        <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center", color: themePalette.primary, fontWeight: "bold" }}>Confirmar Rechazo</DialogTitle>
          <DialogContent
          >
            <DialogContentText>
              ¿Estás seguro de que deseas rechazar esta solicitud?
            </DialogContentText>
          </DialogContent>
          <DialogActions  sx={{ display: "flex", justifyContent: "center", gap: 2 }} >
            <Button onClick={handleCloseRejectDialog}
            sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}
            >Cancelar</Button>
            <Button onClick={handleReject}
            sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}
            >Aceptar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
