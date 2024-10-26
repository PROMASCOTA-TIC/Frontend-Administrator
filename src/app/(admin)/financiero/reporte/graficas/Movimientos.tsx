import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { datosMovimientos, valueFormatter } from "./Datos";
import { Box } from "@mui/material";

interface Props {
    selectedCategory: string;
    tipoMovimiento: string;
}

export const Movimientos = ({ selectedCategory, tipoMovimiento }: Props) => {

    // const [loading, setLoading] = useState(false);
    // const [ingresos, setIngresos] = useState<number[]>([]);

    // loading ? <div>Cargando...</div> : null;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const responseIngresos = await fetch(`/api/${tipoMovimiento}?year=${selectedCategory}`);
    //             const dataIngresos = await responseIngresos.json();

    //             setIngresos(dataIngresos.length > 0 ? dataIngresos : [0]);
    //         } catch (error) {
    //             console.error('Error al obtener los datos:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    //     const interval = setInterval(fetchData, 100000000);
    //     return () => clearInterval(interval);
    // }, [selectedCategory]);

    return (
        <Box
            sx={{
                display: 'flex',
                height: { xs: '150px', md: '250px' },
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: {xs: '30px', md: '0px'},
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
    width: 400,
    height: 200,
};

const data = {
    data: datosMovimientos,
    valueFormatter,
};