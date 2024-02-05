import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import theme from './colorTheme.ts'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<UploadVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
        <ToastContainer toastStyle={{ backgroundColor: "#2b1327", color: "#ECE1E7", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }} />
      </Router>
    </ThemeProvider>
  )
}

export default App
