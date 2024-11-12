'use client';

import { useState } from "react";
import {
    Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, Grid2, IconButton, TextField, Typography
} from "@mui/material";
import { Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { Check, Clear, EditNote, Receipt } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { transferSchema } from "@/app/validations/financiero/transferSchema";
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
    const [estado, setEstado] = useState('Pendiente')
    const [showCommentField, setShowCommentField] = useState(false);
    const [comment, setComment] = useState('');
    const [openRowId, setOpenRowId] = useState(0);
    const [edit, setEdit] = useState(false);
    const [rows, setRows] = useState<RowData[]>([
        {
            id: 1,
            fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            nombrePropietario: "Juan Pérez",
            estado: 'Pendiente',
            total: "100.00",
            fechaPago: new Date("2024-10-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            comentario: ""
        },
        {
            id: 2,
            fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            nombrePropietario: "María Lopez",
            estado: 'Pendiente',
            total: "100.00",
            fechaPago: new Date("2024-10-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
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
                        onClick={() => handleComment(params.row.id)}
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
                        {params.row.estado === 'Pagado' && !params.row.observacion ? "Sin observaciones"
                            : params.row.estado === 'Pendiente' ? "" : params.row.observacion}
                    </Typography>
                    <IconButton onClick={() => handleComment(params.row.id)}
                        disabled={params.row.estado == 'Pendiente'}>
                        <EditNote />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const { register, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(transferSchema),
        mode: 'onChange',
    });

    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setShowCommentField(false);
    }

    const handleComment = (id: number) => {
        const rowToEdit = rows.find(row => row.id === id);
        if (rowToEdit) {
            setComment(rowToEdit.comentario || "");
        }
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id && row.estado === 'Pendiente'
                    ? { ...row, estado: 'Pagado' }
                    : row
            )
        );
        setOpenRowId(id);
        setEdit(true);
    };

    const handleSaveComment = () => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                return row.id === openRowId ? { ...row, observacion: comment } : row;
            })
        );
        handleClose();
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
            <Dialog open={edit} onClose={handleClose}
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
                        {...register("comment", { required: "El comentario es obligatorio" })}
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
                    <Button className="bg-primary text-white mb-e13" onClick={handleClose}
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