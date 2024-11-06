'use client';

import { theme } from '@/config/theme.config';
import { Download } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';


interface Ingreso {
    category: string;
    amount: number;
    description: string;
}

interface Egreso {
    category: string;
    amount: number;
    description: string;
}

interface FinancialData {
    financialData: {
        ingresos: Ingreso[];
        egresos: Egreso[];
        totalIngresos: number;
        totalEgresos: number;
        balance: number;
    }
}

export const DownloadButton: React.FC<FinancialData> = ({ financialData }) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDownload = (type: string) => {
        if (type === 'excel') {
            downloadExcel({ financialData });
        } else if (type === 'pdf') {
            downloadPDF({ financialData });
        } else {
            console.error('Tipo de archivo no soportado');
        }
        setOpen(false);
    };

    const downloadExcel = ({ financialData }: FinancialData) => {
        if (!financialData || !financialData.ingresos || !financialData.egresos) {
            console.error('No hay datos financieros para exportar.');
            return;
        }
    
        const wb = XLSX.utils.book_new();
    
        const ingresosSheet = [
            ['Categoría', 'Monto', 'Descripción'],
            ...financialData.ingresos.map((item) => [item.category, item.amount, item.description]),
        ];
        const wsIngresos = XLSX.utils.aoa_to_sheet(ingresosSheet);
        XLSX.utils.book_append_sheet(wb, wsIngresos, 'Ingresos');
    
        const egresosSheet = [
            ['Categoría', 'Monto', 'Descripción'],
            ...financialData.egresos.map((item) => [item.category, item.amount, item.description]),
        ];
        const wsEgresos = XLSX.utils.aoa_to_sheet(egresosSheet);
        XLSX.utils.book_append_sheet(wb, wsEgresos, 'Egresos');
    
        const resumenSheet = [
            ['Total Ingresos', financialData.totalIngresos],
            ['Total Egresos', financialData.totalEgresos],
            ['Balance', financialData.balance],
        ];
        const wsResumen = XLSX.utils.aoa_to_sheet(resumenSheet);
        XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen');
    
        const addTableFormatting = (ws: XLSX.WorkSheet, range: XLSX.Range) => {
            const ref = XLSX.utils.encode_range(range);
            ws['!ref'] = ref;
            ws['!autofilter'] = { ref };
        };

        addTableFormatting(wsIngresos, XLSX.utils.decode_range(wsIngresos['!ref']!));
        addTableFormatting(wsEgresos, XLSX.utils.decode_range(wsEgresos['!ref']!));
    
        XLSX.writeFile(wb, 'reporte_financiero.xlsx');
    };


    const downloadPDF = ({ financialData }: FinancialData) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('PROMASCOTA', 105, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.text('Reporte Financiero', 105, 30, { align: 'center' });

        doc.setFontSize(14);
        doc.text('Ingresos', 14, 40);

        let startY = 45;
        doc.setFontSize(12);

        autoTable(doc, {
            startY: startY,
            head: [['Categoría', 'Monto', 'Descripción']],
            body: financialData.ingresos.map(item => [item.category, `$${item.amount}`, item.description]),
        });

        startY = (doc as any).autoTable.previous.finalY + 10;
        doc.setFontSize(14);
        doc.text('Egresos', 14, startY);

        startY += 5;
        doc.setFontSize(12);

        autoTable(doc, {
            startY: startY,
            head: [['Categoría', 'Monto', 'Descripción']],
            body: financialData.egresos.map(item => [item.category, `$${item.amount}`, item.description]),
        });

        startY = (doc as any).autoTable.previous.finalY + 10;
        doc.setFontSize(14);
        doc.text('Resumen', 14, startY);

        startY += 5;
        doc.setFontSize(12);
        doc.text(`Total Ingresos: $${financialData.totalIngresos}`, 14, startY);
        doc.text(`Total Egresos: $${financialData.totalEgresos}`, 14, startY + 5);
        doc.text(`Balance: $${financialData.balance}`, 14, startY + 10);

        doc.save('reporte_financiero.pdf');
    };


    return (
        <>
            <Button
                variant="contained"
                sx={{
                    marginTop: "20px",
                    backgroundColor: theme.palette.primary.main,
                    width: "150px",
                    textTransform: "none",
                }}
                startIcon={<Download />}
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setOpen(true);
                }}
            >
                Descargar
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => handleDownload('excel')}>EXCEL</MenuItem>
                <MenuItem onClick={() => handleDownload('pdf')}>PDF</MenuItem>
            </Menu>
        </>
    );
};
