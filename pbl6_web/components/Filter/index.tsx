import React from "react";
import { GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";

interface ReportRenderToolbarProps {
  // Define the type for props if needed
}

const ReportRenderToolbar: React.FC<ReportRenderToolbarProps> = (props) => {
  
  return (
    <GridToolbarContainer sx={{ top: -120 }}>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};

export default ReportRenderToolbar;
