import { useRef,useState, useContext  } from "react";
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from "@/icons/spinner";
import classes from './login-form.module.css'
import { signIn } from "next-auth/react";
// import CartsContext from "@/store/product-context";
 
 
  
 
const LoginForm = () => {
//    const  {userAdmin, setUserAdmin}=  useContext(CartsContext)
   
   
   
    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
 
    const [show, setShow] = useState(false) 
    const[emailErr, setEmailErr] = useState(' ')
    const[password, setPassErr] = useState(' ')
    const [waitMsg, setWaitMsg] = useState(' ')
    const [spinner, setSpinner] = useState(false)
    
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    // const router = useRouter()
    

    //toggle of show and hide password
    function setFnc(){
    setShow(!show)
    }   

    async function submitHandler(event){
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        //validation
        setWaitMsg('Hold on for few seconds...')
        setSpinner(<Spinner/>)
        if(enteredEmail.length<7){
            setEmailErr('Email Lenght must be greater than 7')
            return;
        }
        if (!validPassword.test(enteredPassword)) {
            setPassErr('Password must contain special character(s), and  uppercase');
            return;
         }else{
            setPassErr('Good Password');
         }
          
         const result  = await signIn("credentials",{
            username: enteredEmail,
            password: enteredPassword,
            redirect: true,
            callbackUrl:"/newProduct"
        })
       

       
       
        }

        
    return ( 
        <div className={classes.section}>
            <h2>Admin Login</h2>
        <div className={classes.card}>
        <div className={classes.figure}>
        <img src="https://media.istockphoto.com/id/1257998329/vector/young-afro-american-man-sitting-on-the-chair-at-home-interior-and-working-with-laptop-vector.jpg?s=612x612&w=0&k=20&c=HHHYOCX39w0GCoyqRTfOorDBkLxPT2DhLzN8_B1bAv4=" alt="cartoon on laptop"/>
          </div>
             <form onSubmit={submitHandler}className={classes.form}>
                <div className={classes.control}>
                {spinner}
                    <h3>{waitMsg}</h3>
                   <label htmlFor="email">Email</label>
                   <input type='email' 
                   required id="email" 
                   name = "username"
                   ref={emailInputRef}/>
                  
                </div>
                <div>
                    {emailErr}
                </div>

                <div className={classes.control}>
                   <label htmlFor="password">Password</label>
                   
                   <input type={show?"text":"password"}
                    required id="password"
                    name="password" 
                    ref={passwordInputRef}/>

                    <div className={classes.span}>
                    < span onClick={setFnc} className={classes.actions}>{show?"Hide":"Show"}</span>
                    </div>
                   <div>
                    {password}
                   </div>
                </div>
                 
               
                <div className={classes.actions}>
                 <button type="submit">Login</button>
                 </div>

                <p>Forgot Password?</p><br/><br/>
                <p>You do not have an Account? <Link href='/admin-registration' target='_blank'>Register</Link></p>
                
            </form>
            
        </div>
        </div>
     );
}
 
export default LoginForm;