import { useParams } from "react-router-dom";
import { ENTITIES_BY_CATEGORY } from "../data/entitiesByCategory";

export default function Category() {
  const { slug } = useParams();
  const items = ENTITIES_BY_CATEGORY[slug] || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold capitalize">{slug?.replaceAll("-", " ")}</h1>

      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">No entities yet in this category.</p>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl border bg-white p-5 hover:shadow-soft">
              <div className="flex items-center gap-3">
                {it.logoUrl && (
                  <img src={it.logoUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-semibold">{it.name}</h3>
                  {it.rating !== undefined && (
                    <div className="text-xs text-gray-500">Rating: {it.rating} / 5</div>
                  )}
                </div>
              </div>
              {it.description && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-3">{it.description}</p>
              )}
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 rounded-lg bg-brand text-white">View</button>
                <button className="px-3 py-2 rounded-lg border">Add Review</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
