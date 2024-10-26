import { Box } from "@mui/material";
import { useLocations } from "../hooks/useLocations";
import { Filter } from "./Filter";
import { Table } from "./Table";

export const Dashboard = () => {
  const {
    locations,
    starredIds,
    setPage,
    setFilters,
    loading,
    totalCount,
    toggleStar,
  } = useLocations();

  return (
    <Box
      sx={{
        padding: "24px",
      }}
    >
      <h1>Dongwook Fleet</h1>
      <Filter onFiltersChange={setFilters} />
      <Table
        locations={locations}
        onPageChange={setPage}
        onToggleStar={toggleStar}
        starredIds={starredIds}
        loading={loading}
        totalCount={totalCount}
      />
    </Box>
  );
};
