'use client';

import { useState } from "react";
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid2, IconButton, TextField, Typography
} from "@mui/material";
import { Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { EditNote, } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transferSchema } from "@/validations/financiero/transferSchema";
import "@/assets/styles/styles.css"

interface RowData {
    id: number;
    fecha: string;
    nombrePropietario: string;
    estado: string;
    total: string;
    fechaPago: string;
    comentario: string;
}

type Inputs = {
    comment: string;
}

export default function PagoEmprendedores() {

    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('');
    const [openRowId, setOpenRowId] = useState(0);
    const [rows, setRows] = useState<RowData[]>([
        {
            id: 1,
            fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            nombrePropietario: "Juan Pérez",
            estado: 'Pendiente',
            total: "100.00",
            fechaPago: "",
            comentario: ""
        },
        {
            id: 2,
            fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            nombrePropietario: "María Lopez",
            estado: 'Pendiente',
            total: "100.00",
            fechaPago: "",
            comentario: ""
        },
    ]);
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
        { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
        { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 180 },
        { field: "total", headerName: "Total", flex: 0.5, minWidth: 100 },
        { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
        { field: "fechaPago", headerName: "Fecha de Pago", flex: 1, minWidth: 100 },
        {
            field: "registrarPago",
            headerName: "Registrar pago",
            flex: 0.5,
            minWidth: 120,
            align: "center",
            renderCell: (params) => (
                <div>
                    <Checkbox
                        checked={params.row.estado === "Pagado"}
                        onClick={() => handleOpenDialog(params.row.id)}
                        disabled={params.row.estado === "Pagado"}
                    />
                </div>
            ),
        },
        {
            field: "comentario",
            headerName: "Comentario",
            flex: 1.5, minWidth: 150,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "6px",
                    }}
                >
                    <Typography variant="body2">
                        {params.row.estado === 'Pagado' && !params.row.comentario ? "Sin observaciones"
                            : params.row.estado === 'Pendiente' ? "" : params.row.comentario}
                    </Typography>
                    <IconButton onClick={() => handleOpenDialog(params.row.id)}
                        disabled={params.row.estado == 'Pendiente'}>
                        <EditNote />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const { formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(transferSchema),
        mode: 'onChange',
    });

    const handleCancel = () => {
        setComment('');
        setOpen(false);
    }

    const handleOpenDialog = (id: number) => {
        const selectedRow = rows.find(row => row.id === id);
        if (selectedRow) {
            setOpenRowId(id);
            setComment(selectedRow.comentario || "");
        }
        setOpen(true);
    };

    const handleSaveComment = () => {
        if (openRowId !== null) {
            setRows(prevRows =>
                prevRows.map(row =>
                    row.id === openRowId
                        ? {
                            ...row,
                            comentario: comment.trim() === '' ? 'Sin observaciones' : comment,
                            estado: 'Pagado',
                            fechaPago: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                        }
                        : row
                )
            );
        }
        setOpen(false);
    };

    return (
        <Grid2
            container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                boxSizing: "border-box",
                minWidth: "300px",
                margin: { xs: "30px 25px", sm: "30px 30px", md: "30px 60px" },
            }}
        >
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e8"
                    sx={{
                        fontSize: { xs: "26px", md: "34px" },
                    }}
                >
                    Pago a emprendedores
                </Typography>
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "21px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
            <Dialog open={open} onClose={handleCancel}
            >
                <DialogTitle>
                    Comentario
                </DialogTitle>
                <DialogContent
                    sx={{
                        width: { xs: "100%", sm: "400px" },
                    }}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Comentario"
                        type="text"
                        fullWidth
                        value={comment}
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ''}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="bg-primary text-white mb-e13" onClick={handleSaveComment}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Guardar
                    </Button>
                    <Button className="bg-primary text-white mb-e13" onClick={handleCancel}
                        variant="outlined"
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid2>
    );
};