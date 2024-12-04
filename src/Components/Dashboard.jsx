    import axios from "axios"
    import {jwtDecode} from "jwt-decode"
    import React, { useEffect, useState,useContext, useCallback } from "react"
    import Cookies from "js-cookie"
    import { baseUrl } from "../App"
    import { useNavigate } from "react-router-dom"
    export default function Dashboard(){
        const [id,setid]=useState("")
        const [username,setusername]=useState("")
        const [formated,setformated]=useState([])
        const [expenseName,setexpenseName]=useState("")
        const [amount,setamount]=useState(0)
        const [remark,setremark]=useState("")
        const [total,setTotal]=useState("");
        const url=useContext(baseUrl)
        const page=useNavigate()
        const postPlan=useCallback((e)=>{
            e.preventDefault()
            axios.post(`${url}/preplan`,{userId:id,desc:remark,amount:amount,expense:expenseName}).then(()=>{
                alert('data saved!!')
            }).catch((err)=>{
                console.log(err.message);
            })
        },[url, id, remark, amount, expenseName])
        useEffect(() => {
            setusername(localStorage.getItem("username"));
            const token = localStorage.getItem("usertoken");
            // console.log(token)
            if(token){
                try {
                    let decoded=jwtDecode(token)
                    // console.log('decoded id',decoded);
                    setid(decoded.id)
                } catch (error) {
                    alert('something error',error.message)
                    page("/login")
                }
            }
            const fetchuser=()=>{
                axios.get(`${url}/getsingle`).then((s)=>{
                    // console.log(s.data);
                    // console.log(s.data.msg);
                    let d=s.data.msg
                    let ans=d.filter(plans=>String(id)===String(plans.userId))
                    // console.log(ans)
                    let totalExpenses=ans.reduce((a,b)=>Number(a)+Number(b.amount),0)
                    // console.log(totalExpenses)
                    setTotal(totalExpenses)
                    const fromatDate=ans.map(item=>{
                        const date=new Date(item.date).toISOString().split("T")[0]
                        // console.log(date)
                        return {...item,date:date}
                    })
                    setformated(fromatDate)
                }).catch((err)=>{
                    console.log(err.message);
                })
            }
            fetchuser()
        }, [url,id,postPlan,page]);
        function logout(){
            localStorage.removeItem("usertoken")
            localStorage.removeItem("username")
            Cookies.remove("expenses_user")
            page("/")
        }
        const minAmount=1

    
        return(
            <div>
            <div className="d-flex flex-row flex-wrap">
            <h1 className="w-100">Welcome,<span style={{color:"aquamarine"}}>{username}</span></h1>
            <br />
            <br />
                <h3 className="w-100">
                    Total expenses &nbsp;Rs.<span style={{color:"aquamarine"}}>{total}</span>
                </h3>
            </div>
                <div id="form-div">
                    <form onSubmit={postPlan} className="m-4">
                        <h3>Add Expenses</h3>
                        <input type="text" placeholder="Enter Expenses type" value={expenseName} onChange={(e)=>setexpenseName(e.target.value)} className="form-control"/>
                        <br />
                        <input type="number" placeholder="Enter amount" min={minAmount} value={amount} onChange={(e)=>setamount(e.target.value)} className="form-control" />
                        <br />
                        <textarea name="" id="" placeholder="Enter Remarks" value={remark} onChange={(e)=>setremark(e.target.value)} className="form-control"></textarea>
                        <br />
                        <input type="submit"  className="btn btn-primary"/>
                    </form>
                </div>
            <div id="userPlan">
            <table>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>YYYY-MM-DD</th>
                        <th>Remarks</th>
                    </tr>
                    {formated.map(item=>(
                        <tr key={item._id}>
                            <td>
                                {item.expense}
                            </td>
                            <td>
                                {item.amount}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                {item.desc}
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
                <br />
                <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>
        )
    }
