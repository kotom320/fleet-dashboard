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
  const [totalCount, settotalCount] = useState<number>(0);
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
      console.log("data ++++ ", data);
      settotalCount(data.total_count);
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

  const toggleStar = async (locationId: number) => {
    try {
      const isCurrentlyStarred = starredIds.includes(locationId);

      // 즐겨찾기에 이미 있으면 제거, 없으면 추가
      const updatedStarredIds = isCurrentlyStarred
        ? starredIds.filter((id) => id !== locationId)
        : [...starredIds, locationId];

      // 업데이트된 ID 배열을 서버에 저장 (sessionStorage로 관리)
      console.log("updatedStarredIds", updatedStarredIds);
      await updateStarredLocation(updatedStarredIds);

      // 상태 업데이트
      setStarredIds(updatedStarredIds);
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
    totalCount,
    setPage,
    setFilters,
    toggleStar,
  };
};
