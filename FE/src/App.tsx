import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
import Profile from './pages/Profile';
// function Home() {
//   return <div>You mom</div>;
// }


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadVideo />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
