import { useEffect, useState } from "react"
import {API_URL} from "../../config"
import { NavLink } from "react-router-dom"
import Registration from "../pages/Registration"
import LogIn from "../pages/LogIn"
import { useSelector, useDispatch } from 'react-redux'
import {logIn ,logOut} from '../state/isReg'

function Header(){
    const isAuth = useSelector((state) => state.isreg.value)
    const [menuData, setMenu]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    useEffect(()=>{
        async function getMenu() {
            try{
                const response=await fetch(`${API_URL}/menu`)
                const menuData=await response.json()
                setMenu(menuData);
            }catch(e){
                console.error(e);
            }
        } 
        getMenu()
    },[])
    return(
        <header>
           <nav>
               {
                menuData.map(item=>(
                    <NavLink key={item.id} to={item.path} end>{item.name}</NavLink>
                ))
               }
            </nav>
            
            <button onClick={()=>{isOpen===false?setIsOpen(true):setIsOpen(false)}}>შესვლა/რეგისტრაცია</button>
            
            {isOpen && 
                <div>
                    <Registration/>
                    <LogIn/>
                </div>
                
            }

            
        </header>
    )
}
export default Header