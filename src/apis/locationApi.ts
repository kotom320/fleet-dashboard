import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
});

export const getLocations = async (filters: {
  page: number;
  location_name?: string;
  robot_id?: string;
  is_starred?: boolean;
}) => {
  const { data } = await apiClient.get("/locations", { params: filters });
  return data;
};

export const getStarredLocationIds = async () => {
  const { data } = await apiClient.get("/starred_location_ids");
  console.log("data", data);
  return data.location_ids;
};

export const updateStarredLocation = async (updatedStarredIds: number[]) => {
  try {
    await apiClient.put("/starred_location_ids", updatedStarredIds);
  } catch (error) {
    throw new Error("Could not star/unstar the location");
  }
};
