"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const ChatbotStatsPage = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Función para obtener las estadísticas del chatbot
    const fetchStats = async () => {
        if (!startDate || !endDate) {
            setError("Debe seleccionar ambas fechas.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/api/chatbot/stats?startDate=${startDate}&endDate=${endDate}`);

            if (!response.ok) {
                throw new Error("Error al obtener las estadísticas");
            }

            const data = await response.json();
            setStats(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Configuración de la gráfica de pastel
    const chartData = stats
        ? {
            labels: ["Positivo", "Negativo"],
            datasets: [
                {
                    data: [stats.positiveFeedback, stats.negativeFeedback],
                    backgroundColor: ["#00c853", "#d50000"],
                },
            ],
        }
        : null;

    return (
        <Box sx={{ padding: "34px", textAlign: "center" }}>
            <Typography variant="h4" className="h1-bold txtcolor-primary" sx={{ marginBottom: "20px" }}>
                📊 Rendimiento del Chatbot
            </Typography>

            {/* Selección de fechas */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
                <TextField
                    type="date"
                    label="Fecha inicio"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                    type="date"
                    label="Fecha fin"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                    variant="contained"
                    className="bg-primary n-regular"
                    onClick={fetchStats}
                    sx={{
                        textTransform: 'none',
                        width: 'auto', // Ajusta el ancho según el tamaño de pantalla
                        height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                    }}
                >
                    Consultar
                </Button>

            </Box>

            {error && <Typography color="error">{error}</Typography>}

            {/* Mostrar cargando */}
            {loading && <CircularProgress sx={{ color: "#004040", margin: "20px" }} />}

            {/* Mostrar estadísticas y gráfica */}
            {stats && (
                <Box sx={{ marginTop: "20px" }}>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                        📈 Total de votos: {stats.totalVotes}
                    </Typography>
                    <Typography>👍 Positivos: {stats.positiveFeedback}</Typography>
                    <Typography>👎 Negativos: {stats.negativeFeedback}</Typography>
                    <Typography sx={{ marginTop: "10px" }}>🎯 Satisfacción: {stats.satisfaction}</Typography>

                    {/* Gráfica de pastel */}
                    <Box sx={{ width: "300px", margin: "20px auto" }}>
                        <Pie data={chartData!} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChatbotStatsPage;