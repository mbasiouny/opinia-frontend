import { useQuery } from "@tanstack/react-query";
import { fetchCategoryEntities } from "../api/categories";

export function useCategoryEntities(slug) {
  return useQuery({
    queryKey: ["category-entities", slug],
    queryFn: () => fetchCategoryEntities(slug),
    enabled: !!slug,
  });
}
