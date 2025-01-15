import { Box } from '@mui/system';
import React from 'react';

const LoadingSpinner = () => {
    return (
        <Box className="flex justify-center items-center w-full h-full">
            <Box className="w-16 h-16 border-4 border-t-1 border-gray-200 border-t-blue-500 rounded-full animate-spin"></Box>
        </Box>
    );
};

export default LoadingSpinner;
