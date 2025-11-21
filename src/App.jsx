import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer"; 
import CategoryEntities from "./pages/CategoryEntities";
import EntityReviews from "./pages/EntityReviews";

export default function App() {
  return (
    <>
      <NavBar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryEntities />} />
          <Route path="/entities/:entityId/reviews" element={<EntityReviews />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
