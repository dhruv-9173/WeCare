import CoachSignup from './components/CoachSignup';
import Home from './pages/Home'
import CoachLogin from './components/CoachLogin';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Dashboard from './pages/Dashboard';
import Header from './components/header';
import Footer from './components/footer';
function App() {
  const {isAuthenticated} = useAuthContext();
  return (
    <>
    
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coachlogin" element={<CoachLogin/>}/>
          <Route path="/coachsignup" element={<CoachSignup/>}/>
          <Route path='/dashboard'element={<Dashboard/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
