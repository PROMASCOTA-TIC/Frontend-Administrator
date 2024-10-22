import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { Box } from '@mui/material';

interface Props {
    rows: any;
    columns: GridColDef[];
}

export const Tables = ({ rows, columns }: Props) => {
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
        </Box>
    );
};
