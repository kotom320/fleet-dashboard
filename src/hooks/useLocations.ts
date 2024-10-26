import { useState, useEffect } from "react";
import {
  getLocations,
  getStarredLocationIds,
  updateStarredLocation,
} from "../apis/locationApi";
import { Location } from "../mocks/db";

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [starredIds, setStarredIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location_name: "",
    is_starred: false,
  });

  const fetchLocations = async () => {
    setLoading(true);
    try {
      console.log("page", page);
      const data = await getLocations({
        page,
        location_name: filters.location_name,
        is_starred: filters.is_starred,
      });
      setLocations(data.locations);
    } catch (err) {
      setError("Failed to fetch locations");
    } finally {
      setLoading(false);
    }
  };

  const fetchStarredIds = async () => {
    try {
      const ids = await getStarredLocationIds();
      setStarredIds(ids);
    } catch (err) {
      setError("Failed to fetch starred locations");
    }
  };

  const toggleStar = async (locationId: number, isStarred: boolean) => {
    try {
      await updateStarredLocation(locationId, isStarred);
      fetchStarredIds();
    } catch (err) {
      setError("Could not star/unstar location");
    }
  };

  useEffect(() => {
    fetchLocations();
    fetchStarredIds();
  }, [page, filters]);

  return {
    locations,
    starredIds,
    loading,
    error,
    setPage,
    setFilters,
    toggleStar,
  };
};
