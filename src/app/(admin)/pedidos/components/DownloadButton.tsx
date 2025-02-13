'use client';

import { theme } from '@/config/theme.config';
import { Download } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';

interface OrderEntrepreneur {
    orderId: string;
    order: {
        businessName: string;
        address: string;
        products: any[];
    };
}

interface OrderPetOwner {
    orderId: string;
    order: {
        petOwnerName: string;
        address: string;
        products: any[];
    };
}

interface Data {
    data: (OrderEntrepreneur | OrderPetOwner)[];
}

export const DownloadButton: React.FC<Data> = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleDownload = (type: string) => {
        if (type === 'excel') {
            downloadExcel(data);
        } else if (type === 'pdf') {
            downloadPDF(data);
        } else {
            console.error('Tipo de archivo no soportado');
        }
        setOpen(false);
    };

    const downloadExcel = async (data: Data["data"]) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Hoja de ruta');

        worksheet.addRow(['Id Order', 'Nombre', 'Dirección', 'Productos']);

        let type = "";

        data.forEach(order => {
            const name = 'businessName' in order.order ? order.order.businessName : order.order.petOwnerName;
            'businessName' in order.order ? type = "E" : type = "P";
            const products = order.order.products.map(p => p).join(', ');
            worksheet.addRow([order.orderId, name, order.order.address, products]);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        if (type === "E") {
            link.download = 'Hoja de ruta de recoleccion.xlsx';
        }
        if (type === "P") {
            link.download = 'Hoja de ruta de entrega.xlsx';
        }
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadPDF = (data: Data["data"]) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('PROMASKOTA', 105, 20, { align: 'center' });

        doc.setFontSize(14);
        doc.text('Lista de Órdenes', 14, 30);

        let type = "";

        const tableData = data.map(order => {
            const name = 'businessName' in order.order ? order.order.businessName : order.order.petOwnerName;
            'businessName' in order.order ? type = "E" : type = "P";
            const products = order.order.products.map(p => `• ${p}`).join('\n');
            return [name, order.order.address, products];
        });

        autoTable(doc, {
            head: [['Nombre', 'Dirección', 'Productos']],
            body: tableData,
            startY: 40,
        });
        if ( type === "E") {
            doc.save('Hoja de ruta de recoleccion.pdf');
        }
        if( type === "P") {
            doc.save('Hoja de ruta de entrega.pdf');
        }
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
                <MenuItem onClick={() => handleDownload('pdf')}>Descargar como PDF</MenuItem>
            </Menu>
        </>
    );
};
