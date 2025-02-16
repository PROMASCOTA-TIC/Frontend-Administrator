import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
    dataIngresos: {
        label: string;
        value: number;
    }[];
}

export const PieChartIngresos = ({ dataIngresos }: Props) => {

    const [ingresos, setIngresos] = useState<{ label: string, value: number; }[]>([{ label: '', value: 0 }]);

    const fetchData = async () => {
        try {
            setIngresos(dataIngresos.length > 0 ? dataIngresos : [{ label: '', value: 0 }]);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 100000000);
        return () => clearInterval(interval);
    }, [dataIngresos]);

    const data = {
        data: ingresos,
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
                loading={ingresos.length === 0}
            />
        </Box>
    );
}

const size = {
    width: 450,
    height: 200,
};

