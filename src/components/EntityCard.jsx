import { Link } from "react-router-dom";

export default function EntityCard({ it }) {
  const img =
    it?.imageUrl ||
    `https://picsum.photos/seed/${it?.id || "opinia"}/160/120`;

  return (
    <article className="rounded-2xl border bg-white p-5 hover:shadow-[0_18px_40px_rgba(22,28,45,0.06)] transition">
      <div className="flex items-start gap-4">
        <img
          src={img}
          alt={it?.name || "Entity"}
          className="w-16 h-16 rounded-xl object-cover bg-gray-100"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${
              it?.id || "fallback"
            }/160/120`;
          }}
        />

        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {it?.name}
          </h3>

          {it?.address && (
            <div className="text-xs text-gray-500 mt-0.5 truncate">
              {it.address}
            </div>
          )}

          {it?.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {it.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {it?.statusDesc && (
              <span className="text-xs rounded-full px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100">
                {it.statusDesc}
              </span>
            )}
            {it?.categoryName && (
              <span className="text-xs rounded-full px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100">
                {it.categoryName}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {it?.website && (
              <a
                href={it.website}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-lg bg-[#6366F1] text-white text-sm hover:bg-[#6048ff] text-white text-sm font-semibold px-4 py-2 shadow"
              >
                Visit Website
              </a>
            )}

            {/* زرار View بيروح لصفحة الريفيوز */}
            {it?.id && (
              <Link
                to={`/entities/${it.id}/reviews`}
                state={{ entity: it }}
                className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
              >
                View
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
