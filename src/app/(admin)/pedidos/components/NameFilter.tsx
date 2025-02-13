'use client';

import { useForm, Controller } from "react-hook-form";
import { Button, Typography, TextField, Grid2 } from "@mui/material";
import "@/assets/styles/styles.css";

interface NameFormValues {
    ownerName: string;
}

interface NameFilterProps {
    onNameSubmit?: (data: NameFormValues) => void;
}

export const NameFilter = (props: NameFilterProps) => {

    // Hook form para la búsqueda por nombre
    const {
        handleSubmit: handleNameSubmit,
        control: controlName,
        formState: { errors: nameErrors },
        reset: resetName,
    } = useForm<NameFormValues>({
        defaultValues: {
            ownerName: "",
        },
    });

    const onNameSubmit = (data: NameFormValues) => {
        if (props.onNameSubmit) {
            props.onNameSubmit(data);
        }
    };

    const handleReset = () => {
        resetName({
            ownerName: "",
        });
        if (props.onNameSubmit) {
            props.onNameSubmit({ ownerName: "" });
        }
    };

    return (
        <Grid2
            container
            spacing={2}
            alignItems="left"
            justifyContent="left"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                minWidth: "650px",
            }}
        >
            <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                    minWidth: "250px",
                }}
            >
                <Controller
                    name="ownerName"
                    control={controlName}
                    rules={{
                        required: `El nombre es obligatorio`,
                        pattern: {
                            value: /^[A-Za-z\sáéíóúÁÉÍÓÚñÑ]+$/,
                            message: `El nombre solo debe contener letras`,
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                label={"Nombre del cliente"}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                onChange={(e) => field.onChange(e.target.value)}
                            />
                            {nameErrors.ownerName && (
                                <Typography color="error" variant="body2">
                                    {nameErrors.ownerName.message}
                                </Typography>
                            )}
                        </>
                    )}
                />
            </Grid2>

            {/* Botón Buscar */}
            <Grid2
                size={{ xs: 12, sm: 6 }}
                sx={{
                    minWidth: '80px',
                    marginBottom: { xs: '21px', md: '0px' },
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    maxHeight: '54px',
                }}
            >
                <Button
                    type="submit"
                    className="buttonFiltrarBuscar"
                    sx={{ width: "100px" }}
                    onClick={handleNameSubmit(onNameSubmit)}
                >
                    Buscar
                </Button>
                <Button
                    sx={{
                        minWidth: '80px',
                        marginLeft: { xs: '10px' },
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
    )
}
