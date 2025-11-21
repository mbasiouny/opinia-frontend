export default function Testimonials() {
  const items = [
    {
      quote:
        "Finally, a place where I can review my city's public transport system! The feedback is so much more diverse than standard product sites. Highly recommend.",
      author: "Alex P.",
    },
    {
      quote:
        "Opinia helped us identify a critical flaw in our customer onboarding process within 48 hours. The direct engagement tools are incredibly useful.",
      author: "Jane Doe, TechCorp CTO",
    },
    {
      quote:
        "I always check Opinia before making a major purchase now. The transparency is unmatched, and I trust the collective sentiment here.",
      author: "Maria L.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
          What Our Community is Saying
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {items.map((t, i) => (
            <article
              key={i}
              className="rounded-3xl bg-white p-8 sm:p-10 border border-gray-100 shadow-[0_18px_40px_rgba(22,28,45,0.06)]"
            >
              <div className="text-indigo-500 text-xl">★★★★★</div>

              <p className="mt-4 italic text-gray-700 leading-7">
                “{t.quote}”
              </p>

              <div className="mt-6 text-sm font-semibold text-gray-900">
                — {t.author}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
