import classes from "./cartItem.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../icons/spinner";
import { useContext } from "react";
import CartContext from "../store/product-context";
import TrashIcon from "@/icons/trash";
import Button from "./utils/button";
import { Minus, Plus } from "lucide-react";

function CartItem(props) {
  const cartCtx = useContext(CartContext);
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();

  function showDetailsHandler() {
    setSpinner(<Spinner />);
    router.push("/shop/" + props.id);
  }
  function deleteProd() {
    cartCtx.removeCart(props.id);
    cartCtx.totalQty();
  }
  function addHandler() {
    const prodValue = cartCtx.productIsInCart(props.id);
    if (prodValue) {
      const prodObj = cartCtx.carts.find((product) => product.id === props.id);
      prodObj.qty = prodObj.qty + 1;
      cartCtx.totalQty();
    }
  }

  function subtractHandler() {
    const prodValue = cartCtx.productIsInCart(props.id);
    const prodObj = cartCtx.carts.find((product) => product.id === props.id);
    if (prodObj.qty === 1) {
      prodObj.qty = 1;
      cartCtx.totalQty();
    } else if (prodValue) {
      const prodObj = cartCtx.carts.find((product) => product.id === props.id);
      prodObj.qty = prodObj.qty - 1;

      cartCtx.totalQty();
    }
  }

  return (
    <li className={classes.productItem}>
      <div className={classes.item}>
        <div className={classes.figure}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.itemBody}>
          <h3 className="productTitle" onClick={showDetailsHandler}>
            {props.title}
          </h3>
          <div className="prices">
            <p className="actualPrice">$ {props.price}</p>
          </div>
          <div className={classes.btns}>
              <div className={classes.cartBtn}>
                <div className={classes.cartBtnOne}>
                  <Button size="icon" onClick={addHandler}><Plus size={20}/></Button>
                </div>
                <div className={classes.cartBtnTwo}>
                  <span>{props.qty}</span>
                </div>
                <div className={classes.cartBtnThree}>
                  <Button size="icon" onClick={subtractHandler}><Minus size={20} /></Button>
                </div>
              </div>
            <Button variant="outline" onClick={showDetailsHandler}>
              Show Details{spinner}
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
