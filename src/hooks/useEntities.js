import { useQuery } from "@tanstack/react-query";
import { fetchEntitiesByCategoryId } from "../api/entities";

export function useEntities(categoryId, status = 2) {
  return useQuery({
    queryKey: ["entities", Number(categoryId), status],
    queryFn: () => fetchEntitiesByCategoryId(categoryId, status),
    enabled: !!categoryId,
    staleTime: 60 * 1000,
  });
}
