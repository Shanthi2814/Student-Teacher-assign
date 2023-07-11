import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Assignteacher from "./Components/Assignteacher";
import ChangeTeacher from "./Components/ChangeTeacher";
import CreateStudent from "./Components/CreateStudent";
import CreateTeacher from "./Components/CreateTeacher";
import Navbar from "./Components/Navbar";
import DashBoard from "./Components/DashBoard";


function App() {
  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<DashBoard/>}/>
     <Route path="create-student" element={<CreateStudent/>}/>
     <Route path="create-teacher" element={<CreateTeacher/>}/>
     <Route path="assign-teacher" element={<Assignteacher/>}/>
     <Route path="change-teacher" element={<ChangeTeacher/>}/>

      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
