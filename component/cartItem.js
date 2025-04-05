import classes from './cartItem.module.css';
import { useState} from 'react';
import { useRouter } from 'next/router'
import Spinner from '../icons/spinner';
import { useContext } from 'react';
import CartContext from '../store/product-context'
import TrashIcon from '@/icons/trash';
 

function CartItem(props){
    const cartCtx = useContext(CartContext)
    const [spinner, setSpinner] = useState(false)
  

    const router = useRouter();
    
    function showDetailsHandler() {
       setSpinner(<Spinner/>)
       router.push('/shop/' + props.id);

      }
      function deleteProd(){
      cartCtx.removeCart(props.id)
      cartCtx.totalQty()
      
         
      
      }
      function addHandler(){
        const prodValue =   cartCtx.productIsInCart(props.id)
        if(prodValue){
          const prodObj =  cartCtx.carts.find(product=>product.id===props.id)
        prodObj.qty= prodObj.qty+1
        cartCtx.totalQty()
        } 
        }
       
       function subtractHandler(){
           const prodValue =   cartCtx.productIsInCart(props.id)
           const prodObj =  cartCtx.carts.find(product=>product.id===props.id)
           if(prodObj.qty===1){
               prodObj.qty=1
               cartCtx.totalQty()
           }else 
       
        if(prodValue){
          const prodObj =  cartCtx.carts.find(product=>product.id===props.id)
        prodObj.qty= prodObj.qty-1
          
          cartCtx.totalQty()
        } 
                  
           
           
       }

    return(
 
<li className={classes.productItem}>
 
    <div className={classes.item}>
        <div className={classes.figure}>
            <img src={props.image} alt={props.title}/>
        </div>

        <div className={classes.itemBody}>
            <h3>{props.title}</h3>
            <p>Price: ${props.price}</p>
          
          
           <button onClick={showDetailsHandler}>Show Details{spinner}</button> 
        </div>
         
      <div className={classes.qty}>Quantity: {props.qty} </div>
      <div className={classes.cartBtn}>
        <div className={classes.cartBtnOne}>
        <button onClick={addHandler}>+</button>
        </div>
         
        <div className={classes.cartBtnThree}>
        <button onClick={subtractHandler}>-</button>
    </div>
        
    </div>
    <div className={classes.trash} onClick={deleteProd}><TrashIcon/></div>
    </div>
    

</li>   
 
    )
}

export default CartItem