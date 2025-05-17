import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      {/* UI Consistency */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  )
}