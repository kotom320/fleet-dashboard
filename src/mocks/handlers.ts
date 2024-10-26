import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ request }) => {
    const url = new URL(request.url);

    const location_name = url.searchParams.get("location_name") || "";
    const robot_id = url.searchParams.get("robot_id") || "";
    const is_starred = url.searchParams.get("is_starred") || "false";
    let filteredLocations = locations;

    if (location_name || robot_id) {
      filteredLocations = filteredLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(location_name.toLowerCase()) ||
          location.robot.id.toLowerCase().includes(robot_id.toLowerCase()),
      );
    }

    // is_starred 필터링 (sessionStorage에 저장된 즐겨찾기 정보 기반)
    if (is_starred === "true") {
      const starredIds = JSON.parse(
        sessionStorage.getItem("starred_location_ids") || "[]",
      );
      filteredLocations = filteredLocations.filter((location) =>
        starredIds.includes(location.id),
      );
    }

    const result: LocationsResult = {
      total_count: filteredLocations.length,
      locations: filteredLocations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const storedData = sessionStorage.getItem("starred_location_ids");
    console.log("storedData", storedData);
    // storedData가 빈 객체이거나 null일 경우 빈 배열 반환
    let location_ids: number[] = [];

    if (storedData && storedData !== "{}") {
      location_ids = JSON.parse(storedData);
    }

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    const body = await request.json();
    if (body) {
      sessionStorage.setItem("starred_location_ids", JSON.stringify(body));
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
