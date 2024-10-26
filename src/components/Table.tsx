import { useLocations } from "../hooks/useLocations";

export const Table = () => {
  const { locations, setPage } = useLocations();

  return (
    <div>
      {locations.map((location) => (
        <div key={location.id}>{location.name}</div>
      ))}
      <button onClick={() => setPage((prev) => prev - 1)}>prev Page</button>
      <button onClick={() => setPage((prev) => prev + 1)}>next Page</button>
    </div>
  );
};
