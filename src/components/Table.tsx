import { IconButton, Button, useTheme, Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Location } from "../mocks/db";
import { useState } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

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

  const theme = useTheme();
  const colors = theme.palette;

  const columns: GridColDef[] = [
    {
      field: "starred",
      headerName: "Star",
      renderHeader: () => <RefreshOutlinedIcon />,
      width: 50,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onToggleStar(params.row.id);
          }}
        >
          {starredIds.includes(params.row.id) ? (
            <StarIcon htmlColor={colors.notice.main} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Locations",
      flex: 1,
      renderCell: (params) => (
        <Button
          style={{
            background: params.row.robot?.is_online
              ? colors.primary.main
              : colors.grey[400],
            color: "white",
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderRadius: "8px",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Typography
            textAlign={"center"}
            style={{
              flexGrow: 1,
            }}
            fontWeight={"bold"}
          >
            {params.row.name}
          </Typography>
          <ChevronRightOutlinedIcon style={{ color: "white" }} />
        </Button>
      ),
    },
    {
      field: "robot_id",
      headerName: "Robots",
      width: 150,
      renderCell: (params) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {params.row.robot?.id ? (
            <Box display={"flex"} alignItems={"center"}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: colors.success.main,
                  borderRadius: "50%",
                  marginRight: "8px",
                }}
              />
              <span>{params.row?.robot?.id}</span>
            </Box>
          ) : (
            <div>
              <Typography
                style={{
                  color: colors.primary.main,
                  display: "inline-block",
                  borderBottom: `1px solid ${colors.grey[400]}`,
                }}
              >
                Add
              </Typography>
            </div>
          )}
        </div>
      ),
    },
    {
      field: "Location Types",
      headerName: "Location Types",
      width: 200,
      renderCell: (params) => (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <Typography display={"inline-block"}>
              {params.row.name.length > 12 ? "Serving" : "Disinfection"}
            </Typography>
          </div>
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
        checkboxSelection
      />
    </div>
  );
};
