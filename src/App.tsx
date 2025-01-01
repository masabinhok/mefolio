
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Welcome from "./pages/Welcome"
import { VisitorProvider } from "./context/VisitorContext"
import MoreProjects from "./pages/MoreProjects"
function App() {
  return (
    <ThemeProvider>
      <VisitorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path='/projects' element={<MoreProjects />} />
          </Routes>
        </Router>
      </VisitorProvider>
    </ThemeProvider>

  )
}

export default App
