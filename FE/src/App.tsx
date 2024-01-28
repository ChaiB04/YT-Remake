import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadVideo />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/account-settings" element={<AccountSettings />} />
      </Routes>
    </Router>
  )
}

export default App
