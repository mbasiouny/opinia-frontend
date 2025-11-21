export default function WhyCards() {
  const items = [
    {
      icon: "💬",
      title: "Review Any Category",
      desc:
        "From the smallest gadgets to complex services — if it exists, you can review it here.",
    },
    {
      icon: "👁️",
      title: "Trust and Transparency",
      desc:
        "We prioritize verified experiences and clear moderation to help users decide with confidence.",
    },
    {
      icon: "🏢",
      title: "Empowering Businesses",
      desc:
        "Monitor sentiment in real-time and engage directly with reviewers to resolve issues publicly.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-gray-900">
          Why Opinia is the Universal Choice
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {items.map((it, i) => (
            <article
              key={i}
              className="
                rounded-3xl bg-indigo-50
                p-8 sm:p-10
                shadow-[0_18px_40px_rgba(22,28,45,0.06)]
              "
            >
              {/* أيقونة ناعمة في فقاعة صغيرة */}
              <div className="
                w-12 h-12 rounded-2xl
                bg-gradient-to-b from-white to-indigo-100
                grid place-items-center
                text-[22px] text-indigo-600
              ">
                <span aria-hidden>{it.icon}</span>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-gray-900">
                {it.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {it.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
