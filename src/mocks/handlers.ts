import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ request }) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page") || "1";
    const location_name = url.searchParams.get("location_name") || "";
    const robot_id = url.searchParams.get("robot_id") || "";
    const is_starred = url.searchParams.get("is_starred") || "false";
    let filteredLocations = locations;

    // location_name 필터링
    if (location_name) {
      filteredLocations = filteredLocations.filter((location) =>
        location.name.toLowerCase().includes(location_name.toLowerCase()),
      );
    }

    // robot_id 필터링
    if (robot_id) {
      filteredLocations = filteredLocations.filter(
        (location) => location.robot.id === robot_id,
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

    // 페이지네이션 처리
    const pageNumber = parseInt(page, 10);
    const pageSize = 6;
    const paginatedLocations = filteredLocations.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize,
    );

    const result: LocationsResult = {
      total_count: filteredLocations.length,
      locations: paginatedLocations,
    };
    console.log("result ++++ ", result);
    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", ({ request }) => {
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }

    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify(request.body),
    );

    return HttpResponse.json(null, { status: 204 });
  }),
];
