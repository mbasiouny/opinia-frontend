import { useParams, Link, useLocation } from "react-router-dom";
import { useEntities } from "../hooks/useEntities";
import EntityCard from "../components/EntityCard";

export default function CategoryEntities() {
  const { categoryId } = useParams();
  const location = useLocation();
  const pureId = String(categoryId).split("-")[0];

  const { data, isLoading, error, refetch } = useEntities(pureId, 2);

  const categoryName =
    location.state?.categoryName ||
    (Array.isArray(data) && data[0]?.categoryName) ||
    (isLoading ? "Loading…" : "Category");

  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">{categoryName}</span>
        </nav>

        {/* Header */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">{categoryName}</h1>
          </div>
          <div className="text-sm text-gray-500">
            {Array.isArray(data) ? `${data.length} results` : ""}
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder={`Search within ${categoryName.toLowerCase()}...`}
            className="flex-1 rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6048ff]"
          />
        </div>

        {/* Content */}
        {isLoading && (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl border bg-white animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border bg-white p-6">
            <div className="text-red-600 font-semibold">Failed to load entities.</div>
            <button onClick={() => refetch()} className="mt-3 px-4 py-2 rounded-lg border">
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          Array.isArray(data) && data.length ? (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((it) => <EntityCard key={it.id} it={it} />)}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border bg-white p-6 text-center text-gray-600">
              No active entities yet in this category.
            </div>
          )
        )}
      </div>
    </section>
  );
}
