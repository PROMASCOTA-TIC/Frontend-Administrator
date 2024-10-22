'use client';

import { theme } from '@/config/theme.config'
import { Download } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

export const DownloadButton = () => {
    return (
        <Button
            variant="contained"
            sx={{
                marginTop: "20px",
                backgroundColor: theme.palette.primary.main,
                width: "150px",
            }}
            startIcon={<Download />}
            onClick={() => console.log("Descargando...")}
        >
            Descargar
        </Button>
    )
}
