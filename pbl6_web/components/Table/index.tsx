import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';


interface TableCategoryProps {
  rows: any[];
  columns: GridColDef[];
  rowSelectionModel: GridRowSelectionModel;
  setRowSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
  slots?: {
    toolbar?: React.ComponentType<any>;
  };
  checkboxSelection?: boolean
}

export default function Table({ 
  rows,
  columns,
  rowSelectionModel,
  setRowSelectionModel,
  slots,
  checkboxSelection = true
}: TableCategoryProps) {

  const tableHeaderStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  return (
    <Box sx={{ 
      height: "700px", 
      width: "100%", 
      background: "#fff", 
      marginTop: "32px",
    }}>
      <DataGrid
        rows={rows || []}
        columns={columns.map(column => ({ ...column, headerAlign: 'center', headerStyle: tableHeaderStyles }))}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          }
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        checkboxSelection={checkboxSelection}
        rowHeight={80}
        sx={{
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #DEE2E6",
            whiteSpace: "normal!important",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid #DEE2E6",
          },
        }}
        disableRowSelectionOnClick
        components={{
          Toolbar: slots?.toolbar,
        }}
      />
    </Box>

  );
}