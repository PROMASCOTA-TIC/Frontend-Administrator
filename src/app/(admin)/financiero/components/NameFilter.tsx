'use client';

import { useForm, Controller } from "react-hook-form";
import { Button, Typography, TextField, Grid2 } from "@mui/material";


interface NameFormValues {
    ownerName: string;
}

interface Props {
    searchParameter: string;
}

export const NameFilter = ({ searchParameter }: Props) => {

    // Hook form para la búsqueda por nombre
    const {
        handleSubmit: handleNameSubmit,
        control: controlName,
        formState: { errors: nameErrors },
    } = useForm<NameFormValues>({
        defaultValues: {
            ownerName: "",
        },
    });

    const onNameSubmit = (data: NameFormValues) => {
        console.log(`Filtrado por ${searchParameter}:`, data);
    };
    return (
        <Grid2
            container
            spacing={2}
            alignItems="left"
            justifyContent= "left"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
            }}
        >
            <Grid2
                size={{ xs: 12, sm: 8 }}
                sx={{ 
                    minWidth: "250px",
                }}
            >
                <Controller
                    name="ownerName"
                    control={controlName}
                    rules={{
                        required: `El ${searchParameter} es obligatorio`,
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: `El ${searchParameter} solo debe contener letras`,
                        },
                    }}
                    render={({ field }) => (
                        <>
                            <TextField
                                {...field}
                                label={searchParameter}
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
                size={{ xs: 12, sm: 4 }}
                sx={{ 
                    minWidth: "80px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    maxHeight: "54px",
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
            </Grid2>
        </Grid2>
    )
}
