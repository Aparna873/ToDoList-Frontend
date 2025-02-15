import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Authen/Register";
import Login from "./Components/Authen/Login";
import { useCookies } from 'react-cookie';
import { createContext } from "react";

export const GlobalContext = createContext();
function App() {
    const [cookies] = useCookies(['auth_token']);
    const baseUrl = "https://todolist-backend-w2h8.onrender.com";
    return (
        <GlobalContext.Provider value={baseUrl}>
        <Router>
                <Routes>
                        <Route path="/" element={cookies.auth_token ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Dashboard />} />
                </Routes>
        </Router>
        </GlobalContext.Provider>
    );
}

export default App;