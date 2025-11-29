import StationCard from "../../components/cards/StationCard";

const StationsList = ({ stations, viewMode, handleSaveStation, user }) => (
  <div
    className={
      viewMode === "grid"
        ? "grid grid-cols-1 lg:grid-cols-2 gap-3"
        : "space-y-2"
    }
  >
    {stations.map((station) => (
      <StationCard
        key={station._id}
        station={station}
        viewMode={viewMode}
        handleSaveStation={handleSaveStation}
        isStationSaved={user?.savedStations?.includes(station._id)}
      />
    ))}
  </div>
);

export default StationsList;
