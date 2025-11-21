import { useEffect, useState } from "react";
import { getEntityReviews } from "../api/reviews";

export function useEntityReviews(entityId, initialPageSize = 10) {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(initialPageSize);

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!entityId) return;

    setLoading(true);
    setError(null);

    getEntityReviews({ entityId, pageNumber, pageSize })
      .then((data) => {
        setItems(data.items ?? []);
        setTotalItems(data.totalItems ?? 0);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong while loading reviews.");
      })
      .finally(() => setLoading(false));
  }, [entityId, pageNumber, pageSize, reloadToken]); 

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const refresh = () => setReloadToken((x) => x + 1); 

  return {
    items,
    totalItems,
    loading,
    error,
    pageNumber,
    setPageNumber,
    pageSize,
    totalPages,
    refresh, 
  };
}
