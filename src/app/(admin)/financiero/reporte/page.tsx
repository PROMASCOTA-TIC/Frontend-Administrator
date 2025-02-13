'use client';

import { useState, useEffect } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import { TendenciaGeneral } from './graficas/TendenciaGeneral';
import { FilterSelector } from '../components/FilterSelector';
import { DateFilter, DownloadButton } from '../components';
import { PieChartEgresos, PieChartIngresos } from './graficas';
import { URL_BASE } from '@/config/config';
import axios from 'axios';
import Notification from '@/components/ui/notifications/Notification';
import { Dayjs } from 'dayjs';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';

const timePeriods = [
    { label: 'Año en curso', value: '0' },
    { label: 'Ultima semana', value: '1' },
    { label: 'Ultimo mes', value: '2' },
    { label: 'Ultimo trimestre', value: '3' },
    { label: 'Ultimo semestre', value: '4' },
];

export default function Reporte() {
    const [generalData, setGeneralData] = useState({
        ingresos: [{ id: '', userName: '', amount: 0.0, incomeDate: new Date() }],
        egresos: [{ id: '', category: '', description: '', price: 0.0, expenseDate: new Date() }],
        ventas: [{ id: '', entrepreneurName: '', productName: '', productCategory: '', amount: 0.0, saleDate: new Date() }],
        totalIngresos: 0,
        totalEgresos: 0,
        balance: 0,
    });
    const [ingresosTG, setIngresosTG] = useState([{ 'label': '', 'value': 0 }]);
    const [egresosTG, setEgresosTG] = useState([{ 'label': '', 'value': 0 }]);
    const [ingresosPC, setIngresosPC] = useState([{ 'label': '', 'value': 0 }]);
    const [egresosPC, setEgresosPC] = useState([{ 'label': '', 'value': 0 }]);
    const [balance, setBalance] = useState(0);
    const [totalIngresos, setTotalIngresos] = useState(0);
    const [totalEgresos, setTotalEgresos] = useState(0);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<string[]>([
        new Date(Date.UTC(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)).toISOString(),
        new Date(Date.UTC(new Date().getFullYear() + 1, 0, 1, 0, 0, 0, 0)).toISOString()
    ]);
    const [loading, setLoading] = useState(false)

    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchData(selectedTimePeriod[0], selectedTimePeriod[1]);
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <Box className="pt-e55">
                <LoadingSpinner />
            </Box>
        );
    }

    const fetchData = async (startDate: string, endDate: string) => {
        await fetchGeneralData(startDate, endDate);
        await fetchIngresosTG(startDate, endDate);
        await fetchEgresosTG(startDate, endDate);
        await fetchIngresosPC(startDate, endDate);
        await fetchEgresosPC(startDate, endDate);
        await fetchTotalIncomes(startDate, endDate);
        await fetchTotalExpenses(startDate, endDate);
        await fetchBalance(startDate, endDate);
        setLoading(false);
    };

    const fetchGeneralData = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/data`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const formattedEgresos = response.data.egresos.map((expense: any) => ({
                id: expense.id,
                category: expense.category,
                description: expense.description,
                price: Number(expense.price),
                expenseDate: new Date(expense.expenseDate).toLocaleDateString()
            }));
            const formattedIngresos = response.data.ingresos.map((income: any) => ({
                id: income.id,
                userName: income.userName,
                amount: Number(income.amount),
                incomeDate: new Date(income.incomeDate).toLocaleDateString()
            }))
            const formattedVentas = response.data.ventas.map((sale: any) => ({
                id: sale.id,
                entrepreneurName: sale.entrepreneurName,
                productName: sale.productName,
                productCategory: sale.productCategory,
                amount: Number(sale.amount),
                saleDate: new Date(sale.saleDate).toLocaleDateString()
            }))
            setGeneralData({
                ingresos: formattedIngresos,
                egresos: formattedEgresos,
                ventas: formattedVentas,
                totalIngresos: parseFloat(response.data.incomes) || 0,
                totalEgresos: parseFloat(response.data.expenses) || 0,
                balance: parseFloat(response.data.balance) || 0,
            });
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching general data', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchIngresosTG = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/incomes-date`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const formattedIngresosTG = response.data.map((income: any) => ({
                label: income.label,
                value: Number(income.value)
            }));
            setIngresosTG(formattedIngresosTG);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching ingresos TG', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchEgresosTG = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/expenses-date`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const formattedEgresosTG = response.data.map((expense: any) => ({
                label: expense.label,
                value: expense.value
            }));
            setEgresosTG(formattedEgresosTG);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching egresos TG', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchIngresosPC = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/incomes-categories`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const formattedIngresosPC = response.data.map((income: any) => ({
                label: income.label,
                value: income.value
            }));
            setIngresosPC(formattedIngresosPC);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching ingresos PC', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchEgresosPC = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/expenses-categories`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const formattedEgresosPC = response.data.map((expense: any) => ({
                label: expense.label,
                value: expense.value
            }));
            setEgresosPC(formattedEgresosPC);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching egresos PC', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchTotalIncomes = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/total-incomes`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            setTotalIngresos(response.data);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching incomes', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchTotalExpenses = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/total-expenses`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            setTotalEgresos(response.data);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            console.error('Error fetching expenses', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchBalance = async (startDate?: string, endDate?: string) => {
        try {
            const response = await axios.post(`${URL_BASE}financial-report/balance`, {
                startDate: startDate ? startDate : selectedTimePeriod[0],
                endDate: endDate ? endDate : selectedTimePeriod[1],
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            setBalance(response.data);
        } catch (error) {
            console.error('Error fetching balance', error);
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    }

    const fetchDataByType = async (type: string, startDate: string, endDate: string) => {
        console.log('startDateTYPE', startDate);
        console.log('endDateTYPE', endDate);
        if (type === 'ingresos') {
            await fetchIngresosPC(startDate, endDate);
            await fetchTotalIncomes(startDate, endDate);
        }
        if (type === 'egresos') {
            await fetchTotalExpenses(startDate, endDate);
            await fetchEgresosPC(startDate, endDate);
        }
        if (type === 'tendency') {
            await fetchIngresosTG(startDate, endDate);
            await fetchEgresosTG(startDate, endDate);
            await fetchBalance(startDate, endDate);
        }
    }

    const handleOptionChange = async (timePeriod: string, type: string) => {
        const now = new Date();
        const currentMonth = now.getMonth();
        let startDate = '';
        let endDate = '';
        switch (timePeriod) {
            case '0':
                startDate = new Date(Date.UTC(now.getFullYear(), 0, 1, 0, 0, 0, 0)).toISOString();
                endDate = new Date(Date.UTC(now.getFullYear(), 11, 31, 23, 59, 59, 999)).toISOString();
                fetchDataByType(type, startDate, endDate);
                console.log('startDate', startDate);
                console.log('endDate', endDate);
                break;
            case '1':
                const startOfWeek = new Date(Date.UTC(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1),
                    0, 0, 0, 0
                ));
                const endOfWeek = new Date(Date.UTC(
                    startOfWeek.getFullYear(),
                    startOfWeek.getMonth(),
                    startOfWeek.getDate() + 6,
                    23, 59, 59, 999
                ));
                const startISODate = startOfWeek.toISOString();
                const endISODate = endOfWeek.toISOString();
                fetchDataByType(type, startISODate, endISODate);
                console.log('startDate', startISODate);
                console.log('endDate', endISODate);
                break;
            case '2':
                startDate = new Date(Date.UTC(now.getFullYear(), currentMonth , 1, 0, 0, 0, 0)).toISOString();
                endDate = new Date(Date.UTC(now.getFullYear(), currentMonth + 1, 1, 0, 0, 0, 0)).toISOString();
                fetchDataByType(type, startDate, endDate);
                console.log('startDate', startDate );
                console.log('endDate', endDate);
                break;
            case '3':
                const currentQuarter = Math.floor(currentMonth / 3);
                const startMonthT = currentQuarter * 3;
                const endMonthT = startMonthT + 2;
                const startOfQuarter = new Date(Date.UTC(now.getFullYear(), startMonthT, 1, 0, 0, 0, 0));
                const endOfQuarter = new Date(Date.UTC(now.getFullYear(), endMonthT + 1, 0, 23, 59, 59, 999));
                fetchDataByType(type, startOfQuarter.toISOString(), endOfQuarter.toISOString());
                console.log('startDate', startOfQuarter);
                console.log('endDate', endOfQuarter);
                break;
            case '4':
                const startMonth = currentMonth < 6 ? 0 : 6;
                const endMonth = startMonth === 0 ? 5 : 11;
                const startOfLastSemester = new Date(Date.UTC(now.getFullYear(), startMonth, 1, 0, 0, 0, 0));
                const endOfLastSemester = new Date(Date.UTC(now.getFullYear(), endMonth + 1, 0, 23, 59, 59, 999));
                fetchDataByType(type, startOfLastSemester.toISOString(), endOfLastSemester.toISOString());
                console.log('startDate', startOfLastSemester);
                console.log('endDate', endOfLastSemester);
                break;
            default:
                fetchData(selectedTimePeriod[0], selectedTimePeriod[1]);
                console.log('startDate', startDate);
                console.log('endDate', endDate);
                break;
        }
    };

    const handleDateSubmit = (data: { startDate: Dayjs | null, endDate: Dayjs | null }) => {
        setLoading(true);
        if (data.startDate && data.endDate) {
            fetchData(data.startDate.toISOString(), data.endDate.toISOString());
        } else {
            setNotification({ open: true, message: 'Fechas no válidas', type: 'error' });
        }
        setLoading(false);
    };

    return (
        <>
            <Grid2 container rowSpacing={{ xs: '20px', md: '34px' }}
                sx={{
                    margin: '21px 0'
                }}
            >
                <Notification
                    open={notification.open}
                    onClose={() => setNotification({ ...notification, open: false })}
                    message={notification.message}
                    type={notification.type}
                />
                <Grid2 size={12} className="flex justify-center">
                    <Typography className="font-bold text-primary mb-e8"
                        sx={{
                            fontSize: { xs: "26px", md: "34px" },
                        }}
                    >
                        Reporte financiero
                    </Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}
                    sx={{
                        marginLeft: { xs: '13px', md: '64px' },
                    }}
                >
                    <DateFilter
                        onDateSubmit={handleDateSubmit}
                    />
                </Grid2>
                <Grid2
                    size={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                            gap: { xs: '21px', sm: '34px', md: '5%' },
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: '95%', md: '90%' },
                        }}
                    >
                        <Box
                            id='Ingresos'
                            sx={{
                                height: { xs: '300px', md: '350px' },
                                width: { xs: '100%', sm: '48%', md: '48%' },
                                border: '1px solid black',
                                borderRadius: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'left',
                                    justifyContent: 'left',
                                    marginTop: '8px',
                                    marginBottom: '13px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'left',
                                        fontSize: { xs: '18px', md: '24px' },
                                        fontWeight: 'bold',
                                        color: themePalette.primary,
                                        marginLeft: { xs: '16px', md: '21px' },
                                    }}
                                >
                                    Ingresos
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <FilterSelector
                                    label="Seleccione"
                                    options={timePeriods}
                                    onFilterChange={(timePeriod) => handleOptionChange(timePeriod, 'ingresos')}
                                    sx={'200px'}
                                    md={'60%'}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: themePalette.primary,
                                        marginRight: { xs: '16px', md: '13px' },
                                    }}
                                >
                                    ${totalIngresos}
                                </Typography>
                            </Box>
                            <PieChartIngresos dataIngresos={ingresosPC} />
                        </Box>
                        <Box
                            id='Egresos'
                            sx={{
                                height: { xs: '300px', md: '350px' },
                                width: { xs: '100%', sm: '48%', md: '48%' },
                                border: '1px solid black',
                                borderRadius: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'left',
                                    justifyContent: 'left',
                                    marginTop: '8px',
                                    marginBottom: '13px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: 'left',
                                        fontSize: { xs: '18px', md: '24px' },
                                        fontWeight: 'bold',
                                        color: themePalette.primary,
                                        marginLeft: { xs: '16px', md: '21px' },
                                    }}
                                >
                                    Egresos
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <FilterSelector
                                    label="Seleccione"
                                    options={timePeriods}
                                    onFilterChange={(timePeriod) => handleOptionChange(timePeriod, 'egresos')}
                                    sx={'200px'}
                                    md={'60%'}
                                />
                                <Typography
                                    sx={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: themePalette.primary,
                                        marginRight: { xs: '16px', md: '13px' },
                                    }}
                                >
                                    ${totalEgresos}
                                </Typography>
                            </Box>
                            <PieChartEgresos dataEgresos={egresosPC} />
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        id='TendenciaGeneral'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '350px',
                            width: { xs: '95%', md: '90%' },
                            border: '1px solid black',
                            borderRadius: '15px',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'left',
                                marginTop: '8px',
                                marginBottom: '13px',
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: { xs: '18px', md: '24px' },
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginLeft: { xs: '16px', md: '32px' },
                                }}
                            >
                                Tendencia General
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                px: { xs: '16px', md: '32px' },
                            }}
                        >
                            <FilterSelector
                                label="Seleccione"
                                options={timePeriods}
                                onFilterChange={(timePeriod) => handleOptionChange(timePeriod, 'tendency')}
                                sx={'200px'}
                                md={'60%'}
                            />
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                }}
                            >
                                ${balance}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '95%',
                                height: '200px',
                                marginTop: '18px',
                            }}
                        >
                            <TendenciaGeneral dataEgresos={egresosTG} dataIngresos={ingresosTG} />
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={12} sx={{ marginLeft: "64px" }}>
                    <DownloadButton financialData={generalData} />
                </Grid2>
            </Grid2>
        </>
    );
}