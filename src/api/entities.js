import api from "./client";

function unwrap(res) {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d?.items)) return d.items;
  return [];
}

function normalizeEntity(e) {
  if (!e) return null;
  return {
    id: e.id,
    name: e.name,
    description: e.description || "",
    categoryId: e.categoryId,
    categoryName: e.categoryName,
    website: e.website || "",
    address: e.address || "",
    imageUrl: e.imageUrl || e.image_url || "",
    status: e.status,
    statusDesc: e.statusDesc,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  };
}

export async function fetchEntitiesByCategoryId(categoryId, status = 2) {
  const res = await api.get(`/categories/${categoryId}/entities`, {
    params: { status },
  });
  return unwrap(res).map(normalizeEntity).filter(Boolean);
}
