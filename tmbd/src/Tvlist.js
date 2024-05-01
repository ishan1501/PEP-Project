import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar"; // Import SearchBar component
import TvCard from "./TvCard";

export default function TvList({ series }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredSeries, setFilteredSeries] = useState([]);

  useEffect(() => {
    setFilteredSeries(series);
  }, [series]);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSearch = (query) => {
    const filtered = series.filter((tv) =>
      tv.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSeries(filtered);
  };

  const sortedSeries = [...filteredSeries].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.vote_count - b.vote_count;
    } else {
      return b.vote_count - a.vote_count;
    }
  });

  return (
    <div>
      <div>
        <button onClick={handleSort}>
          Sort by vote average (
          {sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      <ul className="movielist">
        {sortedSeries.map((tv) => (
          <TvCard key={tv.id} tv={tv} />
        ))}
      </ul>
    </div>
  );
}
