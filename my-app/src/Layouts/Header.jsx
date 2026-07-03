import { useEffect, useState } from "react"
import {API_URL} from "../../config"
import { NavLink } from "react-router-dom"
import Registration from "../pages/Registration"
import LogIn from "../pages/LogIn"

function Header(){
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
           <h2>menu</h2>
           <nav>
               {
                menuData.map(item=>{
                    <div>
                        <NavLink key={item.id} to={item.path} end>{item.name}</NavLink>
                        <h2>dg</h2>
                    </div>
                    
                })
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