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

//TODO: Cambiar el fetch por axios y pedir los datos desde el page.tsx
export const TendenciaGeneral = ({dataIngresos, dataEgresos}: Props) => {

    const [loading, setLoading] = useState(false);
    const [ingresos, setIngresos] = useState<number[]>([]);
    const [egresos, setEgresos] = useState<number[]>([]);
    const [xAxis, setXAxis] = useState<String[]>(['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']);

    loading ? <div>Cargando...</div> : null;

    const fetchData = async () => {
        try {
            setLoading(true);
            setIngresos(dataIngresos.length > 0 ? dataIngresos.map(item => item.value) : [0]);
            setEgresos(dataEgresos.length > 0 ? dataEgresos.map(item => item.value) : [0]);
            setXAxis(dataEgresos.length > 0 ? dataEgresos.map(item => item.label) : ['']);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 100000000);
        return () => clearInterval(interval);
    }, [dataEgresos]);

    return (
        <>
            <LineChart
                series={[
                    { curve: 'linear', data: ingresos },
                    { curve: 'linear', data: egresos },
                ]}
                xAxis={[
                    {
                        data: xAxis,
                        scaleType: 'band',
                    },
                ]}
            />
        </>
    )
}
