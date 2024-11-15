
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Welcome from "./pages/Welcome"
import { VisitorProvider } from "./context/VisitorContext"
function App() {
  return (
    <ThemeProvider>
      <VisitorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
          </Routes>
        </Router>
      </VisitorProvider>
    </ThemeProvider>

  )
}

export default App
