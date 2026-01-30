import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hilingual from "./pages/projects/Hilingual";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/hilingual" element={<Hilingual />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
