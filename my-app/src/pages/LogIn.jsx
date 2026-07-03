import { ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {API_URL} from "../../config";
import { useNavigate } from "react-router";

function LogIn(){
    const regExp = {
        alphaBet: /^[a-zA-Zა-ჰ]+$/,
        phone: /^\+?\d{9,15}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[@$!%*?&]/,
    };
     const validate = Yup.object().shape({
       
        email: Yup.string()
            .email("შეიყვანე სწორი ელ.ფოსტა")
            .required("ელ.ფოსტის ველი სავალდებულოა"),
        password: Yup.string()
            .min(8, "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო")
            .matches(regExp.uppercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ დიდ ასოს")
            .matches(regExp.lowercase, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ პატარა ასოს")
            .matches(regExp.number, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ ციფრს")
            .matches(regExp.specialChar, "პაროლი უნდა შეიცავდეს მინიმუმ ერთ სპეციალურ სიმბოლოს")
            .required("პაროლის ველი სავალდებულოა"),
    });
    let navigate = useNavigate();
 async function handleSubmmit(values, { resetForm }){
        const formData = {
            email:values.email,
            password:values.password
        }
        const res=await fetch(`${API_URL}/users?email=${formData.email}&password=${formData.password}`)
        const isUser=await res.json();
        if(isUser.length>0){
            console.log(isUser)
            navigate("yourPage")
        }else{
            console.log("user is not registered")
        }
        resetForm();
    }
    return(
        <Formik initialValues={{ 
            email: "",  
            password: "", 
        }}
        validationSchema={validate}
        onSubmit={handleSubmmit}>
            <Form >
                <legend >შესვლა</legend>
                <div>
                    <label>მეილი</label>
                    <Field className="input" name="email"/>
                    <ErrorMessage name="email" component="span"/>
                </div>
                <div>
                    <label>პაროლი</label>
                    <Field className="input" name="password"/>
                    <ErrorMessage name="password" component="span"/>
                </div>
                <button type="submit">შესვლა</button>
            </Form>
        </Formik>
    )
}
export default LogIn;