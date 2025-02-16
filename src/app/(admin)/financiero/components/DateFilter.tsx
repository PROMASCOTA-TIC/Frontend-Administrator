'use client';

import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Grid2 } from "@mui/material";
import "dayjs/locale/es";

interface DateFormValues {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}

interface DateFilterProps {
    onDateSubmit?: (data: DateFormValues) => void;
}

export const DateFilter = (props: DateFilterProps) => {
    const {
        handleSubmit: handleDateSubmit,
        control: controlDate,
        watch: watchDate,
        reset: resetDate,
        formState: { errors: dateErrors },
    } = useForm<DateFormValues>({
        defaultValues: {
            startDate: null,
            endDate: null,
        },
    });

    const startDate = watchDate("startDate");

    const onDateSubmit = (data: DateFormValues) => {
        if (props.onDateSubmit) {
            props.onDateSubmit(data);
        }
    };

    const handleReset = () => {
        resetDate({
            startDate: null,
            endDate: null,
        });
        if (props.onDateSubmit) {
            props.onDateSubmit({ startDate: null, endDate: null });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 6, md: 4 }} sx={{ minWidth: "170px", maxWidth: "200px" }}>
                    <Controller
                        name="startDate"
                        control={controlDate}
                        rules={{ required: "La fecha de inicio es obligatoria" }}
                        render={({ field }) => (
                            <>
                                <DatePicker
                                    {...field}
                                    format="DD/MM/YYYY"
                                    label="Fecha de inicio"
                                    sx={{ width: "100%" }}
                                    onChange={(date) => field.onChange(date)}
                                />
                                {dateErrors.startDate && (
                                    <Typography color="error" variant="body2">
                                        {dateErrors.startDate.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid2>
                <Grid2 size={{ xs: 6, md: 4 }} sx={{ minWidth: "170px", maxWidth: "200px"}}>
                    <Controller
                        name="endDate"
                        control={controlDate}
                        rules={{
                            required: "La fecha de fin es obligatoria",
                            validate: (value) => {
                                if (startDate && value && dayjs(value).isBefore(dayjs(startDate))) {
                                    return "La fecha de fin no puede ser anterior a la fecha de inicio";
                                }
                                return true;
                            },
                        }}
                        render={({ field }) => (
                            <>
                                <DatePicker
                                    {...field}
                                    format="DD/MM/YYYY"
                                    label="Fecha de fin"
                                    sx={{ width: "100%" }}
                                    minDate={startDate || undefined}
                                    onChange={(date) => field.onChange(date)}
                                />
                                {dateErrors.endDate && (
                                    <Typography color="error" variant="body2">
                                        {dateErrors.endDate.message}
                                    </Typography>
                                )}
                            </>
                        )}
                    />
                </Grid2>
                {/* Botón Filtrar después de los campos de fechas */}
                <Grid2 size={{ xs: 12, md: 4 }}
                    sx={{
                        minWidth: '80px',
                        marginBottom: { xs: '21px', md: '0px' },
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        maxHeight: '54px'
                    }}>
                    <Button
                        type="submit"
                        className="buttonFiltrarBuscar"
                        sx={{ width: "100px" }}
                        onClick={handleDateSubmit(onDateSubmit)}
                    >
                        Filtrar
                    </Button>
                    <Button
                    sx={{
                        minWidth: '80px',
                        marginLeft: {xs:'10px'},
                        marginBottom: { xs: '21px', md: '0px' },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxHeight: '54px'
                    }}
                        type="button"
                        className="buttonFiltrarBuscar"
                        onClick={handleReset}
                    >
                        Limpiar
                    </Button>
                </Grid2>
            </Grid2>
        </LocalizationProvider>
    )
}
