import CoachSignup from './pages/Signup/CoachSignup';
import Home from './pages/Home'
import CoachLogin from './pages/login/CoachLogin';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import UserDashboard from './pages/dashboard/UserDashboard';
import CoachDashboard from './pages/dashboard/CoachDashboard';
import Header from './components/header';
import Footer from './components/footer';
import UserSignUp from './pages/Signup/UserSignUp';
import UserLogin from './pages/login/UserLogin';
import UpdateProfile from './pages/UpdateProfile';
import MyAppointments from './components/MyAppointments';
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
          <Route path='/userdashboard'element={<UserDashboard/>} />
          <Route path='/coachdashboard' element={<CoachDashboard/>}/>
          <Route path='/usersignup' element={<UserSignUp/>}/>
          <Route path='/userlogin' element={<UserLogin/>}/>
          <Route path='/updateprofile' element={<UpdateProfile/>}/>
          <Route path='/user/myAppointments' element={<MyAppointments/>}/>
        </Routes>
        
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
