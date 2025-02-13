'use client';

import { useEffect, useState } from "react";
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
import axios from "axios";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";

interface RowData {
    no: number;
    transactionDate: string;
    entrepreneurName: string;
    entrepreneurBusiness: string;
    state: string;
    amount: string;
    paymentDate: string;
    coment: string;
}

type Inputs = {
    comment: string;
}

export default function PagoEmprendedores() {

    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('');
    const [openRowNo, setOpenRowNo] = useState<number>(1);
    const [rows, setRows] = useState<RowData[]>([]);
    const [transactionsIds, setTransactionsIds] = useState<string[]>(['']);
    const [loading, setLoading] = useState(true);

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${URL_BASE}transactions`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.status === 200 ? response.data : [];
            const transactionsIds = data.map((item: any) => item.id);
            setTransactionsIds(transactionsIds);
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.transactionDate = new Date(item.transactionDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.state = item.state === 'S' ? 'Pagado' : 'Pendiente';
                item.paymentDate = item.paymentDate ? new Date(item.paymentDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
                item.coment = item.coment ? item.coment : '';
                item.amount = `$ ${parseFloat(item.amount).toFixed(2)}`;
                item.entrepreneurBusiness = item.entrepreneurBusiness;
                item.entrepreneurName = item.entrepreneurName;
            });
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
            setRows(data);
            setLoading(false);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setLoading(false);
            setRows([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const columns: GridColDef[] = [
        { field: "no", headerName: "No", flex: 0.3, minWidth: 30 },
        { field: "transactionDate", headerName: "Fecha", flex: 0.8, minWidth: 80 },
        { field: "entrepreneurName", headerName: "Nombre", flex: 1.5, minWidth: 150 },
        { field: "entrepreneurBusiness", headerName: "Emprendimiento", flex: 1, minWidth: 150 },
        { field: "amount", headerName: "Total", flex: 0.7, minWidth: 70 },
        { field: "state", headerName: "Estado", flex: 0.7, minWidth: 70 },
        { field: "paymentDate", headerName: "Fecha de Pago", flex: 0.9, minWidth: 90 },
        {
            field: "resgisterPayment",
            headerName: "Registrar pago",
            flex: 0.5,
            minWidth: 120,
            align: "center",
            renderCell: (params) => (
                <div>
                    <Checkbox
                        checked={params.row.state === "Pagado"}
                        onClick={() => {
                            handleOpenDialog(params.row.no);
                            setOpenRowNo(params.row.no)
                        }}
                        disabled={params.row.state === "Pagado"}
                    />
                </div>
            ),
        },
        {
            field: "coment",
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
                        {params.row.state === 'Pagado' && !params.row.coment ? "Sin observaciones"
                            : params.row.state === 'Pendiente' ? "" : params.row.coment}
                    </Typography>
                    <IconButton onClick={() => handleOpenDialog(params.row.no)}
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

    const handleOpenDialog = (no: number) => {
        console.log(no);
        const selectedRow = rows.find(row => row.no === no);
        if (selectedRow) {
            setOpenRowNo(no);
            setComment(selectedRow.coment);
        }
        setOpen(true);
    };

    const handleSaveComment = async (transactionId: string) => {
        if (openRowNo !== null) {
            const data = {
                id: transactionId,
                coment: comment.trim() === '' ? 'Sin observaciones' : comment,
                state: 'S',
                paymentDate: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString()
            };
            try {
                const response = await axios.patch(`${URL_BASE}transactions/${transactionId}`, { ...data }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setNotification({ open: true, message: 'Comentario guardado', type: 'success' });
                fetchData();
            } catch (error) {
                setNotification({ open: true, message: 'Error al guardar el comentario', type: 'error' });
            }
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
                    Pago a emprendedores
                </Typography>
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "21px" }}>
                {loading ? <LoadingSpinner /> : <Tables rows={rows} columns={columns} />}
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
                        value={comment || ''}
                        error={!!errors.comment}
                        helperText={errors.comment ? errors.comment.message : ''}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button className="bg-primary text-white mb-e13"
                        onClick={() => {
                            handleSaveComment(transactionsIds[openRowNo - 1]);
                        }}
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