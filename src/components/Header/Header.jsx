import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import {useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'




function Header() {

  const authStatus=useSelector((state)=>state.auth.status)
  const userData=useSelector((state)=>state.auth.userData)
  const navigate=useNavigate()

  
  
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-1 shadow-xl text-white border-neutral-100 border-2 rounded-xl' >
      <Container>
            
          <nav className='flex justify-around'>
          <div className='py-1 px-6 '>
              <Link to='/'>
                <Logo width='70px'/>
              </Link>
            </div>
            
            <ul className='flex flex-wrap py-2'>
            
              {navItems.map((item)=>(
                item.active?(
                  <li key={item.name}>
                  <button onClick={()=>navigate(item.slug)}
                  className='inline-block px-6 py-1 duration-200 hover:bg-slate-100 hover:text-black rounded-full text-xl'
                  >{item.name}</button>

                  </li>
                 ): null
              ))}
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )}
              

            </ul>
            {userData && (
                <div className='px-6 py-3 text-xl'>
                  username: {userData.name}
                </div>
              )}

          </nav>


          

          

          



          




      </Container>
    </header>
  )
}

export default Header