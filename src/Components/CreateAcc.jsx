import React, { useContext, useState } from 'react'
import user_plus from "../images/person-plus-fill.svg"
import illustration from "../images/illustration.jpg"
import axios from "axios"
import { baseUrl } from '../App'
import { useNavigate } from 'react-router-dom'

export default function CreateAcc() {
    const url=useContext(baseUrl)
    const [newUser,setnewUser]=useState(null)
    const [newPassword,setnewPassword]=useState(null)
    const page=useNavigate()
    
    function register(e){
        e.preventDefault()
        axios.post(`${url}/register`,{username:newUser,password:newPassword}).then(()=>{
            alert("Account created successfully")
            setnewPassword("")
            setnewUser("")
            page("/login")
        }).catch((err)=>{
            alert(err.message)
        })
    }

    function loginNav(){
        page("/login")
    }
    
    return (
        <div>
            <div id='home_page'>
                <div id='intro'>
                    <p className='display-4 fw-bolder'>Take Control <br /> of <span className='text-info'>Your Money</span></p>
                    <p className='display-6 fs-4'>Personal Budgeting is the secret to financial freedom.Start Your journey today.</p>
                    <form id='form' onSubmit={register}>
                        <input type="text" placeholder='What is your Name?' value={newUser} onChange={(e)=>setnewUser(e.target.value)} required/>
                        <input type="password" placeholder='Enter Your password...' value={newPassword} onChange={(e)=>setnewPassword(e.target.value)} required/>
                        <button>
                            Create Account &nbsp; <img src={user_plus} alt="new-user-plus" />
                        </button>
                        <button onClick={loginNav}>
                            Login
                        </button>
                    </form>
                </div>

                <div id='img'>
                    <img src={illustration} alt="" />
                </div>
            </div>

           
        </div>
    )
}
