import { useRef,useState,useContext,useEffect } from 'react';
import emailjs from '@emailjs/browser';
import classes from './usershopping.module.css';
import { useRouter } from 'next/router';
import Spinner from '../icons/spinner'
 import { data } from './api/regions';
 import CartsContext from '@/store/product-context';
import CheckOutOrShop from '@/component/checkoutOrShop';


function  UserShopping() {
 
  const  firstnameInputRef = useRef();
  const  lastnameInputRef = useRef();
  const  emailInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();
  const stateInputRef = useRef()
  const cityInputRef = useRef()

  const form = useRef();
  const router = useRouter();
  const [spinner, setSpinner] = useState(false)
  // const[content,setContent] = useState(false)
  const[cdata,setCdata] = useState([])
 const[price,setPrice] = useState(false)
 
  const cartCtx = useContext(CartsContext)
  const cart = cartCtx.carts
  //Summing up the total amount of item purchased
  const products = cart.length>0
  if(products){
    const cartPrice = cart.map((el)=>{
      return Number(el.price*el.qty)
  }).reduce((acc,cv)=>{
      return acc+cv
  })
  useEffect(()=>{
    setPrice(cartPrice);
 },[]);

  }
 
   //converting The total amount to have a dollar sign
   const priceVal = `$${price}`
   //deriving a variable for the entire cart products
   const cartProducts = cart.map((el)=>{
     return (el.title)
   })
   //deriving a variable for the entirw cart quantities
   const cartQty = cart.map((el)=>{
     return (el.qty)
   })
//Genrate invoice Number
  const invoiceNum = `AB-${Math.floor(Math.random()*45782)+10000}`
  function showDetailsHandler() {
    //activating the spinner when the button is clicked 
        setSpinner(<Spinner/>);
       
          
    
       }
  
//handling the submit function
  async function submitHandler(event) {
    event.preventDefault();
//collecting user data from the form
 
    const enteredfirstname= firstnameInputRef.current.value;
    const enteredlastname= lastnameInputRef.current.value;
    const enteredemail= emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredState = stateInputRef.current.value;
    const enteredCity =  cityInputRef.current.value;

    const userData = {
    firstname: enteredfirstname,
    lastname: enteredlastname,
    email:  enteredemail,
    phone: enteredPhone,
      address:  enteredAddress,
      state: enteredState,
      city:enteredCity,
      cartPrice:priceVal,
      cartProducts:cartProducts,
      cartQty:cartQty,
      invoiceNum: invoiceNum
    };

 //sending data to database
 const response =await fetch('api/usershopping',{
  method: 'POST',
  body: JSON.stringify(userData),
  headers:{
    'Content-Type':'application/json'
  }
 });
 let data = await response.json()

 if(!response.ok){
  throw new Error(data.message || 'something Went wrong')
 }
// console.log(userData)
router.push('/');

//using Email.js to send Aumatic Dynamic emails
 
emailjs.sendForm('service_f1x6cbs', 'contact_form', form.current, 'or6O6zejdIMnsxvYi')
      .then((result) => {
          // console.log(result.text);
      
        // setContent(<div className={classes.orderMsg}>Your Order was successfull</div>) 
          // console.log('message sent');
          alert('Your Order Was Successfully Placed, Kindly Check your Email for your Invoice we will contact you shortly. Thanks ')
          event.target.reset()
      }, (error) => {
          console.log(error.text);
      });

  }
//populating the cities for any chosen state
  function changeState(){
    const cityData = data.find((el)=>{
      return(el.name==stateInputRef.current.value)
    })
  
    setCdata(cityData.cities)
   
  }
  const allStates = data.map(el=>el.name)
 
  return (
    <div className={classes.card}>
       
      {products?(<form className={classes.form} onSubmit={submitHandler} ref={form}>
      <div className={classes.invoiceNum}>
          <input type='text' required id='user_invoice' name='user_invoice' value={invoiceNum}/>
        </div>
        <div className={classes.userItem}>
        <div className={classes.control}>
          <label htmlFor='user_price'>Total Amount</label>
          <input type='text' required id='cartprice' name='user_price' value={price}/>
        </div>
        <div className={classes.product}>
          <label htmlFor='user_products'>Items Purchased</label><br/><br/>
          <textarea required id='cartproducts' name='user_products' value={cartProducts} rows='5'/>

          <label htmlFor='user_qty'>Respective Quantities</label><br/><br/>
          <input required id='cartproducts' name='user_qty' value={cartQty}/>
        </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='firstname'>First Name</label>
          <input type='text' required id='firstname' name='user_firstname' ref={firstnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='lastname'>Last Name</label>
          <input type='text' required id='lastname' name='user_lastname' ref={lastnameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' required id='email'  name='user_email' ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='phone'>Phone Number</label>
          <input type='number' required id='phone'  name='user_phone' ref={phoneInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Delivery Address</label>
          <textarea 
          required 
          id='address' 
          ref={addressInputRef} 
          rows='5'
          name='user_address'
          >

            </textarea>
          
        </div>
        <div className={classes.control}>
          <label htmlFor='state'>State/Region</label>
           <select
            id='states'
            name='user_state'
            required 
            ref={stateInputRef} 
            onChange={changeState}
           >
            <option>--Select State--</option>
            {allStates.sort().map((el)=>{
              return(
                <option key={el}>{el}</option>
              )
            })}
              
            </select>
       
        </div>
        <div className={classes.control}>
          <label htmlFor='city'>City</label>
           <select
           name='user_city' 
           id='city'  
           ref={cityInputRef}
           required
           >
            <option>--Select City--</option>
            {cdata.sort().map((el,index)=>{
              return(
                <option key={index}>{el}</option>
              )
            })}

          </select>
        </div>
        <div className={classes.actions}>
         <button onClick={showDetailsHandler}>Complete Order {spinner}</button>
         {/* {content} */}
        </div>
      </form>):<CheckOutOrShop/>}
    </div>
  );
}

export default  UserShopping;
