import { useState } from "react"
import classes from './displayCartBtn.module.css'
import { useContext } from 'react';
import CartContext from '../store/product-context'

function DisplayCartBtn(){
const[count,setCount] = useState(1)
const cartCtx = useContext(CartContext)

function addHandler(){
    setCount(count+1)
    cartCtx.addCarts({
        
    })
}
function subtractHandler(){
    if(count==0){
        setCount(0)
    }else{
        setCount(count-1)
    }
}
    return(
     <div className={classes.cartBtn}>
        <div className={classes.cartBtnOne}>
        <button onClick={addHandler}>+</button></div>
        <div className={classes.cartBtnTwo}>
        <button>{count}</button>
        </div>
        <div className={classes.cartBtnThree}>
        <button onClick={subtractHandler}>-</button>
    </div>
        
    </div>
    )
}

export default DisplayCartBtn