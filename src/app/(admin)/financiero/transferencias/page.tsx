'use client';

import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { Check, Clear, EditNote, Receipt } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { transferSchema } from "@/validations/financiero/transferSchema";
import Image from "next/image";
import { themePalette } from "@/config/theme.config";
import "@/assets/styles/styles.css"
import axios from "axios";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";

interface RowData {
    id: string;
    no: number;
    paymentDate: string;
    petOwnerName: string;
    amount: string;
    state: string;
    observation: string;
    voucherUrl: string;
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
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState('');
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    const [rows, setRows] = useState<RowData[]>([]);
    const columns: GridColDef[] = [
        { field: "no", headerName: "No.", flex: 0.5, minWidth: 50 },
        { field: "paymentDate", headerName: "Fecha", flex: 1, minWidth: 100 },
        { field: "petOwnerName", headerName: "Nombre", flex: 1, minWidth: 180 },
        { field: "amount", headerName: "Total", flex: 0.5, minWidth: 100 },
        {
            field: "voucher",
            headerName: "Comprobante",
            flex: 0.5, minWidth: 120,
            align: "center",
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleClickOpen(params.row.id, params.row.voucherUrl)}
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
                setTimeout(() => { }, 2000),
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "6px",
                    }}
                >
                    <Typography variant="body2">
                        {params.row.state === 'Rechazado' || params.row.state === 'Aprobado' ? params.row.observation : params.row.state === 'Pendiente' ? "" : "Sin observaciones"}
                    </Typography>
                    <IconButton onClick={() => handleEditComment(params.row.no)}
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
        setLoading(true);
        try {
            const response = await axios.get(`${URL_BASE}transactions/transfers/all`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.status === 200 || response.status === 201 ? response.data : [];
            data.forEach(async (item: RowData, index: number) => {
                item.no = index + 1;
                item.paymentDate = new Date(item.paymentDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.petOwnerName = item.petOwnerName;
                item.amount = `$ ${parseFloat(item.amount).toFixed(2)}`;
                item.observation = item.observation ? item.observation : '';
                item.state = item.state === 'A' ? 'Aprobado' : item.state === 'R' ? 'Rechazado' : 'Pendiente';
                item.voucherUrl = item.voucherUrl;
            });
            setRows(data);
            setTransferIds(data.map((item: RowData) => item.id));
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setRows([]);
            setLoading(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleClickOpen = (id: number, url: string) => {
        reset();
        setOpenRowId(id);
        setUrl(url);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEdit(false);
        setShowCommentField(false);
    }
    const handleApprove = async () => {
        try {
            const response = await axios.patch(`${URL_BASE}transactions/validate-transfer/` + openRowId, {
                id: openRowId,
                status: 'A',
                comment: comment
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            if (response.status === 200 || response.status === 201) {
                fetchData();
                handleClose();
                setNotification({ open: true, message: 'Transferencia validada con éxito', type: 'success' });
            } else {
                setNotification({ open: true, message: 'Error al validar la transferencia, vuelva a intentarlo más tarde', type: 'error' });
            }
        } catch (error) {
            handleClose();
            setNotification({ open: true, message: 'Error al validar la transferencia, vuelva a intentarlo más tarde', type: 'error' });
        }
    }
    const handleReject = () => {
        if (showCommentField) {
            handleSubmit(async () => {
                try {
                    const response = await axios.patch(`${URL_BASE}transactions/validate-transfer/` + openRowId, {
                        id: openRowId,
                        status: 'R',
                        comment: comment
                    },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                    if (response.status === 200 || response.status === 201) {
                        fetchData();
                        handleClose();
                        setNotification({ open: true, message: 'Transferencia rechazada con éxito', type: 'success' });
                    } else {
                        setNotification({ open: true, message: 'Error al rechazar la transferencia, vuelva a intentarlo más tarde', type: 'error' });
                    }
                } catch (error) {
                    handleClose();
                    setNotification({ open: true, message: 'Error al rechazar la transferencia, vuelva a intentarlo más tarde', type: 'error' });
                }
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
            setComment(rowToEdit.observation);
        }
        setOpenRowId(id);
        setEdit(true);
    };

    const handleSaveComment = async() => {
        const paymentId = transferIds[openRowId - 1];
        try {
            const response = await axios.patch(`${URL_BASE}transactions/validate-transfer/` + paymentId, {
                id: paymentId,
                comment: comment
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            if (response.status === 200 || response.status === 201) {
                fetchData();
                handleClose();
                setNotification({ open: true, message: 'Observación guardada con éxito', type: 'success' });
            } else {
                setNotification({ open: true, message: 'Error al modificar la observación, vuelva a intentarlo más tarde', type: 'error' });
            }
        } catch (error) {
            handleClose();
            setNotification({ open: true, message: 'Error al modificar la observación, vuelva a intentarlo más tarde', type: 'error' });
        }
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
                {loading && rows ? <LoadingSpinner /> : (
                    <Tables rows={rows} columns={columns} />
                )}
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
                                src={url}
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
