import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import ContactForm from "./pages/ContactForm"
import ContactDataPage from "./pages/ContactDataPage"
import Blogs from "./pages/Blogs"
import Services from "./pages/Services"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/contactdata" element={<ContactDataPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
