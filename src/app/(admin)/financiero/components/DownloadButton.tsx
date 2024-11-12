'use client';

import { theme } from '@/config/theme.config';
import { Download } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import ExcelJS from 'exceljs';

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

    const downloadExcel = async ({ financialData }: FinancialData) => {
        if (!financialData || !financialData.ingresos || !financialData.egresos) {
            console.error('No hay datos financieros para exportar.');
            return;
        }

        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'Your App';
        workbook.created = new Date();

        const ingresosSheet = workbook.addWorksheet('Ingresos');
        ingresosSheet.addRow(['Categoría', 'Monto', 'Descripción']);
        financialData.ingresos.forEach(item => {
            ingresosSheet.addRow([item.category, item.amount, item.description]);
        });

        const egresosSheet = workbook.addWorksheet('Egresos');
        egresosSheet.addRow(['Categoría', 'Monto', 'Descripción']);
        financialData.egresos.forEach(item => {
            egresosSheet.addRow([item.category, item.amount, item.description]);
        });

        const resumenSheet = workbook.addWorksheet('Resumen');
        resumenSheet.addRow(['Total Ingresos', financialData.totalIngresos]);
        resumenSheet.addRow(['Total Egresos', financialData.totalEgresos]);
        resumenSheet.addRow(['Balance', financialData.balance]);

        [ingresosSheet, egresosSheet, resumenSheet].forEach(sheet => {
            sheet.columns.forEach(column => {
                if (column && column.eachCell) {
                    column.eachCell((cell, rowNumber) => {
                        if (rowNumber === 1) {
                            cell.font = { bold: true };
                            cell.alignment = { vertical: 'middle', horizontal: 'center' };
                        }
                    });
                }
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reporte_financiero.xlsx';
        link.click();
        URL.revokeObjectURL(url);
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
                <MenuItem onClick={() => handleDownload('excel')}>Descargar como XLSX</MenuItem>
                <MenuItem onClick={() => handleDownload('pdf')}>Imprimir</MenuItem>
            </Menu>
        </>
    );
};
