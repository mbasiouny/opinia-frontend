export default function CategorySkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-4 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-gray-200" />
      <div className="mt-3 h-4 w-2/3 bg-gray-200 rounded" />
      <div className="mt-2 h-3 w-1/2 bg-gray-200 rounded" />
    </div>
  );
}
