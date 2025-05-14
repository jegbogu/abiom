import { useRouter } from 'next/router';
import classes from './basketItem.module.css';
import { useState } from 'react';
import Spinner from '../icons/spinner';
import { useContext } from 'react';
import CartContext from '../store/product-context'
import CartIcon from '@/icons/cartIcon';






function BasketItem(props) {

  // console.log("BasketItem", props)
  const [spinner, setSpinner] = useState(false)
  const [show, setShow] = useState(false)



  const [count, setCount] = useState(0)
  const cartCtx = useContext(CartContext)
  const router = useRouter();

  function showDetailsHandler() {
    setSpinner(<Spinner />)
    router.push('/shop/' + props.id);

  }


  function displayCartBtn() {

    const prodValue = cartCtx.productIsInCart(props.id)
    if (prodValue) {
      router.push('/cart')
    } else {
      setShow(!show)
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
        outOfStock: props.outOfStock
      })
      setCount(1)
      //  console.log(cartCtx.carts)
      cartCtx.totalQty()
    }

  }







  function addHandler() {
    const prodValue = cartCtx.productIsInCart(props.id)
    if (prodValue) {
      const prodObj = cartCtx.carts.find(product => product.id === props.id)
      prodObj.qty = prodObj.qty + 1
      setCount(count + 1)
      cartCtx.totalQty()

    } else {
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
        outOfStock: props.outOfStock
      })

      setCount(count + 1)
      cartCtx.totalQty()
    }


  }

  function subtractHandler() {
    if (count === 0) {
      setCount(0)
      return;
    }
    const prodValue = cartCtx.productIsInCart(props.id)
    const prodObj = cartCtx.carts.find(product => product.id === props.id)
    const checkQty = prodObj.qty
    if (prodValue && checkQty === 1) {
      cartCtx.removeCart(props.id)
      prodObj.qty = prodObj.qty - 1
      setCount(0)
      cartCtx.totalQty()
    } else if (prodValue && checkQty > 1) {
      prodObj.qty = prodObj.qty - 1
      setCount(count - 1)
      cartCtx.totalQty()
    }


  }

  let showCart;
  const prodValue = cartCtx.productIsInCart(props.id)
  if (prodValue) {
    const prodObj = cartCtx.carts.find(product => product.id === props.id)
    const checkQty = prodObj.qty
    showCart = <div className={classes.cart}> <CartIcon />{checkQty}</div>

  }

  let TruePrice = Number(props.price)   + Number(0.1*props.price) +0.5

//////Out of stock ///////////////////////
let outOfStock;
if (props.outOfStock === false) {
outOfStock = " "  
}else{
  outOfStock =  <p className={classes.outOfStock}>Out of Stock</p>
}




  return (

    <li className={classes.productItem}>
     

      <div className={classes.item}>
     
        <div className={classes.figure}>
       
          <img src={props.image} alt={props.title}   />
          {outOfStock}
        </div>
        <div className={classes.discount}>
          <h2 style={{color:'orange',marginLeft:'30px', fontSize:'13px'}}>-10%</h2>
        </div>
        <div className={classes.itemBody}>
          <h3 onClick={showDetailsHandler}>{props.title}</h3>
          <p style={{color:'orange',fontSize:'19.01px', margin:'10px 0px 0px 0px'}}>Price: ${props.price}</p>
          <p style={{textDecoration:'line-through',fontSize:'12.99px',margin:'10px 0px 10px 0px'}}>Price: ${TruePrice}</p>
       
          {show ?
            (<div className={classes.cartBtn}>
              <div className={classes.cartBtnOne}>
                <button onClick={addHandler}>+</button></div>
              <div className={classes.cartBtnTwo}>
                <button>{count}</button>
              </div>
              <div className={classes.cartBtnThree}>
                <button onClick={subtractHandler}>-</button>
              </div>

            </div>)
            : <button onClick={displayCartBtn}>Add to Cart</button>}

          <span><button onClick={showDetailsHandler}>Show Details{spinner}</button></span>
        </div>
        {showCart}
       
      </div>


    </li>

  )
}

export default BasketItem