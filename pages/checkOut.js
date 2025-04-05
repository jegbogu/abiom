import Link from 'next/link';
import { useContext,useState,useEffect } from 'react';
import CartsContext from '../store/product-context'
import classes from './checkOut.module.css'
import CheckOutOrShop from '@/component/checkoutOrShop';
 

function CheckOut(){
    const cartCtx = useContext(CartsContext)
    const [price, setPrice] = useState(0)
    const cart = cartCtx.carts
    let products = cartCtx.carts.length>0
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
    
 
    return(
        <div className={classes.CheckOut}>
            {products?(<div className={classes.section}>
            <h3>Your Total Amount is <span>${price}</span></h3>
            <button><Link href='/usershopping'>Make Payment</Link></button>
            <div className={classes.figure}>
                <img src='payment.png' alt='payment portal'width={180}/>
            </div>
        </div>):<CheckOutOrShop/>}
        </div>
       
    )
    
}

export default CheckOut