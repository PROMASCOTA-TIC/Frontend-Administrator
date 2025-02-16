import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { themePalette } from '@/config/theme.config';
import { esES } from '@mui/x-data-grid/locales';
import { Box } from '@mui/material';

interface Props {
    rows: any;
    columns: GridColDef[];
}

const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <GridToolbarQuickFilter
                debounceMs={500}
                sx={{ marginLeft: 'auto' }}
            />
        </GridToolbarContainer>
    );
};

export const Tables = ({ rows, columns }: Props) => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                slots={{
                    toolbar: CustomToolbar,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                sx={{
                    fontSize: '1rem',
                    flexGrow: 1,
                    '& .MuiDataGrid-toolbarContainer': {
                        backgroundColor: themePalette.cwhite,
                        padding: '0.5rem',
                        border: '0px solid',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: themePalette.black10,
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: themePalette.black10,
                        fontWeight: 'bold',
                    }
                }}
            />
        </Box>
    );
};
