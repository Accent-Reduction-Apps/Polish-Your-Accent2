import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Lessons from "./Pages/Lessons";
import About from "./Pages/About";
import TeamSlotherin from "./Pages/TeamSlotherin";
import NoPage from "./Pages/NoPage";
import RegisterHere from "./Pages/RegisterHere";
import ErrorPage from "./Pages/ErrorPage";
import GetLessonById from "./Pages/GetLessonById";
import GetLessons from "./Pages/GetLessons";
import GetUser from "./Pages/GetUser";

document.title = "Polish Your Accent";

export default function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="teaminfo" element={<TeamSlotherin/>}/>
                    <Route path="registration" element={<RegisterHere/>}/>
                    <Route path="registration" element={<RegisterHere/>}/>
                    <Route path="demo" element={<Lessons/>}/>
                    <Route exact path="/lessons" element={<GetLessons/>}/>
                    {/*<Route path="/lesson/:lessonId" render={({ match }) => (*/}
                    {/*    <GetLessonById match={match} />*/}
                    {/*)} />*/}
                    <Route path="/lesson/:lessonId" element={<GetLessonById/>}/>
                    <Route path={"/my-account"} element={<GetUser/>}/>
                    <Route path="*" element={<NoPage/>}/>
                    <Route errorElement={<ErrorPage/>}/>

                </Route>
            </Routes>
            {/*<Footer />*/}
    </Router>);

}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>);


// import React from "react";
// import {
//     Router,
//     useRoutes,
//     Route,
//     Link,
//     Navigate,
//     Outlet,
// } from "react-router-dom";
// import GetLessonsTable from "./GetLessonsTable";
// import GetLessonById from "./GetLessonById";
//
// function App() {
//     return (
//         <Router>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                 </ul>
//             </nav>
//             <Outlet />
//         </Router>
//     );
// }
//
// const routes = [
//     { path: "/lessons", element: <GetLessonsTable /> },
//     { path: "lesson/:lessonId", element: <GetLessonById /> },
// ];
//
// export default App;