import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from "react-toastify"
function Home() {
  const location = useLocation()
  const [email,setemail] = useState() 
  const [profile,setprofile] = useState();
  const BaseURL = "https://login-page-google-backend.onrender.com"
  const navigate = useNavigate()
  // console.log(profile)
  useEffect(()=>{
    if(!email){
      axios.defaults.withCredentials = true
      axios.get(`${BaseURL}/findcookie`,{withCredentials:true}).then(res=>{
        console.log(res)
        setprofile(res.data.profile)
        setemail(res.data.email)
      }
      )
    }
    
  },[])
  const handleclick = ()=>{
    toast.success("Logged out",{autoClose:2000})
    axios.defaults.withCredentials = true
    axios.get(`${BaseURL}/cookie`, {withCredentials:true}).then(
      setTimeout(()=>{
        navigate("/login")
      },2000) 
      
    )
  }
  console.log(profile)
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <ToastContainer/>
      <img src={profile ? profile : "No Profile"} alt="No Profile" className='rounded-full mb-5 ' />
      <h1 className='text-2xl mb-5'>{email}</h1>
      <button className='border cursor-pointer p-3 bg-red-600 text-white  text-center flex items-center justify-center rounded-2xl font-bold' onClick={handleclick}>Logout <IoExitOutline className='ml-2 text-black'  /></button>
    </div>

  )
}

export default Home
