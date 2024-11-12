'use client';

import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, Grid2, TextField, Typography } from "@mui/material";
import { DateFilter, Tables, FilterSelector } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { theme, themePalette } from "@/config/theme.config";
import { AddCircleOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { outcomeSchema } from '@/validations/financiero/outcomeSchema';
import "@/assets/styles/styles.css"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const categories = [
    { label: 'Todos', value: '' },
    { label: 'Ropa', value: 'clothing' },
    { label: 'Alimentos', value: 'food' },
];

interface RowData {
    id: number;
    fecha: string;
    descripcion: string;
    categoria: string;
    total: string;
}

let rows: RowData[] = [
    {
        id: 1,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }),
        descripcion: "Pago de hosting de base de datos en la nube",
        categoria: "Hosting",
        total: "100.00",
    },
];


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "descripcion", headerName: "Descripción", flex: 2.5, minWidth: 200 },
    { field: "categoria", headerName: "Categoría", flex: 1, minWidth: 100 },
    { field: "total", headerName: "Total", flex: 1, minWidth: 80 },
];

type Inputs = {
    descripcion: string;
    categoria: string;
    fecha: Date;
    valor: number;
}

export default function Egresos() {
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<Inputs>({
        resolver: zodResolver(outcomeSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        setValue('categoria', selectedCategory);
    }, [selectedCategory, setValue]);

    const handleClickOpen = () => {
        reset();
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = (data: Inputs) => {
        console.log({
            data,
        });
        const newRow: RowData = {
            id: rows.length + 1,
            fecha: data.fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
            }),
            descripcion: data.descripcion,
            categoria: data.categoria,
            total: data.valor.toFixed(2),
        };
        rows = [...rows, newRow];
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
                margin: { xs: "13px 25px", sm: "13px 30px", md: "13px 60px" },
            }}
        >
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e21"
                    sx={{
                        fontSize: {xs: "26px", md: "34px"},
                    }}
                >
                    Egresos
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <DateFilter />
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
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "30px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
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
                                    name="categoria"
                                    control={control}
                                    render={({ field }) => (
                                        <FilterSelector
                                            label={'Categoría'}
                                            options={categories}
                                            onFilterChange={(newValue) => {
                                                field.onChange(newValue);
                                            }}
                                            sx={'100%'}
                                            md={'100%'}
                                        />
                                    )}
                                />
                                {errors.categoria && (
                                    <Typography className="text-red-500 text-fs12 ms-e21">
                                        Por favor, seleccione una categoría
                                    </Typography>
                                )}
                            </Box>
                            <FormLabel
                                htmlFor="descripcion"
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
                                id="descripcion"
                                error={!!errors.descripcion}
                                placeholder="Ingrese la descripción del egreso"
                                {...register('descripcion')}
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
                            {errors.descripcion && (
                                <Typography className="text-red-500 text-fs12 ms-e21">
                                    {errors.descripcion.message}
                                </Typography>
                            )}
                            <FormLabel
                                htmlFor="fecha"
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
                                name="fecha"
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
                                        {errors.fecha && (
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
                                {...register('valor', { valueAsNumber: true })}
                                label="Valor"
                                type="number"
                                sx={{
                                    marginLeft: '21px',
                                    width: { xs: '100%', sm: '90%' },
                                }}
                                slotProps={{ htmlInput: { step: '0.01' } }}
                                error={!!errors.valor}
                            />

                            {errors.valor && (
                                <Typography className="text-red-500 text-fs12 ms-e21">
                                    {errors.valor.message}
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