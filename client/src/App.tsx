import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CvePage from "./pages/CvePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cve/:cveId" element={<CvePage />} />
      </Routes>
    </Router>
  )
}

export default App
