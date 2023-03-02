import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SuperAgent from './components/SuperAgent'
import AgentLogin from './components/AgentLogin'
import AgentProfile from './components/AgentProfile'
import { Routes, Route } from 'react-router-dom'
import BookingPage from "./components/BookingPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SuperAgent />} />
        <Route path="/agentLogin" element={<AgentLogin />} />
        <Route path="/agentProfile" element = {<AgentProfile/>}/>
        <Route path="/bookingPage" element = {<BookingPage/>}/>
      </Routes>
    </>
  )
}

export default App
