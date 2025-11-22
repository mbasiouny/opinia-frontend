// src/pages/EntityReviews.jsx
import React, { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEntityReviews } from "../hooks/useEntityReviews";
import { createReview } from "../api/reviews";
import ReviewCard from "../components/ReviewCard";

// helper: تحويل file -> data URL (base64)
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // ده بيطلع data:image/...;base64,...
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function EntityReviews() {
  const { entityId } = useParams();
  const { state } = useLocation();
  const entity = state?.entity;

  const {
    items: reviews,
    totalItems,
    loading,
    error,
    pageNumber,
    setPageNumber,
    pageSize,
    totalPages,
    refresh,
  } = useEntityReviews(entityId);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  // --- Form state ---
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [form, setForm] = useState({
    dateOfTrial: "",
    itemsBought: "",
    isConsumer: true,
    reviewText: "",
    rating: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [imageFiles, setImageFiles] = useState([]);        // 👈 أكتر من ملف
  const [imagePreviews, setImagePreviews] = useState([]);  // 👈 previews

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const validateForm = () => {
    const errors = {};

    if (!form.dateOfTrial) {
      errors.dateOfTrial = "Date of trial is required";
    }

    if (!form.rating) {
      errors.rating = "Rating is required";
    }

    if (!form.reviewText.trim()) {
      errors.reviewText = "Review text is required";
    }

    if (form.isConsumer && !form.itemsBought.trim()) {
      errors.itemsBought = "Items bought is required for consumers";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      let images = [];

      if (imageFiles.length > 0) {
        const dataUrls = await Promise.all(
          imageFiles.map((file) => fileToDataUrl(file))
        );
        images = dataUrls.map((url) => ({ imageUrl: url }));
      }

      await createReview({
        entityId: Number(entityId),
        dateOfTrial: form.dateOfTrial,
        itemsBought: form.isConsumer ? form.itemsBought : null,
        isConsumer: form.isConsumer,
        reviewText: form.reviewText,
        rating: Number(form.rating),
        images, // 👈 array من أكتر من صورة
      });

      setSubmitSuccess(true);
      setForm({
        dateOfTrial: "",
        itemsBought: "",
        isConsumer: true,
        reviewText: "",
        rating: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      setShowForm(false);
      setPageNumber(1);
      refresh();
    } catch (err) {
      console.error(err);
      setSubmitError("Could not submit your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4 flex gap-1">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <span>/</span>
        <span>Entity</span>
      </nav>

      {/* Title */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          {entity?.name || "Entity reviews"}
        </h1>
        {(entity?.address || entity?.categoryName) && (
          <p className="mt-1 text-sm text-gray-500">
            {entity?.address}
            {entity?.address && entity?.categoryName ? " • " : ""}
            {entity?.categoryName}
          </p>
        )}
      </header>

      {/* Summary card */}
      <section className="mb-6">
        <div className="rounded-2xl border bg-white p-6 flex items-center justify-between">
          {/* Left: star + rating */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 text-2xl">
              ★
            </div>
            <div>
              <div className="text-2xl font-semibold text-gray-900">
                {averageRating ?? "--"}/5
              </div>
              <div className="text-sm text-gray-500">
                Based on {totalItems} review{totalItems === 1 ? "" : "s"}
              </div>
            </div>
          </div>

          {/* Right: category + button */}
          <div className="flex flex-col items-end gap-3">
            {entity?.categoryName && (
              <span className="text-xs rounded-full px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100">
                {entity.categoryName}
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                setShowForm((prev) => !prev);
                setSubmitSuccess(false);
                setSubmitError(null);
              }}
              className="px-4 py-2 rounded-lg bg-[#6366F1] text-white text-sm hover:bg-[#6048ff] text-white text-sm font-semibold px-4 py-2 shadow"
            >
              Write a Review
            </button>
          </div>
        </div>
      </section>

      {/* Write review form */}
      {showForm && (
        <section className="mb-6">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-white p-5 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date of trial */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Date of trial
                </label>
                <input
                  type="date"
                  name="dateOfTrial"
                  value={form.dateOfTrial}
                  onChange={handleChange}
                  className={
                    "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 " +
                    (formErrors.dateOfTrial
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500")
                  }
                />
                {formErrors.dateOfTrial && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.dateOfTrial}
                  </p>
                )}
              </div>

              {/* Items bought (only if consumer) */}
              {form.isConsumer && (
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Items bought
                  </label>
                  <input
                    type="text"
                    name="itemsBought"
                    value={form.itemsBought}
                    onChange={handleChange}
                    className={
                      "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 " +
                      (formErrors.itemsBought
                        ? "border-red-300 focus:ring-red-400"
                        : "border-gray-300 focus:ring-indigo-500")
                    }
                    placeholder="e.g. T-shirt, Sushi set..."
                  />
                  {formErrors.itemsBought && (
                    <p className="mt-1 text-xs text-red-500">
                      {formErrors.itemsBought}
                    </p>
                  )}
                </div>
              )}

              {/* Consumer checkbox */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="isConsumer"
                  type="checkbox"
                  name="isConsumer"
                  checked={form.isConsumer}
                  onChange={handleChange}
                  className="rounded border-gray-300"
                />
                <label htmlFor="isConsumer" className="text-sm text-gray-700">
                  I am a consumer
                </label>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Rating
                </label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className={
                    "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 " +
                    (formErrors.rating
                      ? "border-red-300 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-500")
                  }
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {formErrors.rating && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.rating}
                  </p>
                )}
              </div>
            </div>

            {/* Review text */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Review text
              </label>
              <textarea
                name="reviewText"
                value={form.reviewText}
                onChange={handleChange}
                rows={4}
                className={
                  "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 " +
                  (formErrors.reviewText
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500")
                }
                placeholder="Share your experience..."
              />
              {formErrors.reviewText && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.reviewText}
                </p>
              )}
            </div>

            {/* Image upload (multiple) */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Images (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full text-sm"
              />
              {imagePreviews.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ))}
                </div>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}

            {submitSuccess && (
              <p className="text-sm text-emerald-600">
                Thank you! Your review has been submitted.
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-lg bg-[#6366F1] text-white text-sm hover:bg-[#6048ff] text-white text-sm font-semibold px-4 py-2 shadow"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* States */}
      {loading && (
        <p className="text-sm text-gray-500 mt-4">Loading reviews...</p>
      )}

      {error && !loading && (
        <p className="text-sm text-red-500 mt-4">{error}</p>
      )}

      {!loading && !error && reviews.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">
          No reviews yet for this entity.
        </p>
      )}

      {/* Reviews list */}
      {!loading && reviews.length > 0 && (
        <section className="space-y-4 mt-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </section>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="text-gray-500">
            Showing {reviews.length} of {totalItems} reviews • Page {pageNumber}{" "}
            of {totalPages}
          </div>

          <div className="flex items-center gap-1">
            <button
              className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white"
              disabled={pageNumber === 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={
                  "px-3 py-1.5 rounded-lg border text-sm " +
                  (pageNumber === page
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-50")
                }
              >
                {page}
              </button>
            ))}

            <button
              className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-40 hover:bg-gray-50 disabled:hover:bg-white"
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
