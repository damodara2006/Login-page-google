import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import.meta.env
import { useNavigate } from 'react-router-dom';
import axios from "axios"
function Login() {
  const [email,setemail] = useState() 
    const [profile,setprofile] = useState();
  const BaseURL = "https://login-page-google-backend.onrender.com"
  const navigate = useNavigate()
  // console.log(dotenv)
  // console.log(import.meta.env.VITE_REACT_APP_CLIENT_ID)
  const [loginblock,setloginblock] = useState(true)

  useEffect(()=>{
    axios.get(`${BaseURL}/findcookie`,{withCredentials:true}).then(res=>{
      console.log(res)
      setprofile(res.data.profile)
      setemail(res.data.email)
      if(res.data.profile && res.data.email){
        axios.post(`${BaseURL}/login`,{email:res.data.email || email  , profile: res.data.profile ||  profile })
        .then(res=>{
        setdata(res.data)
        if((res.data.email).includes("@")){
          navigate("/")
        }
      
      })
      }
    }
    )
  },[])

  const[data,setdata] = useState([])
  const [types,settype] = useState('password')
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
        headers:{
          Authorization: `Bearer ${tokenResponse.access_token}`
        }
      }).then((res)=>{
        console.log(res)
        axios.defaults.withCredentials = true
        axios.post(`${BaseURL}/login`,{email: res.data.email || email  , profile: res.data.picture ||  profile })
        .then(res=>{
          console.log(res)
        setdata(res.data)
        if((res.data.email).includes("@")){
          navigate("/")
        }
      
      })
      })
    },
    onError: error => console.log(error)
  });
  // console.log(profile)
  return (
<div className='flex justify-center items-center w-screen h-screen'>
   <span className='w-[100%] h-[100%] flex justify-center items-center z-50 bg-white ' style={{display: loginblock? "" : "none"}}>
   <div className='w-[80%] max-w-[600px] h-[500px] border rounded-xl shadow-2xl relative justify-center flex'>
      <div className='flex flex-col w-[100%] max-w-[85%]  absolute top-25 items-center'>
      <input  type="text" className='border mb-5 h-10 rounded-sm w-[90%] pl-5 outline-0 placeholder:font-bebas placeholder:text-gray-300' placeholder='Enter your email'/>
      <span className='w-[90%] flex   justify-center items-center mb-5 transition-all duration-700 '> <input type={`${types}`}  className='border h-10 rounded-sm w-[90%] pl-5 outline-0 placeholder:font-bebas placeholder:text-gray-300' placeholder='Enter your password' /> <button className='text-center  w-[10%] h-10 flex items-center justify-center pl-2' onClick={ ()=> {
        types=="text" ? settype("password") : settype("text")
      }}>{types=="text"?   <IoEyeOutline />  :<FaRegEyeSlash />}</button></span>
      <button className='border w-[54%] rounded-2xl h-17 flex justify-evenly items-center relative text-sm pl-1 bg-red-600 text-white mb-5 hover:bg-red-500 active:bg-red-500 transition-all '>Continue with Email</button>
      <button onClick={() => login()} className='border w-[54%] rounded-2xl h-17 flex justify-evenly items-center relative text-sm pl-1 bg-blue-600 text-white mb-5 hover:bg-blue-500 active:bg-blue-500 transition-all '><span className=' mr-1'><FcGoogle className='text-3xl rounded-2xl bg-white ' /></span>Sign in with Google</button>
      <p className='text-sm'>No account ? <button onClick={()=>setloginblock(!loginblock)} className='text-blue-500  cursor-pointer text-sm active:scale-105 hover:scale-105   transition-all ml-2'>Register here</button></p>
      
      </div>
    </div>
   </span>
   <span className='w-[100%] h-[100%] flex justify-center items-center absolute  z-40]'>
   <div className='w-[80%] max-w-[600px] h-[500px] border rounded-xl  relative justify-center flex shadow-2xl bg-white'>
      <div className='flex flex-col w-[100%] max-w-[85%]  absolute top-16 items-center'>
      <input  type="text" className='border mb-5 h-10 rounded-sm w-[90%] pl-5 outline-0 placeholder:font-bebas placeholder:text-gray-300' placeholder='Enter your email'/>
      <span className='w-[90%] flex   justify-center items-center mb-5 transition-all duration-700 '> <input type={`${types}`}  className='border h-10 rounded-sm w-[90%] pl-5 outline-0 placeholder:font-bebas placeholder:text-gray-300' placeholder='Enter your password' /> <button className='text-center  w-[10%] h-10 flex items-center justify-center pl-2' onClick={ ()=> {
        types=="text" ? settype("password") : settype("text")
      }}>{types=="text"?   <IoEyeOutline />  :<FaRegEyeSlash />}</button></span>
      <span className='w-[90%] flex'>
      <input  type="text" className='border mb-5 h-10 rounded-sm w-[90%] pl-5 outline-0 placeholder:font-bebas placeholder:text-gray-300' placeholder='Confirm your password'/>
        
        </span>  
      <button className='border w-[54%] rounded-2xl h-17 flex justify-evenly items-center relative text-sm pl-1 bg-red-600 text-white mb-5 hover:bg-red-500 active:bg-red-500 transition-all '>Continue with Email</button>
      <button onClick={() => login()} className='border w-[54%] rounded-2xl h-17 flex justify-evenly items-center relative text-sm pl-1 bg-blue-600 text-white mb-5 hover:bg-blue-500 active:bg-blue-500 transition-all '><span className=' mr-1'><FcGoogle className='text-3xl rounded-2xl bg-white ' /></span>Sign in with Google</button>
      <p className='text-sm'>Already registered ? <button className='text-blue-500  cursor-pointer text-sm active:scale-105 hover:scale-105 transition-all ml-2' onClick={()=>setloginblock(!loginblock)}>Login here</button></p>
      </div>
    </div>
   </span>
  </div>
    
  )
}

export default Login
