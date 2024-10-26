import { Tooltip, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Location } from "../mocks/db";
import { useState } from "react";

interface TableProps {
  locations: Location[];
  onPageChange: (page: number) => void;
  starredIds: number[];
  loading: boolean;
  onToggleStar: (locationId: number) => void;
  totalCount: number;
}
export const Table = ({
  locations,
  onPageChange,
  starredIds,
  loading,
  onToggleStar,
  totalCount,
}: TableProps) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 6,
  });
  console.log("starredIds", starredIds);

  const columns: GridColDef[] = [
    {
      field: "starred",
      headerName: "Star",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => onToggleStar(params.row.id)}>
          {starredIds.includes(params.row.id) ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    { field: "name", headerName: "Locations", width: 200 },
    {
      field: "robot_id",
      headerName: "Robots",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.row.robot.is_online ? (
            <Tooltip title="Online">
              <span style={{ color: "green" }}>{params.row.robot.id}</span>
            </Tooltip>
          ) : (
            <Tooltip title="Offline">
              <span style={{ color: "gray" }}>Add</span>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={locations}
        columns={columns}
        loading={loading}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => {
          setPaginationModel(newModel);
          onPageChange(newModel.page);
        }}
        rowCount={totalCount}
      />
    </div>
  );
};
