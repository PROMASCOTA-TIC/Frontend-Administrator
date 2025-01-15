'use client';

import { Box, Button, Dialog, DialogContent, DialogTitle, FormLabel, Grid2, TextField, Typography } from "@mui/material";
import { DateFilter, Tables, FilterSelector } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { theme, themePalette } from "@/config/theme.config";
import { AddCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { outcomeSchema } from '@/validations/financiero/outcomeSchema';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import utc from 'dayjs/plugin/utc';
import "@/assets/styles/styles.css"

dayjs.extend(utc);

const categories = [
    { label: 'Todos', value: '' },
    { label: 'Hosting', value: 'Hosting' },
    { label: 'Pagos', value: 'Payments' },
];

interface RowData {
    no: number;
    expenseDate: string;
    description: string;
    category: string;
    price: string;
}

const columns: GridColDef[] = [
    { field: "no", headerName: "No.", flex: 0.5, minWidth: 50 },
    { field: "expenseDate", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "description", headerName: "Descripción", flex: 2.5, minWidth: 200 },
    { field: "category", headerName: "Categoría", flex: 1, minWidth: 100 },
    { field: "price", headerName: "Total", flex: 1, minWidth: 80 },
];

type Inputs = {
    description: string;
    category: string;
    expenseDate: string;
    price: number;
}

export default function Egresos() {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [rows, setRows] = useState<RowData[]>([]);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const fetchData = async () => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(`${currentYear}-01-01T00:00:00.000Z`).toISOString();
        const endDate = new Date(`${currentYear}-12-31T23:59:59.999Z`).toISOString();
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        try {
            const response = await axios.post(`${URL_BASE}expenses/range`, {
                startDate: startDate,
                endDate: endDate,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            console.log('response', response.data);
            const data = response.status === 200 || response.status === 201 ? response.data : [];
            console.log('expenses', data);
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.expenseDate = dayjs(item.expenseDate).format('DD MMM YYYY');
                item.price = `$ ${item.price}`;
            });
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
            setRows(data);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            console.log('error', error);
            setRows([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
        resolver: zodResolver(outcomeSchema),
        mode: 'onChange',
    });

    const handleClickOpen = () => {
        reset();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSaveClick = (event: any) => {
        const formData = new FormData(event.target.form);
        const data = Object.fromEntries(formData.entries());
        const expenseData: Inputs = {
            description: data.description as string,
            category: selectedCategory as string,
            expenseDate: dayjs(data.expenseDate as string, "DD/MM/YYYY").format('YYYY-MM-DD'),
            price: Number(data.price),
        };
        onSubmit(expenseData);
    };

    const onSubmit = async (data: Inputs) => {
        try {
            const response = await axios.post(`${URL_BASE}expenses`, JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200 || response.status === 201) {
                setNotification({ open: true, message: 'Egreso registrado correctamente', type: 'success' });
                setOpen(false);
                fetchData();
            } else {
                setNotification({ open: true, message: 'Error al registrar el egreso', type: 'error' });
            }
        } catch (error: any) {
            console.log('error', error.response);
            setNotification({ open: true, message: 'Error de red al registrar el egreso', type: 'error' });
        }
    };

    const handleDateSubmit = async (data: { startDate: Dayjs | null, endDate: Dayjs | null }) => {
        if (!data.startDate || !data.endDate) {
            fetchData();
            return;
        }
        try {
            const response = await axios.post(`${URL_BASE}expenses/range`, {
                startDate: data.startDate,
                endDate: data.endDate,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const expenses = response.status === 200 || response.status === 201 ? response.data : [];
            console.log('expenses', expenses);
            expenses.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.expenseDate = dayjs(item.expenseDate).format('DD MMM YYYY');
                item.price = `$ ${item.price}`;
            });
            console.log(expenses);
            setRows(expenses);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    };

    return (
        <Grid2
            container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                boxSizing: "border-box",
                minWidth: "300px",
                margin: { xs: "13px 25px", sm: "13px 30px", md: "13px 60px" },
            }}
        >
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e21"
                    sx={{
                        fontSize: { xs: "26px", md: "34px" },
                    }}
                >
                    Egresos
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <DateFilter onDateSubmit={handleDateSubmit} />
            </Grid2>
            <Grid2 size={12}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "10px",
                    boxSizing: "border-box",
                    padding: "0 10px",
                }}
            >
                <Grid2 size={{ xs: 12, sm: 4 }}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        minWidth: '100px',
                    }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: "100px",
                            textTransform: "none",
                            backgroundColor: theme.palette.primary.main,
                        }}
                        startIcon={<AddCircleOutline />}
                        onClick={handleClickOpen}
                    >
                        Nuevo
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 size={12} sx={{ height: 423, width: "100%", marginTop: "21px" }}>
                    <Tables rows={rows} columns={columns} />
            </Grid2>
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        padding: '13px 0px',
                        fontSize: '24px',
                        background: theme.palette.primary.main,
                        color: themePalette.cwhite
                    }}
                >
                    Nuevo Egreso
                </DialogTitle>
                <DialogContent
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                width: { sm: '500px' },
                                padding: '21px'
                            }}
                        >
                            <FormLabel
                                htmlFor="categoria"
                                sx={{
                                    color: themePalette.black,
                                    textAlign: 'left',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '13px 0',
                                }}
                            >
                                Categoría
                            </FormLabel>
                            <Box id='categoria' width={'300px'}>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <FilterSelector
                                            label={'Categoría'}
                                            options={categories}
                                            onFilterChange={(newValue) => {
                                                field.onChange(newValue);
                                                setSelectedCategory(newValue);
                                            }}
                                            sx={'100%'}
                                            md={'100%'}
                                        />
                                    )}
                                />
                                {errors.category && (
                                    <Typography className="text-red-500 text-fs12 ms-e21">
                                        Por favor, seleccione una categoría
                                    </Typography>
                                )}
                            </Box>
                            <FormLabel
                                htmlFor="description"
                                sx={{
                                    color: themePalette.black,
                                    textAlign: 'left',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '8px 0 ',
                                }}
                            >
                                Descripción
                            </FormLabel>
                            <TextField
                                id="description"
                                error={!!errors.description}
                                placeholder="Ingrese la descripción del egreso"
                                {...register('description')}
                                multiline
                                minRows={4}
                                sx={{
                                    marginLeft: '21px',
                                    width: { xs: '100%', sm: '90%' },
                                    '& .MuiOutlinedInput-root': {
                                        height: '120px',
                                    },
                                }}
                            />
                            {errors.description && (
                                <Typography className="text-red-500 text-fs12 ms-e21">
                                    {errors.description.message}
                                </Typography>
                            )}
                            <FormLabel
                                sx={{
                                    color: themePalette.black,
                                    textAlign: 'left',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '8px 0',
                                }}
                            >
                                Fecha
                            </FormLabel>
                            <Controller
                                name="expenseDate"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <DatePicker
                                            {...field}
                                            format="DD/MM/YYYY"
                                            sx={{ marginLeft: '21px', width: { xs: '100%', sm: '90%' } }}
                                            onChange={(date) => {
                                                if (date) {
                                                    field.onChange(date.toDate());
                                                } else {
                                                    field.onChange(null);
                                                }
                                            }}
                                            value={field.value ? dayjs(field.value) : null}
                                        />
                                        {errors.expenseDate && (
                                            <Typography className="text-red-500 text-fs12 ms-e21">
                                                Por favor, ingrese una fecha válida
                                            </Typography>
                                        )}
                                    </>
                                )}
                            />
                            <FormLabel
                                htmlFor="valor"
                                sx={{
                                    color: themePalette.black,
                                    textAlign: 'left',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    margin: '8px 0 ',
                                }}
                            >
                                Valor
                            </FormLabel>
                            <TextField
                                {...register('price', { valueAsNumber: true })}
                                label="Valor"
                                type="number"
                                sx={{
                                    marginLeft: '21px',
                                    width: { xs: '100%', sm: '90%' },
                                }}
                                slotProps={{ htmlInput: { step: '0.01' } }}
                                error={!!errors.price}
                            />

                            {errors.price && (
                                <Typography className="text-red-500 text-fs12 ms-e21">
                                    {errors.price.message}
                                </Typography>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: { xs: '0 13px', sm: '0 68px' },
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSaveClick}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: themePalette.cwhite,
                                        borderRadius: '20px',
                                        padding: '5px 0',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        marginTop: '21px',
                                        width: { xs: '120px', md: '120px' },
                                    }}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: themePalette.cwhite,
                                        borderRadius: '20px',
                                        padding: '5px 0',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        marginTop: '21px',
                                        width: '120px',
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    </LocalizationProvider>
                </DialogContent>
            </Dialog>
        </Grid2>
    );
};