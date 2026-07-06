import Header from "../Layouts/Header"
import { useSelector, useDispatch } from 'react-redux'
import {logIn ,logOut} from '../state/isReg'
import { useNavigate } from "react-router";
function UsePage(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const isAuth=useSelector(state=>state.isreg.value)
    !isAuth && navigate("/")
    return(
        <>
        <Header/>
        <div>usepageeeeeeeeeeeeeeeeeeee</div>
        <button onClick={()=>dispatch(logOut(false))}>logout</button>
        </>
    )
}
export default UsePage