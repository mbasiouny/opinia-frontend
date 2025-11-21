export default function CTA() {
  return (
    <section className="w-screen bg-[#6048ff] text-white text-center py-20 sm:py-24 relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Are You a Business or Organization?
        </h2>

        <p className="text-white/90 mb-8 leading-relaxed">
          Harness the power of collective feedback. Use Opinia's dedicated tools
          to understand your customers better, manage your reputation, and
          improve service delivery.
        </p>

        <button
          className="bg-white text-[#6048ff] font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition"
        >
          Explore Business Solutions
        </button>
      </div>
    </section>
  );
}
