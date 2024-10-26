import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
} from "@mui/material";

interface FilterProps {
  onFiltersChange: (filters: {
    location_name: string;
    is_starred: boolean;
  }) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFiltersChange({ location_name: value, is_starred: filter === "starred" });
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setFilter(value);
    onFiltersChange({
      location_name: searchTerm,
      is_starred: value === "starred",
    });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* 필터 드롭다운 */}
      <Grid item xs={4}>
        <Select value={filter} onChange={handleFilterChange} fullWidth>
          <MenuItem value="all">All Locations</MenuItem>
          <MenuItem value="starred">Starred Locations</MenuItem>
        </Select>
      </Grid>
      {/* 검색 필드 */}
      <Grid item xs={8}>
        <TextField
          label="Search robot or location"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
