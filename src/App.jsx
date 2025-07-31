import CoachSignup from './components/CoachAuthentication/CoachSignup';
import Home from './pages/Home'
import CoachLogin from './components/CoachAuthentication/CoachLogin';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Dashboard from './pages/Dashboard';
import Header from './components/header';
import Footer from './components/footer';
import UserSignUp from './components/UserAuthentication/UserSignUp';
import UserLogin from './components/UserLogin';
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
          <Route path='/usersignup' element={<UserSignUp/>}/>
          <Route path='/userlogin' element={<UserLogin/>}/>
        </Routes>
        
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
