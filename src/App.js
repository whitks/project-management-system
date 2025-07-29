import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Logout from "./pages/components/Logout"
import Homepage from './pages/Homepage';
import Footer from './pages/components/Footer';
import "./App.css"
import InitialPage from './pages/InitialPage';
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
        <Route path="login/initials" element={<InitialPage />}/>
        {/* Search Page (Optional)
        <Route path="/product" element={<SearchPage />} /> */}
      </Routes>

    </Router>
  );
}

export default App;
