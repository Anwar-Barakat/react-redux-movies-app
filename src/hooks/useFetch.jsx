import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState("loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromAPI(url)
      .then((result) => {
        setLoading(false);
        setData(result);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
