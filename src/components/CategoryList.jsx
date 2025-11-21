import { useCategories } from "../hooks/useCategories";
import CategoryCard from "./CategoryCard";
import CategorySkeleton from "./CategorySkeleton";

export default function CategoryList() {
  const { data, isLoading, error, refetch, isFetching } = useCategories();

  if (isLoading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 max-w-3xl mx-auto rounded-xl border bg-white p-6 text-center">
        <div className="text-red-600 font-semibold">Failed to load categories.</div>
        <div className="text-sm text-gray-500 mt-1">Please try again.</div>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          Retry {isFetching ? "…" : ""}
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="mt-10 max-w-3xl mx-auto rounded-xl border bg-white p-6 text-center text-gray-600">
        No categories yet.
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((c) => <CategoryCard key={c.id} c={c} />)}
    </div>
  );
}
