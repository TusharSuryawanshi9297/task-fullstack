import { useState, useEffect } from "react";

const useSort = (initialData) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...data].sort((a, b) => {
      const aVal = a[key] || "";
      const bVal = b[key] || "";

      if (typeof aVal === "string") {
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return direction === "asc" ? aVal - bVal : bVal - aVal;
    });

    setData(sorted);
    setSortConfig({ key, direction });
  };

  return { data, sortBy, sortConfig };
};

export default useSort;
