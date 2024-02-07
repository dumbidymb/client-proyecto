import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './componentes/Login';
import Register from "../src/componentes/Registro"
import Profile from './componentes/Perfil'
import Protected from './componentes/Protect'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Router>
        <Routes>
         <Route path='/' element={<Login />} />

          <Route path='/register' element={<Register />} />
          <Route element={<Protected />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
  </React.StrictMode>,
)
