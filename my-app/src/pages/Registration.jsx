import { ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {API_URL} from "../../config";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { isValidate } from '../state/isReg'

function Registration(){
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const regExp = {
        alphaBet: /^[a-zA-Zა-ჰ]+$/,
        phone: /^\+?\d{9,15}$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        specialChar: /[@$!%*?&]/,
    };
     const validate = Yup.object().shape({
        firstname: Yup.string()
            .matches(regExp.alphaBet, "ანბანის გარდა სხვა სიმბოლოებს ვერ გამოიყენებ")
            .min(2, "შეიყვანე ორზე მეტი სიმბოლო")
            .max(30, "30-ზე მეტ სიმბოლოს ვერ შეიყვან")
            .required("სახელის ველი სავალდებულოა"),
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "პაროლები არ ემთხვევა")
            .required("გაიმეორე პაროლი"),
    });
 async function handleSubmmit(values, { resetForm }){
        const formData = {
            firstname:values.firstname,
            email:values.email,
            password:values.password,
            confirmPassword:values.confirmPassword
        }
        const res=await fetch(`${API_URL}/users?email=${formData.email}`)
        const isUser=await res.json();
        if(isUser.length==0){
             const rec=await fetch(`${API_URL}/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data=await rec.json()
            console.log(data)
            useDispatch(isValidate)
        }else{
            console.log("user is registered and this is registered user:", isUser)
        }
        resetForm();
    }
    return(
        <Formik initialValues={{
            firstname: "", 
            email: "",  
            password: "", 
            confirmPassword: "", 
        }}
        validationSchema={validate}
        onSubmit={handleSubmmit}>
            <Form >
                <legend >რეგისტრაცია</legend>
                <div>
                    <label>სახელი</label>
                    <Field className="input" name="firstname"/>
                    <ErrorMessage name="firstname" component="span" />
                </div>
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
                <div>
                    <label>გაიმეორე პაროლი</label>
                    <Field className="input" name="confirmPassword"/>
                    <ErrorMessage name="confirmPassword" component="span"/>
                </div>
                <button type="submit">რეგისტრაცია</button>
            </Form>
        </Formik>
    )
}
export default Registration;