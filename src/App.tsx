
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Welcome from "./pages/Welcome"
import Portfolio from "./pages/Portfolio"
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App
