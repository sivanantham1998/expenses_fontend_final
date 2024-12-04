import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import logo from "./images/logomark.svg"
import { Route, Routes} from "react-router-dom"
import CreateAcc from "./Components/CreateAcc"
import wave from "./images/wave.svg"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"

export const baseUrl = React.createContext("")
export default function App() {
  const backEndurl = "https://expenses-backend-final.onrender.com/api";
  return (
    <div>
      <baseUrl.Provider value={backEndurl}>
        <div className="container" id="logo_nav">
          <div>
            <img src={logo} alt="Home_logo" />
            &nbsp;
            <span className="h4" id="menu_name">HomeBudget</span>
          </div>
        </div>
        <div className="container mt-3">
          <Routes >

            <Route path="/" element={<CreateAcc />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>

        <div className="mt-5">
          <img src={wave} alt="" width="100%" />
        </div>
      </baseUrl.Provider>
    </div>
  )
}