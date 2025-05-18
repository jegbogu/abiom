import { useRouter } from 'next/router';
import classes from './productItem.module.css';
import { useState, useContext } from 'react';
import Spinner from '../icons/spinner';
import CartContext from '../store/product-context';
 import FavouriteContext from '@/store/favourite-context';
 
import CartIcon from '@/icons/cartIcon';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // ✅ Use react-icons for heart icons

function FavouriteItem(props) {
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // ✅ Track hover state

  const cartCtx = useContext(CartContext);
  const favCtx = useContext(FavouriteContext); // ✅ Use favourite context

  const router = useRouter();

  function showDetailsHandler() {
    setSpinner(<Spinner />);
    router.push('/shop/' + props.id);
  }

  function displayCartBtn() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      router.push('/cart');
    } else {
      setShow(!show);
      cartCtx.addCarts({ ...props, qty: props.qty });
      setCount(1);
      cartCtx.totalQty();
    }
  }

  function addHandler() {
    const prodObj = cartCtx.carts.find(p => p.id === props.id);
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
    const prodObj = cartCtx.carts.find(p => p.id === props.id);
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

  const isFavourite = favCtx.favourite.some(item => item.id === props.id); // ✅ Check if in favourites
  const toggleFavourite = () => {
    if (isFavourite) {
      favCtx.removeFavourite(props.id);
    } else {
      favCtx.addFavourite({ ...props });
    }
  };

  const prodObj = cartCtx.carts.find(product => product.id === props.id);
  const showCart = prodObj ? (
    <div className={classes.cart}><CartIcon />{prodObj.qty}</div>
  ) : null;

  let fullTitle = props.title.length > 20 ? `${props.title.slice(0, 20)}..` : props.title;
  let shownFullTitle = props.title.length > 20 ? props.title : "";

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
          {isHovered && (
            <button className={classes.favIcon} onClick={toggleFavourite}>
              {isFavourite ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
            </button>
          )}
        </div>

        <div className={classes.itemBody}>
          <h3 onClick={showDetailsHandler}>{fullTitle}</h3>
          <h5>{shownFullTitle}</h5>
          <p>Price: ${props.price}</p>

          {show ? (
            <div className={classes.cartBtn}>
              <div className={classes.cartBtnOne}><button onClick={addHandler}>+</button></div>
              <div className={classes.cartBtnTwo}><button>{count}</button></div>
              <div className={classes.cartBtnThree}><button onClick={subtractHandler}>-</button></div>
            </div>
          ) : <button onClick={displayCartBtn}>Add to Cart</button>}

          <span><button onClick={showDetailsHandler}>Details{spinner}</button></span>
        </div>
        {showCart}
      </div>
    </li>
  );
}

export default FavouriteItem;
