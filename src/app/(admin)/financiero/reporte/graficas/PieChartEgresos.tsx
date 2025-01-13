import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    dataEgresos: {
        label: string;
        value: number;
    }[];
}

export const PieChartEgresos = ({ dataEgresos }: Props) => {
    const [loading, setLoading] = useState(false);
    const [egresos, setEgresos] = useState<{ label: string, value: number; }[]>([]);

    loading ? <div>Cargando...</div> : null;

    const fetchData = async () => {
        try {
            setLoading(true);
            setEgresos(dataEgresos.length > 0 ? dataEgresos : [{ label: '', value: 0 }]);
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

    const data = {
        data: egresos,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: { xs: '150px', md: '250px' },
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: { xs: '30px', md: '0px' },
            }}
        >
            <PieChart
                series={[
                    {
                        arcLabel: (item) => `${item.value}%`,
                        arcLabelMinAngle: 35,
                        arcLabelRadius: '60%',
                        ...data,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fontWeight: 'bold',
                    },
                }}
                {...size}
            />
        </Box>
    );
}

const size = {
    width: 600,
    height: 200,
};

