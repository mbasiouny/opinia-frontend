import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const navLink =
  "px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition";
const active =
  "text-gray-900";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
<header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l7 3v5c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V5l7-3z" fill="#6048ff"/>
              <path d="M10.2 12.6l-2-2 1.2-1.2 0.8 0.8L14.6 6l1.4 1.4-5 5a1 1 0 0 1-1.4 0.2z" fill="white"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">Opinia</span>
          </Link>

          {/* Center: desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/how-it-works" className={({isActive}) => `${navLink} ${isActive ? active : ""}`}>
              How It Works
            </NavLink>
            <NavLink to="/business" className={({isActive}) => `${navLink} ${isActive ? active : ""}`}>
              For Businesses
            </NavLink>
            <NavLink to="/community" className={({isActive}) => `${navLink} ${isActive ? active : ""}`}>
              Community
            </NavLink>
          </nav>

          {/* Right: actions */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/login" className={({isActive}) => `${navLink} ${isActive ? active : ""}`}>
              Login
            </NavLink>
            <Link
              to="/signup"
              className="ml-1 inline-flex items-center rounded-xl bg-[#6048ff] hover:bg-[#4b39d1] text-white text-sm font-semibold px-4 py-2 shadow"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3 border-t">
            <nav className="flex flex-col">
              <NavLink to="/how-it-works" className={({isActive}) => `px-3 py-2 ${isActive ? "text-gray-900" : "text-gray-600"}`} onClick={()=>setOpen(false)}>
                How It Works
              </NavLink>
              <NavLink to="/business" className={({isActive}) => `px-3 py-2 ${isActive ? "text-gray-900" : "text-gray-600"}`} onClick={()=>setOpen(false)}>
                For Businesses
              </NavLink>
              <NavLink to="/community" className={({isActive}) => `px-3 py-2 ${isActive ? "text-gray-900" : "text-gray-600"}`} onClick={()=>setOpen(false)}>
                Community
              </NavLink>
              <div className="px-3 pt-2 flex items-center gap-2">
                <NavLink to="/login" className="px-3 py-2 text-gray-600" onClick={()=>setOpen(false)}>Login</NavLink>
                <Link
                  to="/signup"
                  className="inline-flex items-center rounded-xl bg-[#6048ff] hover:bg-[#4b39d1] text-white text-sm font-semibold px-4 py-2 shadow"
                  onClick={()=>setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
