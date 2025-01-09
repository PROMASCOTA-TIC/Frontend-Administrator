"use client"; // Indica que este componente es un Client Component

import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button, Select, MenuItem, SelectChangeEvent, TableContainer, Paper, CircularProgress, Divider, InputLabel } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FeedbackSummary {
    totalVotes: number;
    positiveVotes: number;
    negativeVotes: number;
    satisfaction: number;
}

interface FeedbackDetail {
    vote: 'positivo' | 'negativo';
    rating: number;
    feedbackOptions: string[];
    comment: string;
}

const VotosYComentarios = () => {
    const [showComments, setShowComments] = useState(false);
    const [feedbackSummary, setFeedbackSummary] = useState<FeedbackSummary | null>(null);
    const [feedbackDetails, setFeedbackDetails] = useState<FeedbackDetail[]>([]);
    const [filterVote, setFilterVote] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(true);
    const [loadingDetails, setLoadingDetails] = useState(true);

    const { id: faqId } = useParams();
    console.log("ID del FAQ desde la URL:", faqId);

    useEffect(() => {
        const fetchFeedbackSummary = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/faqs/feedback/${faqId}/summary`);
                const data = await response.json();
                setFeedbackSummary(data);
            } catch (error) {
                console.error('Error al obtener las estadísticas de feedback:', error);
            } finally {
                setLoadingSummary(false);
            }
        };

        fetchFeedbackSummary();
    }, [faqId]);

    useEffect(() => {
        if (showComments) {
            const fetchFeedbackDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/faqs/feedback/${faqId}/details`);
                    const data = await response.json();
                    setFeedbackDetails(data);
                } catch (error) {
                    console.error('Error al obtener los detalles de feedback:', error);
                } finally {
                    setLoadingDetails(false);
                }
            };

            fetchFeedbackDetails();
        }
    }, [showComments, faqId]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilterVote(event.target.value);
    };

    if (loadingSummary) {
        return (
            <Box className='flex-center' sx={{ padding: "20px" }}>
                <CircularProgress />
                <p>Cargando estadísticas...</p>
            </Box>
        );
    }

    return (
        <Box className='flex-column' sx={{ width: '100%', gap: '21px' }}>

            {/* Línea divisoria */}
            <Divider sx={{ marginY: "21px", borderColor: "#00AA28" }} />

            {/* Tabla de estadísticas */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de estadísticas">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell className='n-bold txt-center'>Total votos</TableCell>
                            <TableCell className='n-bold txt-center'>Votos positivos</TableCell>
                            <TableCell className='n-bold txt-center'>Votos negativos</TableCell>
                            <TableCell className='n-bold txt-center'>Satisfacción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className='n-regular txt-center'>{feedbackSummary?.totalVotes || 0}</TableCell>
                            <TableCell className='n-regular txt-center'>{feedbackSummary?.positiveVotes || 0}</TableCell>
                            <TableCell className='n-regular txt-center'>{feedbackSummary?.negativeVotes || 0}</TableCell>
                            <TableCell className='n-regular txt-center'>
                                {feedbackSummary && typeof feedbackSummary.satisfaction === 'number'
                                    ? `${feedbackSummary.satisfaction.toFixed(1)}%`
                                    : '0%'}
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Botón para mostrar/ocultar comentarios */}
            <div className='flex-center'>
                <Button
                    variant="contained"
                    className='bg-primary n-regular'
                    sx={{
                        textTransform: 'none',
                        width: { xs: '100%', md: 'auto' },
                        height: { xs: '40px', md: '50px' },
                    }}
                    onClick={toggleComments}>
                    {showComments ? 'Ocultar comentarios' : 'Ver comentarios'}
                </Button>
            </div>

            {/* Filtrado por tipo de voto */}
            {showComments && (
                <>
                    <div>
                        <InputLabel style={{ paddingBottom: '8px' }}>Filtrar por tipo de voto:</InputLabel>
                        <Select
                            value={filterVote}
                            onChange={handleFilterChange}
                            displayEmpty
                            sx={{
                                minWidth: 200,
                                borderRadius: '15px',
                            }}
                        >
                            <MenuItem value=""><em>Todos</em></MenuItem>
                            <MenuItem value="positivo">Positivo</MenuItem>
                            <MenuItem value="negativo">Negativo</MenuItem>
                        </Select>
                    </div>

                    {/* Tabla de comentarios */}
                    {loadingDetails ? (
                        <Box className='flex-center' sx={{ padding: "20px" }}>
                            <CircularProgress />
                            <p>Cargando comentarios...</p>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="tabla de comentarios">
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow>
                                        <TableCell className='n-bold txt-center'>Voto</TableCell>
                                        <TableCell className='n-bold txt-center'>Rating</TableCell>
                                        <TableCell className='n-bold txt-center'>Opciones seleccionadas</TableCell>
                                        <TableCell className='n-bold txt-center'>Comentario</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {feedbackDetails
                                        .filter((detail) => !filterVote || detail.vote === filterVote)
                                        .map((detail, index) => (
                                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                                <TableCell align="center">{detail.vote || '-'}</TableCell>
                                                <TableCell align="center">{detail.rating || '-'}</TableCell>
                                                <TableCell align="center">{detail.feedbackOptions.join(', ') || '-'}</TableCell>
                                                <TableCell align="center">{detail.comment || '-'}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
        </Box>
    );
};

export default VotosYComentarios;