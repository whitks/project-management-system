import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Logout from "./pages/components/Logout"
import Homepage from './pages/Homepage';
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route
          path="/"
          element={
            <>
            <Homepage/>
            </>
          }
        />

        {/* Product Detail Page */}
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/logout" element={<Logout setToken={1} />}/>
        {/* Search Page (Optional)
        <Route path="/product" element={<SearchPage />} /> */}
      </Routes>


    </Router>
  );
}

export default App;
