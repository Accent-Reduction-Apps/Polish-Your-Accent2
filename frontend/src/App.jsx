import React, {useState} from 'react';
import {AuthorizationContext} from "./auxiliary/AuthorizationContext";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Components/Landing/Home';
import Layout from './pages/Navigation/Layout';
import Lessons from './pages/Components/LessonList/Lessons';
import About from './pages/Components/About/About';
import TeamSlotherin from './pages/Components/About/TeamSlotherin';
import NoPage from './pages/ErrorPages/NoPage';
import RegisterHere from './pages/Components/Register/RegisterHere';
import ErrorPage from './pages/ErrorPages/ErrorPage';
import GetLessonById from './pages/Components/Lesson/GetLessonById';
import GetLessons from './pages/Components/LessonList/GetLessons';
import GetUser from './pages/Components/User/GetUser';
import Logout from "./pages/Components/Logout/Logout";
import Auxiliary from "./pages/Components/Auxiliary/Auxiliary";
import C from "./pages/Components/Auxiliary/C";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

document.title = 'Polish Your Accent';

export default function App() {

    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    return (<AuthorizationContext.Provider value={[isUserAuthorized, setIsUserAuthorized]}>
        <Router>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='about' element={<About/>}/>
                    <Route path='teaminfo' element={<TeamSlotherin/>}/>
                    <Route path='registration' element={<RegisterHere/>}/>
                    <Route path='logout' element={<Logout/>}/>
                    <Route path='c' element={<C/>}/>
                    <Route path='demo' element={<Lessons/>}/>
                    <Route exact path='/lessons' element={<GetLessons/>}/>
                    <Route path='/lesson/:lessonId' element={<GetLessonById/>}/>
                    <Route path='/my-account' element={<GetUser/>}/>
                    <Route path='/auxiliary' element={<Auxiliary/>}/>
                    <Route path='*' element={<NoPage/>}/>
                    <Route errorElement={<ErrorPage/>}/>
                </Route>
            </Routes>
        </Router>
    </AuthorizationContext.Provider>);
}