import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-1 duration-200  rounded-full hover:bg-slate-100 hover:text-black text-xl'
       onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default LogoutBtn