'use client';

import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { Check, Clear, EditNote, Receipt } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transferSchema } from "@/validations/financiero/transferSchema";
import Image from "next/image";
import Imagen from "@/assets/images/ejemploTransferencia.png";
import { themePalette } from "@/config/theme.config";
import "@/assets/styles/styles.css"
import axios from "axios";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";

interface RowData {
    id: string;
    no: number;
    date: string;
    name: string;
    amount: string;
    state: string;
    observation: string;
}

type Inputs = {
    comment: string;
}

export default function Transferencias() {

    const [open, setOpen] = useState(false)
    const [showCommentField, setShowCommentField] = useState(false);
    const [comment, setComment] = useState('');
    const [openRowId, setOpenRowId] = useState(0);
    const [transferIds, setTransferIds] = useState<string[]>([]);
    const [edit, setEdit] = useState(false);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    const [rows, setRows] = useState<RowData[]>([]);
    const columns: GridColDef[] = [
        { field: "no", headerName: "ID", flex: 0.5, minWidth: 50 },
        { field: "transferDate", headerName: "Fecha", flex: 1, minWidth: 100 },
        { field: "name", headerName: "Nombre", flex: 1, minWidth: 180 },
        { field: "amount", headerName: "Total", flex: 0.5, minWidth: 100 },
        {
            field: "voucher",
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
        { field: "state", headerName: "Estado", flex: 1, minWidth: 100 },
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL_BASE}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.status === 200 ? response.data : [];
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.date = new Date(item.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.observation = item.observation ? item.observation : '';
            });
            setTransferIds(data.map((item: RowData) => item.id));
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
            setRows(data);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setRows([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
    const handleApprove = async () => {
        const transferId = transferIds[openRowId - 1];
        //TODO: llamar a la API para aprobar la transferencia  (coordinar con el JSON)
        const response = await axios.post(`${URL_BASE}transactions/validate-transfer/${transferId}`, {
            id: transferId,
            state: 'Aprobado',
            observation: comment
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 200) {
            setRows((prevRows) =>
                prevRows.map((row) =>
                    row.no === openRowId ? { ...row, estado: 'Aprobado', observacion: comment } : row
                )
            );
            fetchData();
            handleClose();
            setNotification({ open: true, message: 'Transferencia validad con éxito', type: 'success' });
        } else {
            setNotification({ open: true, message: 'Error al validar la transferencia', type: 'error' });
        }
    }
    const handleReject = () => {
        if (showCommentField) {
            handleSubmit(() => {
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.no === openRowId ? { ...row, estado: 'Rechazado', observacion: comment } : row
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
        const rowToEdit = rows.find(row => row.no === id);
        if (rowToEdit) {
            setComment(rowToEdit.observation || "");
        }
        setOpenRowId(id);
        setEdit(true);
    };

    const handleSaveComment = () => {
        //TODO: llamar update de la venta (JSON)
        setRows((prevRows) =>
            prevRows.map((row) => {
                return row.no === openRowId ? { ...row, observacion: comment } : row;
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
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
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
                        handleApprove;
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
