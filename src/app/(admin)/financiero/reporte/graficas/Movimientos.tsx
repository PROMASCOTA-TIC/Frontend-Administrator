import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

interface Props {
    selectedCategory: string;
}

export const Movimientos = (selectedCategory: Props) => {

    const [loading, setLoading] = useState(false);
    const [ingresos, setIngresos] = useState<number[]>([]);

    loading ? <div>Cargando...</div> : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responseIngresos = await fetch(`/api/ingresos?year=${selectedCategory}`);
                const dataIngresos = await responseIngresos.json();

                setIngresos(dataIngresos.length > 0 ? dataIngresos : [0]);
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
            <PieChart
                series={[
                    {
                        data: [{ id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },]
                    },
                ]}
                width={350}
                height={200}
            />
        </>
    )
}
