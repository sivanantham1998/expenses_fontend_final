import axios from "axios"
import { useContext, useState } from "react"
import { baseUrl } from "../App"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const [newUser,setnewUser]=useState(null)
    const [newPassword,setnewPassword]=useState(null)
    const page=useNavigate()
    const url=useContext(baseUrl)
    const login=async (e)=>{
        e.preventDefault()
        try {
            let response=await axios.post(`${url}/login`,{username:newUser,password:newPassword},{withCredentials:true})
            // console.log(response.data.usertoken);
            localStorage.setItem("username",newUser)
            localStorage.setItem("usertoken",response.data.usertoken)
            Cookies.set("expenses_user",response.data.usertoken,{expires:14})
            alert("Login successful")
            page("/dashboard")
        } catch (error) {
            alert("something error:"+error.message)
        }
    }
    return (
        <div>
            <h1>Login Now</h1>
            <form id='form' onSubmit={login}>
                <input type="text" placeholder='What is your Name?' value={newUser} onChange={(e) => setnewUser(e.target.value)} required />
                <input type="password" placeholder='Enter Your password...' value={newPassword} onChange={(e) => setnewPassword(e.target.value)} required />
                <button>
                    Login Account &nbsp;
                </button>
            </form>
        </div >
    )
}