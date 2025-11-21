import { Link } from "react-router-dom";

export default function CategoryCard({ c }) {
  return (
    <Link
      to={`/category/${c.id}`}
      state={{ categoryName: c.name }}
      className="group rounded-2xl border bg-white hover:shadow-[0_18px_40px_rgba(22,28,45,0.06)] transition p-4 flex items-center gap-3"
      title={c.description}
    >
      {c.imageUrl ? (
        <img
          src={c.imageUrl}
          alt={c.name}
          className="w-10 h-10 rounded-xl object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-indigo-100 grid place-items-center text-indigo-600 font-semibold">
          {c.name?.[0]?.toUpperCase() || "•"}
        </div>
      )}

      <div className="min-w-0">
        <div className="font-semibold text-gray-900 truncate">{c.name}</div>
        {c.description && (
          <div className="text-xs text-gray-500 line-clamp-1">
            {c.description}
          </div>
        )}
      </div>
    </Link>
  );
}
