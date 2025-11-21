import api from "./client";

// Helper: يفك أي envelope شائع
function unwrap(res) {
  const d = res?.data;
  if (Array.isArray(d)) return d;                // [ ... ]
  if (Array.isArray(d?.data)) return d.data;     // { data: [ ... ] }
  if (Array.isArray(d?.items)) return d.items;   // { items: [ ... ] }
  return [];                                     // fallback
}

function toSlug(text) {
  return (text || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCategory(c) {
  if (!c) return null;
  return {
    id: c.id,
    name: c.name,
    description: c.description || "",
    imageUrl: c.image_url || c.imageUrl || null,
    slug: c.slug || toSlug(c.name),
  };
}

export async function fetchCategories() {
  const res = await api.get("/categories");
  const list = unwrap(res).map(normalizeCategory).filter(Boolean);
  return list;
}

// مثال للكيانات تحت كاتيجوري (عدّل المسار حسب APIك)
export async function fetchCategoryEntities(slug) {
  const res = await api.get(`/categories/${slug}/entities`);
  return unwrap(res);
}
