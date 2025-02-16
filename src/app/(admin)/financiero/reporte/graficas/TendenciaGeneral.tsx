import { LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react'

interface Props {
    dataIngresos: {
        label: string;
        value: number;
    }[];
    dataEgresos: {
        label: string;
        value: number;
    }[];
}

export const TendenciaGeneral = ({dataIngresos, dataEgresos}: Props) => {

    const [ingresos, setIngresos] = useState<number[]>([]);
    const [egresos, setEgresos] = useState<number[]>([]);
    const [xAxis, setXAxis] = useState<String[]>(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']);

    const fetchData = async () => {
        try {
            setIngresos(dataIngresos.length > 0 ? dataIngresos.map(item => item.value) : []);
            setEgresos(dataEgresos.length > 0 ? dataEgresos.map(item => item.value) : []);
            setXAxis(dataEgresos.length > 0 ? dataEgresos.map(item => item.label) : ['']);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } 
    }

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 100000000);
        return () => clearInterval(interval);
    }, [dataEgresos]);

    return (
        <>
            <LineChart
                series={[
                    { curve: 'linear', data: ingresos, label: "Ingresos", color: '#008f39' },
                    { curve: 'linear', data: egresos, label: "Egresos", color: '#ff0100' },
                ]}
                xAxis={[
                    {
                        data: xAxis,
                        scaleType: 'band',
                    },
                ]}
                tooltip={{
                    trigger: 'item',
                }}
                loading={ingresos.length === 0 || egresos.length === 0} 
            />
        </>
    )
}
