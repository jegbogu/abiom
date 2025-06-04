import { useState } from "react";
import classes from "./productDetail.module.css";
import { useContext } from "react";
import CartContext from "../store/product-context";
import { useRouter } from "next/router";

function ProductDetail(props) {
  const router = useRouter();
  const [show, setShow] = useState();
  const [count, setCount] = useState(0);
  const cartCtx = useContext(CartContext);

  function displayCartBtn() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      router.push("/cart");
    } else {
      setShow(!show);
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
      });
      setCount(1);
      cartCtx.totalQty();
    }
  }

  function addHandler() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      const prodObj = cartCtx.carts.find((product) => product.id === props.id);
      prodObj.qty = prodObj.qty + 1;
      setCount(count + 1);
      cartCtx.totalQty();
    } else {
      cartCtx.addCarts({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        price: props.price,
        qty: props.qty,
      });

      setCount(count + 1);
      cartCtx.totalQty();
    }
  }

  function subtractHandler() {
    if (count === 0) {
      setCount(0);
      return;
    }
    const prodValue = cartCtx.productIsInCart(props.id);
    const prodObj = cartCtx.carts.find((product) => product.id === props.id);
    const checkQty = prodObj.qty;
    if (prodValue && checkQty === 1) {
      cartCtx.removeCart(props.id);
      prodObj.qty = prodObj.qty - 1;
      setCount(0);
      cartCtx.totalQty();
    } else if (prodValue && checkQty > 1) {
      prodObj.qty = prodObj.qty - 1;
      setCount(count - 1);
      cartCtx.totalQty();
    }
  }

  return (
    <div className={classes.productDetail}>
      <section className={classes.section}>
        <div className={classes.figure}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.description}>
          <div className={classes.details}>
            <h1>{props.title}</h1>
            <h1>Nutrition</h1>
            <p>{props.nutrition}</p>

            <div className={classes.article}>
              <h1>Description</h1>
              <p>{props.description}</p>
            </div>
            <hr />
            <span>Price:${props.price}</span>
            <hr />
          </div>

          <div className={classes.btn}>
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
              <button onClick={displayCartBtn}>Add to Cart</button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
