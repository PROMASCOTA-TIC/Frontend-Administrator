"use client";
import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Typography, Box, IconButton, Dialog, DialogContent, DialogActions, DialogTitle,TextField,Snackbar,Alert } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { themePalette } from "@/config/theme.config";
import { esES } from "@mui/x-data-grid/locales";
import DeleteIcon from "@mui/icons-material/Delete";
import { URL_BASE } from "@/config/config";

interface RowData {
  id: string;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  ruc: string;
  estado: string;
}

interface ProductData {
  id: string;
  name: string;
  description: string;
  publicationType: string;
  petType: string;
  category: string;
  subcategory: string;
  stock: number;
  finalPrice: string;
}


export const ListaEmprendedores = () => {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openProductos, setOpenProductos] = React.useState(false);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = React.useState<RowData | null>(null);
  const [productos, setProductos] = React.useState<ProductData[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState<boolean>(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = React.useState(false); 
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductData | null>(null);


  const fetchApprovedEntrepreneurs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL_BASE}users/entrepreneurs/state/APPROVED`);

      const data = response.data;


      const formattedData = data.map((entrepreneur: any) => ({
        id: entrepreneur.idEntrepreneur,
        nombrePropietario: entrepreneur.name,
        email: entrepreneur.email,
        telefono: entrepreneur.numeroCelular,
        nombreComercial: entrepreneur.nombreEmprendimiento,
        ruc: entrepreneur.ruc,
        estado: entrepreneur.status,
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

const fetchProductsByEntrepreneur = async (entrepreneurId: string) => {
  setLoadingProducts(true);
  try {
    const response = await axios.get(`${URL_BASE}products/entrepreneur/${entrepreneurId}`);
    setProductos(response.data);
  } catch (error) {
    console.error("Error al obtener productos del emprendedor:", error);
  } finally {
    setLoadingProducts(false);
  }
};


  const handleOpenDeactivateDialog = (row: RowData) => {
    setSelectedEntrepreneur(row);
    setOpenDeactivateDialog(true);
  };


  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
    setSelectedEntrepreneur(null);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };



  const handleDeactivateEntrepreneur = async () => {
    if (!selectedEntrepreneur) return;

    try {
      console.log(`Desactivando emprendedor con ID: ${selectedEntrepreneur.id}`);

      await axios.patch(
       `${URL_BASE}users/entrepreneurs/${selectedEntrepreneur.id}/status-and-commission`,
        { estado: "REJECTED" },
        { headers: { "Content-Type": "application/json" } }
      );


      setRows((prevRows) => prevRows.filter(row => row.id !== selectedEntrepreneur.id));

      console.log(`Emprendedor con ID ${selectedEntrepreneur.id} ha sido desactivado.`);
      setSuccessMessage("El emprendedor ha sido desactivado exitosamente.");
      handleCloseDeactivateDialog();
    } catch (error: any) {
      if (error.response) {
        console.error(`Error al desactivar emprendedor ${selectedEntrepreneur.id}:`, error.response.data);
      } else {
        console.error(`Error desconocido al desactivar emprendedor ${selectedEntrepreneur.id}:`, error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 40 },
    { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 100 },
    { field: "telefono", headerName: "Teléfono", flex: 1, minWidth: 100 },
    { field: "nombreComercial", headerName: "Nombre comercial", flex: 1.5, minWidth: 120 },
    { field: "ruc", headerName: "RUC", flex: 1, minWidth: 140 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const isActive = params.value === "APPROVED";
        return (
          <Typography
            sx={{
              color: isActive ? "green" : "red",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "5px 10px",
              borderRadius: "5px",
              display: "inline-block",
              textAlign: "center",
              width: "100%",
            }}
          >
            {isActive ? "Activo" : "Inactivo"}
          </Typography>
        );
      },
    },    
    {
      field: "desactivar",
      headerName: "Desactivar",
      flex: 0.5,
      minWidth: 88,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }} onClick={() => handleOpenDeactivateDialog(params.row)}>
          <CloseIcon />
        </IconButton>
      ),
    },
    {
      field: "productos",
      headerName: "Productos",
      flex: 0.5,
      minWidth: 88,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: themePalette.primary }} onClick={() => handleOpenProductos(params.row)}>
          <VisibilityIcon />
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

   const handleOpenProductos = (row: RowData) => {
    setSelectedEntrepreneur(row);
    fetchProductsByEntrepreneur(row.id);
    setOpenProductos(true);
  };

  const handleCloseProductos = () => {
    setOpenProductos(false);
    setSelectedEntrepreneur(null);
    setProductos([]);
  };
  

   const handleOpenConfirmDeleteDialog = (product: ProductData) => {
    setSelectedProduct(product);
    setOpenConfirmDeleteDialog(true);
  };

    const handleCloseConfirmDeleteDialog = () => {
      setOpenConfirmDeleteDialog(false);
      setSelectedProduct(null);
    };

    

    const handleDeleteProduct = async () => {
      if (!selectedProduct) return;
  
      try {
        console.log(`Eliminando producto con ID: ${selectedProduct.id}`);
  
        await axios.delete(`${URL_BASE}products/${selectedProduct.id}`);


        setProductos((prevProductos) => prevProductos.filter(product => product.id !== selectedProduct.id));
  
        setSuccessMessage(`Producto "${selectedProduct.name}" eliminado correctamente.`);
        handleCloseConfirmDeleteDialog();
      } catch (error: any) {
        console.error(`Error al eliminar producto ${selectedProduct.id}:`, error);
      }
    };

  const productColumns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1.5, minWidth: 150 },
    { field: "description", headerName: "Descripción", flex: 2, minWidth: 200 },
    { field: "petType", headerName: "Tipo de Mascota", flex: 0.8, minWidth: 120 },
    { field: "category", headerName: "Categoría", flex: 0.7, minWidth: 100 },
    { field: "subcategory", headerName: "Subcategoría", flex: 0.6, minWidth: 100 },
    { field: "stock", headerName: "Stock", flex: 0.5, minWidth: 80 },
    { field: "finalPrice", headerName: "Precio Final", flex: 0.5, minWidth: 100 },
    {
      field: "desactivar",
      headerName: "Eliminar",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }} onClick={() => handleOpenConfirmDeleteDialog(params.row)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <Dialog open={openProductos} onClose={handleCloseProductos} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ textAlign: "center", color: themePalette.primary, fontWeight: "bold" }}>
          Productos de {selectedEntrepreneur?.nombreComercial}
        </DialogTitle>
        <DialogContent>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={productos}
            columns={productColumns}
            loading={loadingProducts}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button onClick={handleCloseProductos}   sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}>Cerrar</Button>
        </DialogActions>
      </Dialog>

{/* Modal de Confirmación para Eliminar Producto */}
<Dialog open={openConfirmDeleteDialog} onClose={handleCloseConfirmDeleteDialog}>
        <DialogTitle sx={{ textAlign: "center", color: themePalette.primary, fontWeight: "bold" }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el producto "{selectedProduct?.name}"?
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button onClick={handleCloseConfirmDeleteDialog} sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}>Cancelar</Button>
          <Button onClick={handleDeleteProduct} sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}>Eliminar</Button>
        </DialogActions>
      </Dialog>

        <Dialog open={openDeactivateDialog} onClose={handleCloseDeactivateDialog}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center", color: themePalette.primary, fontWeight: "bold" }}>Confirmar Desactivación</DialogTitle>
          <DialogContent>¿Estás seguro de que deseas desactivar este emprendedor?</DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button onClick={handleCloseDeactivateDialog}
            sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}
            >Cancelar</Button>
            <Button onClick={handleDeactivateEntrepreneur} sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}>Aceptar</Button>
          </DialogActions>
        </Dialog>
         <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">{successMessage}</Alert>
              </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};
