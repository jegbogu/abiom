// import { useRouter } from 'next/router';
// import classes from './productItem.module.css';
// import { useState } from 'react';
// import Spinner from '../icons/spinner';
// import { useContext } from 'react';
// import CartContext from '../store/product-context'
// import CartIcon from '@/icons/cartIcon';

// function ProductItem(props) {
//   const [spinner, setSpinner] = useState(false)
//   const [show, setShow] = useState(false)

//   const [count, setCount] = useState(0)
//   const cartCtx = useContext(CartContext)
//   const router = useRouter();

//   function showDetailsHandler() {
//     setSpinner(<Spinner />)
//     router.push('/shop/' + props.id);

//   }

//   function displayCartBtn() {

//     const prodValue = cartCtx.productIsInCart(props.id)
//     if (prodValue) {
//       router.push('/cart')
//     } else {
//       setShow(!show)
//       cartCtx.addCarts({
//         id: props.id,
//         title: props.title,
//         description: props.description,
//         image: props.image,
//         price: props.price,
//         qty: props.qty,
//       })
//       setCount(1)
//       //  console.log(cartCtx.carts)
//       cartCtx.totalQty()
//     }

//   }

//   function addHandler() {
//     const prodValue = cartCtx.productIsInCart(props.id)
//     if (prodValue) {
//       const prodObj = cartCtx.carts.find(product => product.id === props.id)
//       prodObj.qty = prodObj.qty + 1
//       setCount(count + 1)
//       cartCtx.totalQty()

//     } else {
//       cartCtx.addCarts({
//         id: props.id,
//         title: props.title,
//         description: props.description,
//         image: props.image,
//         price: props.price,
//         qty: props.qty,
//       })

//       setCount(count + 1)
//       cartCtx.totalQty()
//     }

//   }

//   function subtractHandler() {
//     if (count === 0) {
//       setCount(0)
//       return;
//     }
//     const prodValue = cartCtx.productIsInCart(props.id)
//     const prodObj = cartCtx.carts.find(product => product.id === props.id)
//     const checkQty = prodObj.qty
//     if (prodValue && checkQty === 1) {
//       cartCtx.removeCart(props.id)
//       prodObj.qty = prodObj.qty - 1
//       setCount(0)
//       cartCtx.totalQty()
//     } else if (prodValue && checkQty > 1) {
//       prodObj.qty = prodObj.qty - 1
//       setCount(count - 1)
//       cartCtx.totalQty()
//     }

//   }

//   let showCart;
//   const prodValue = cartCtx.productIsInCart(props.id)
//   if (prodValue) {
//     const prodObj = cartCtx.carts.find(product => product.id === props.id)
//     const checkQty = prodObj.qty
//     showCart = <div className={classes.cart}> <CartIcon />{checkQty}</div>

//   }

// let fullTitle
// let shownFullTitle
// if(props.title.length>2){
//   fullTitle = `${props.title.slice(0,20)}..`
//   shownFullTitle = props.title
// }else{
//   fullTitle = props.title
//   shownFullTitle = ""
// }

//   return (

//     <li className={classes.productItem}>

//       <div className={classes.item} >
//         <div className={classes.figure} >
//           <img src={props.image} alt={props.title}   />
//         </div>

//         <div className={classes.itemBody}>
//           <h3 onClick={showDetailsHandler}>{fullTitle}</h3>
//           <h5>{shownFullTitle}</h5>
//           <p>Price: ${props.price}</p>
//           {show ?
//             (<div className={classes.cartBtn}>
//               <div className={classes.cartBtnOne}>
//                 <button onClick={addHandler}>+</button></div>
//               <div className={classes.cartBtnTwo}>
//                 <button>{count}</button>
//               </div>
//               <div className={classes.cartBtnThree}>
//                 <button onClick={subtractHandler}>-</button>
//               </div>

//             </div>)
//             : <button onClick={displayCartBtn}>Add to Cart</button>}

//           <span><button onClick={showDetailsHandler}>Details{spinner}</button></span>
//         </div>
//         {showCart}
//       </div>

//     </li>

//   )
// }

// export default ProductItem

import { useRouter } from "next/router";
import classes from "./productItem.module.css";
import { useState, useContext } from "react";
import Spinner from "../icons/spinner";
import CartContext from "../store/product-context";
import FavouriteContext from "@/store/favourite-context";

import CartIcon from "@/icons/cartIcon";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"; // ✅ Use react-icons for heart icons
import Button from "./utils/button";

function ProductItem(props) {
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // ✅ Track hover state

  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavouriteContext); // ✅ Use favourite context

  const router = useRouter();

  function showDetailsHandler() {
    setSpinner(<Spinner />);
    router.push("/shop/" + props.id);
  }

  function displayCartBtn() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      router.push("/cart");
    } else {
      setShow(!show);
      cartCtx.addCarts({ ...props, qty: props.qty });
      setCount(1);
      cartCtx.totalQty();
    }
  }

  function addHandler() {
    const prodObj = cartCtx.carts.find((p) => p.id === props.id);
    if (prodObj) {
      prodObj.qty += 1;
      setCount(count + 1);
    } else {
      cartCtx.addCarts({ ...props, qty: props.qty });
      setCount(count + 1);
    }
    cartCtx.totalQty();
  }

  function subtractHandler() {
    const prodObj = cartCtx.carts.find((p) => p.id === props.id);
    if (!prodObj) return;

    if (prodObj.qty === 1) {
      cartCtx.removeCart(props.id);
      setCount(0);
    } else {
      prodObj.qty -= 1;
      setCount(count - 1);
    }
    cartCtx.totalQty();
  }

  const isFavourite = favCtx.favourite.some((item) => item.id === props.id); // ✅ Check if in favourites
  const toggleFavourite = () => {
    if (isFavourite) {
      favCtx.removeFavourite(props.id);
    } else {
      favCtx.addFavourite({ ...props });
    }
  };

  // states the conditions to display the heart
  const showHeart = isFavourite || isHovered;

  const prodObj = cartCtx.carts.find((product) => product.id === props.id);
  const showCart = prodObj ? (
    <div className={classes.cart}>
      <CartIcon />
      {prodObj.qty}
    </div>
  ) : null;

  let fullTitle =
    props.title.length > 25 ? `${props.title.slice(0, 25)}..` : props.title;
  let shownFullTitle = props.title.length > 25 ? <h5>{props.title}</h5> : "";

  return (
    <li className={classes.productItem}>
      <div
        className={classes.item}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={classes.figure}>
          <img src={props.image} alt={props.title} />

          {/* ✅ Favourite icon (only visible on hover) */}
          {showHeart && (
            <button className={classes.favIcon} onClick={toggleFavourite}>
              {isFavourite ? (
                <AiFillHeart color="red" size={20} />
              ) : (
                <AiOutlineHeart size={20} color="black" />
              )}
            </button>
          )}
        </div>

        <div className={classes.itemBody}>
          <h3 onClick={showDetailsHandler}>{fullTitle}</h3>
          {shownFullTitle}
          <p className="actualPrice">$ {props.price}</p>
          <div className="flex items-center gap-2">
            {show ? (
              <div className={classes.cartBtn}>
                <div className={classes.cartBtnOne}>
                  <button onClick={addHandler}>+</button>
                </div>
                <div className={classes.cartBtnTwo}>
                  <button>{count}</button>
                </div>
                <div className={classes.cartBtnThree}>
                  <button onClick={subtractHandler}>-</button>
                </div>
              </div>
            ) : (
              <Button size="sm" onClick={displayCartBtn}>
                Add to Cart
              </Button>
            )}

            <Button size="sm" variant="outline" onClick={showDetailsHandler}>
              Details{spinner}
            </Button>
          </div>
        </div>
        {showCart}
      </div>
    </li>
  );
}

export default ProductItem;
