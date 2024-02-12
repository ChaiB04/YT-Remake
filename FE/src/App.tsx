import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
import Profile from './pages/Profile';
import AccountSettings from './pages/AccountSettings';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import theme from './colorTheme.ts'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6B5BD3"
      },
      secondary:{
        main: "#303F9F"
      }
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar/>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/uploadvideo" element={<UploadVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
        <ToastContainer/>
      </Router>
    </ThemeProvider>
  )
}

export default App
