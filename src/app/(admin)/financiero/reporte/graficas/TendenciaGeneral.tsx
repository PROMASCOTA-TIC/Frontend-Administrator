import { LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react'

interface Props {
    selectedCategory: string;
}

export const TendenciaGeneral = (selectedCategory: Props) => {

    const [loading, setLoading] = useState(false);
    const [ingresos, setIngresos] = useState<number[]>([]);
    const [egresos, setEgresos] = useState<number[]>([]);

    loading ? <div>Cargando...</div> : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseIngresos = await fetch(`/api/ingresos?year=${selectedCategory}`);
                const dataIngresos = await responseIngresos.json();

                const responseEgresos = await fetch(`/api/egresos?year=${selectedCategory}`);
                const dataEgresos = await responseEgresos.json();

                setIngresos(dataIngresos.length > 0 ? dataIngresos : [0]);
                setEgresos(dataEgresos.length > 0 ? dataEgresos : [0]);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 100000000);
        return () => clearInterval(interval);
    }, [selectedCategory]);

    return (
        <>
            <LineChart
                series={[
                    { curve: 'linear', data: ingresos },
                    { curve: 'linear', data: egresos },
                ]}
                xAxis={[
                    {
                        data: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        scaleType: 'band',
                    },
                ]}
            />
        </>
    )
}
