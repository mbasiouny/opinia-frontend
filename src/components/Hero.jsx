import CategoryList from "./CategoryList";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          Review <span className="text-brand">Everything.</span><br/>
          Decide <span className="text-brand">Better.</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          The universal platform for transparent feedback on <b>products</b>, <b>services</b>, and <b>experiences</b>.
        </p>

        <CategoryList/>

        <p className="mt-6 text-sm text-gray-500">
          Join <b>3.5 Million</b> users sharing their real-world opinions.
        </p>
      </div>
    </section>
  );
}
