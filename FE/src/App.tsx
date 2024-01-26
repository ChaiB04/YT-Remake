import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UploadVideo from './pages/UploadVideo';
// function Home() {
//   return <div>You mom</div>;
// }


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadVideo />} />
      </Routes>
    </Router>
  )
}

export default App
