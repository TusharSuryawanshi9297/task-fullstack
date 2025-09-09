// import { useState, useEffect } from "react";
// import api from "../services/api";

// const useFetch = (endpoint, token, dependencies = []) => {
//   const [data, setData] = useState([]); // default as plain array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) return;

//     setLoading(true);
//     api
//       .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
//       .then((res) => {
//         // Normalize data: always return plain array
//         if (Array.isArray(res.data)) {
//           setData(res.data);
//         } else if (res.data?.items) {
//           setData(res.data.items);
//         } else {
//           setData([]);
//         }
//       })
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, [endpoint, token, ...dependencies]);

//   return { data, setData, loading, error };
// };

// export default useFetch;

import { useState, useEffect } from "react";
import api from "../services/api";

const useFetch = (endpoint, token, dependencies = []) => {
  const [data, setData] = useState({ items: [] }); // default as plain array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    api
      .get(endpoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        // // Normalize: always return array
        // let normalized = [];
        // if (Array.isArray(res.data)) {
        //   normalized = res.data;
        // } else if (res.data?.items && Array.isArray(res.data.items)) {
        //   normalized = res.data.items;
        // }
        // // OwnerDashboard expects { items } structure
        // setData(Array.isArray(res.data) ? normalized : { items: normalized });
        let normalized = [];
        if (Array.isArray(res.data)) {
          normalized = res.data;
        } else if (res.data?.items && Array.isArray(res.data.items)) {
          normalized = res.data.items;
        }

        setData({ items: normalized });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint, token, ...dependencies]);

  return { data, setData, loading, error };
};

export default useFetch;
