// src/components/ReviewCard.jsx
import React from "react";

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderStars(rating) {
  const max = 5;
  const value = Number(rating) || 0;
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(
      <span
        key={i}
        className={
          "inline-block text-sm " +
          (i <= value ? "text-yellow-400" : "text-gray-300")
        }
      >
        ★
      </span>
    );
  }
  return stars;
}

export default function ReviewCard({ review }) {
  const initial = review?.createdBy?.[0]?.toUpperCase() || "G";
  const name = review?.createdBy || "Guest";

  return (
    <article className="rounded-2xl border bg-white p-5 hover:shadow-[0_18px_40px_rgba(22,28,45,0.06)] transition">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
            {initial}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{name}</div>
            {review.isConsumer && (
              <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 mt-1">
                Consumer
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            {review.rating} / 5
          </div>
          <div className="mt-1 leading-none">{renderStars(review.rating)}</div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
        <span>
          Date of trial:{" "}
          <span className="font-semibold text-gray-700">
            {formatDate(review.dateOfTrial)}
          </span>
        </span>
        <span>
          Reviewed on:{" "}
          <span className="font-semibold text-gray-700">
            {formatDate(review.createdAt)}
          </span>
        </span>
      </div>

      {/* Items bought */}
      {review.itemsBought && (
        <div className="mt-3 text-sm text-gray-700">
          Items bought:{" "}
          <span className="font-semibold">{review.itemsBought}</span>
        </div>
      )}

      {/* Text */}
      {review.reviewText && (
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {review.reviewText}
        </p>
      )}

      {/* Images */}
      {review.images?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.images.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt="Review"
              className="w-16 h-16 rounded-lg object-cover bg-gray-100"
            />
          ))}
        </div>
      )}
    </article>
  );
}
