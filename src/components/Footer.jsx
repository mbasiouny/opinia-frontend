import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B2234] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* العمود الأول */}
          <div>
            <h2 className="text-indigo-400 font-bold text-2xl">Opinia</h2>
            <p className="mt-4 text-sm text-gray-400 leading-7">
              The platform built on collective experience and transparent
              feedback for a more informed world.
            </p>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 text-lg">
              For Users
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/start" className="hover:text-white transition">
                  Start Reviewing
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition">
                  Browse Categories
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-white transition">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 text-lg">
              For Businesses
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link to="/api-access" className="hover:text-white transition">
                  API Access
                </Link>
              </li>
              <li>
                <Link to="/sentiment" className="hover:text-white transition">
                  Sentiment Monitoring
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-100 font-semibold mb-4 text-lg">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-12 border-white/10" />

        {/* الحقوق */}
        <div className="py-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Opinia. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
