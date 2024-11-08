'use client';

import { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { Check, Clear, EditNote, Receipt } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { transferSchema } from "@/validations/financiero/transferSchema";
import Image from "next/image";
import Imagen from "@/assets/images/ejemploTransferencia.png";
import { themePalette } from "@/config/theme.config";
import "@/assets/styles/styles.css"

interface RowData {
    id: number;
    fecha: string;
    nombre: string;
    total: string;
    estado: string;
    observacion: string;
}

type Inputs = {
    comment: string;
}

export default function Transferencias() {

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
            nombre: "Juan Pérez",
            total: "100.00",
            estado: openRowId === 1 ? estado : 'Pendiente',
            observacion: "Sin observaciones"
        },
        {
            id: 2,
            fecha: new Date("2024-07-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            nombre: "María López",
            total: "20.00",
            estado: openRowId === 2 ? estado : 'Pendiente',
            observacion: "Sin observaciones"
        },
    ]);
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
        { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
        { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 180 },
        { field: "total", headerName: "Total", flex: 0.5, minWidth: 100 },
        {
            field: "comprobante",
            headerName: "Comprobante",
            flex: 0.5, minWidth: 120,
            align: "center",
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleClickOpen(params.row.id)}
                >
                    <Receipt />
                </IconButton>
            ),
        },
        { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
        {
            field: "observacion",
            headerName: "Observación",
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
                        {params.row.estado === 'Rechazado' || params.row.estado === 'Aprobado' ? params.row.observacion : params.row.estado === 'Pendiente' ? "" : "Sin observaciones"}
                    </Typography>
                    <IconButton onClick={() => handleEditComment(params.row.id)}
                        disabled={params.row.estado == 'Pendiente'}>
                        <EditNote />
                    </IconButton>
                </Box>
            ),
        },
    ];
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: zodResolver(transferSchema),
        mode: 'onChange',
    });
    const handleClickOpen = (id: number) => {
        reset();
        setOpenRowId(id);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setShowCommentField(false);
    }
    const handleApprove = () => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === openRowId ? { ...row, estado: 'Aprobado' } : row
            )
        );
        handleClose();
    }
    const handleReject = () => {
        if (showCommentField) {
            handleSubmit(() => {
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.id === openRowId ? { ...row, estado: 'Rechazado', observacion: comment } : row
                    )
                );
                handleClose();
            })();
        } else {
            setComment('');
            setShowCommentField(true);
        }
    }

    const handleEditComment = (id: number) => {
        const rowToEdit = rows.find(row => row.id === id);
        if (rowToEdit) {
            setComment(rowToEdit.observacion || "");
        }
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
                    Transferencias
                </Typography>
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "21px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    sx={{
                        backgroundColor: themePalette.primary,
                        color: themePalette.cwhite,
                        margin: 0,
                        padding: "13px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Comprobante de transferencia
                </DialogTitle>
                <DialogContent>
                    <FormControl
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "13px",
                            padding: "21px",
                        }}
                    >
                        <Box>
                            <Image
                                src={Imagen}
                                alt="transferencia"
                                width={320}
                                height={320}
                                style={{
                                    marginTop: "13px",
                                    borderRadius: "10px",
                                    border: `1px solid ${themePalette.primarydos}`,
                                }}
                            >
                            </Image>
                        </Box>
                        {showCommentField && (
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Observación"
                                type="text"
                                fullWidth
                                value={comment}
                                error={!!errors.comment}
                                helperText={errors.comment ? errors.comment.message : ''}
                                {...register("comment", { required: "La observación es obligatoria" })}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleApprove();
                    }}
                        variant="outlined"
                        sx={{
                            backgroundColor: themePalette.primary,
                            color: themePalette.cwhite,
                            marginBottom: "13px",
                            textTransform: "none",
                            '&.Mui-disabled': {
                                backgroundColor: themePalette.primary,
                                color: themePalette.cwhite,
                            },
                        }}
                        disabled={showCommentField === true}
                    >
                        <Check
                            sx={{
                                marginRight: "8px",
                                color: themePalette.terciary,
                            }}
                        />
                        Aceptar
                    </Button>
                    <Button
                        onClick={() => {
                            handleReject();
                        }}
                        variant="outlined"
                        sx={{
                            backgroundColor: themePalette.primary,
                            color: themePalette.cwhite,
                            marginBottom: "13px",
                            textTransform: "none",
                        }}
                    >
                        <Clear
                            sx={{
                                marginRight: "8px",
                                color: "red",
                            }}
                        />
                        Rechazar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={edit} onClose={handleClose}
            >
                <DialogTitle>
                    Observación
                </DialogTitle>
                <DialogContent
                    sx={{
                        width: { xs: "100%", sm: "400px" },
                    }}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Observación"
                        type="text"
                        fullWidth
                        value={comment}
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ''}
                        {...register("comment", { required: "La observación es obligatoria" })}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveComment}
                        variant="outlined"
                        sx={{
                            backgroundColor: themePalette.primary,
                            color: themePalette.cwhite,
                            marginBottom: "13px",
                            textTransform: "none",
                        }}
                    >
                        Guardar
                    </Button>
                    <Button onClick={handleClose}
                        variant="outlined"
                        sx={{
                            backgroundColor: themePalette.primary,
                            color: themePalette.cwhite,
                            marginBottom: "13px",
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
