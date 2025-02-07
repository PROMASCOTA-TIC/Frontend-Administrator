"use client";
import * as React from "react";
import axios from "axios";
import { Button, Typography, Box, IconButton, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit"; // Icono de lápiz para editar comisión
import { themePalette } from "@/config/theme.config";
import { esES } from "@mui/x-data-grid/locales";
import { URL_BASE } from "@/config/config";

interface RowData {
  id: string;
  nombrePropietario: string;
  telefono: string;
  nombreComercial: string;
  ruc: string;
  comision: number;
}

export const ListaComisiones = () => {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openEditCommissionDialog, setOpenEditCommissionDialog] = React.useState(false);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = React.useState<RowData | null>(null);
  const [newCommission, setNewCommission] = React.useState<number | "">("");
  const [commissionError, setCommissionError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null); 



  const fetchApprovedEntrepreneurs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL_BASE}users/entrepreneurs/state/APPROVED`);
      const data = response.data;


      const formattedData = data.map((entrepreneur: any) => ({
        id: entrepreneur.idEntrepreneur,
        nombrePropietario: entrepreneur.name,
        telefono: entrepreneur.numeroCelular,
        nombreComercial: entrepreneur.nombreEmprendimiento,
        ruc: entrepreneur.ruc,
        comision: entrepreneur.comision ?? 0,
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error al obtener emprendedores aprobados:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApprovedEntrepreneurs();
  }, []);

 
  const handleOpenEditCommissionDialog = (row: RowData) => {
    setSelectedEntrepreneur(row);
    setNewCommission(row.comision); 
    setOpenEditCommissionDialog(true);
  };


  const handleCloseEditCommissionDialog = () => {
    setOpenEditCommissionDialog(false);
    setSelectedEntrepreneur(null);
    setNewCommission("");
    setCommissionError(null);
  };


  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };



  const handleUpdateCommission = async () => {
    if (!selectedEntrepreneur || newCommission === "" || commissionError) return;

    try {
      console.log(`🔄 Actualizando comisión de ID: ${selectedEntrepreneur.id} a ${newCommission}%`);

      await axios.patch(
        `${URL_BASE}users/entrepreneurs/${selectedEntrepreneur.id}/status-and-commission`,
        { estado: "APPROVED", comision: Number(newCommission) },
        { headers: { "Content-Type": "application/json" } }
      );

      
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedEntrepreneur.id ? { ...row, comision: Number(newCommission) } : row
        )
      );

      setSuccessMessage(`Comisión de ${selectedEntrepreneur.nombrePropietario} actualizada correctamente`);
      handleCloseEditCommissionDialog();
    } catch (error: any) {
      console.error(` Error al actualizar la comisión de ${selectedEntrepreneur.id}:`, error);
    }
  };

  const columns: GridColDef[] = [
    { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "telefono", headerName: "Teléfono", flex: 0.8, minWidth: 100 },
    { field: "nombreComercial", headerName: "Nombre comercial", flex: 1, minWidth: 50 },
    { field: "ruc", headerName: "RUC", flex: 0.8, minWidth: 140 },
    {
        field: "comision",
        headerName: "Comisión (%)",
        flex: 0.5,
        minWidth: 100,
        align: "center",
        renderCell: (params: GridRenderCellParams) => (
          <Typography sx={{
            paddingTop: "10px", 
            textAlign: "center",  
            width: "100%", 
            alignItems: "center", 
            justifyContent: "center",
          }}>
            {params.value}%
          </Typography>
        ),
      },
    {
      field: "editarComision",
      headerName: "Editar comisión",
      flex: 0.5,
      minWidth: 88,
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: themePalette.primary }} onClick={() => handleOpenEditCommissionDialog(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </div>
      <GridToolbarQuickFilter debounceMs={500} sx={{ marginLeft: "auto" }} />
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 20px", width: "100%" }}>
      <Typography sx={{ marginBottom: "20px", textAlign: "center", color: themePalette.primary, fontSize: "36px", fontWeight: "bold" }}>
        Lista de Emprendedores Aprobados
      </Typography>

      <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: CustomToolbar }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': { backgroundColor: themePalette.cwhite, padding: '0.5rem' },
            '& .MuiDataGrid-columnHeader': { backgroundColor: themePalette.black10, fontWeight: 'bold' },
            '& .MuiDataGrid-footerContainer': { backgroundColor: themePalette.black10, fontWeight: 'bold' },
          }}
        />
      </Box>

      <Dialog open={openEditCommissionDialog} onClose={handleCloseEditCommissionDialog}>
         <DialogTitle
          sx={{ display: "flex", justifyContent: "center", color: themePalette.primary, fontWeight: "bold" }}
          >Confirmar Aprobación</DialogTitle>
        <DialogContent>
            <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
                Editar comisión de <strong>{selectedEntrepreneur?.nombrePropietario}</strong>
            </Typography>
            <Typography sx={{ textAlign: "center", marginBottom: "20px" }}>
            Recuerda acordar la nueva comisión con el emprendedor antes de guardar.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 2 }}>
          <TextField
            fullWidth
            label="Comisión (%)"
            type="number"
            value={newCommission}
            sx={{width: "30%"}}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 99) {
                setNewCommission(value);
                setCommissionError(null);
              } else {
                setCommissionError("La comisión debe estar entre 1 y 99");
              }
            }}
            error={!!commissionError}
            helperText={commissionError}
          />
          </Box>
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button onClick={handleCloseEditCommissionDialog}
           sx={{ color: themePalette.cwhite, background: themePalette.primary, textTransform: "none" }}
          >Cancelar</Button>
          
          <Button onClick={handleUpdateCommission} disabled={commissionError !== null}
           sx={{ color: themePalette.cwhite, background: themePalette.primary, textTransform: "none" }}
          >Guardar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">{successMessage}</Alert>
      </Snackbar> 
    </Box>
  );
};
