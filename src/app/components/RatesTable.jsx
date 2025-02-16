import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import styles from "./RateTable.module.css"; // Import the CSS module
import RateTable from "./CCRates"; // Import the reusable RateTable component

const VoIPRatesTable = () => {
  // State Variables
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setCurrentPage(1); // Reset to first page on new search
        setSearchQuery(query);
      }, 500), // 500ms debounce delay
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <RateTable loading={loading} error={error}  />
    </div>
  );
};

export default VoIPRatesTable;
