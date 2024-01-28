import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
      <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7",  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)"}} />
    </Router>
  )
}

export default App
